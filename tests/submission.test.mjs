import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { defaults, validate, shell, restore, steps, stepIds, suggestName, namePrefixes, nameSuffixes, detectHost } from '../src/lib/submission.mjs';

test('tokens obey catalog and GitHub naming constraints', () => {
  for (const token of ['A1', 'Orbit-Notes', 'a'.repeat(39)]) assert.equal(validate({ ...defaults, token }).token, undefined);
  for (const token of ['', 'A', '1App', '-App', 'App-', 'App--Name', 'app_name', 'app/name', 'a'.repeat(40), 'App;echo hello', 'Åpp']) assert.ok(validate({ ...defaults, token }).token, token);
});
test('every suggested combination produces matching valid names', () => {
  for (const parts of [namePrefixes, nameSuffixes]) {
    assert.ok(parts.length >= 100);
    assert.equal(new Set(parts).size, parts.length);
  }
  const count = namePrefixes.length * nameSuffixes.length;
  const seen = new Set();
  for (let i = 0; i < count; i++) {
    const values = suggestName('', () => (i + 0.5) / count);
    assert.equal(values.title, values.token.replace('-', ' '));
    assert.deepEqual(validate({ ...values, host: 'macos' }), {});
    seen.add(values.token);
  }
  assert.equal(seen.size, count);
  const first = suggestName('', () => 0);
  assert.notEqual(suggestName(first.token, () => 0).token, first.token);
  const last = suggestName('', () => 0.999999);
  assert.notEqual(suggestName(last.token, () => 0.999999).token, last.token);
});
test('local launch uses the default toolkit and submission paths follow the host', () => {
  for (const host of ['macos', 'linux', 'windows']) {
    const list = steps({ ...defaults, host });
    const command = list.find(s => s.id === 'local').command;
    assert.match(command, /^day launch$/m);
    assert.match(command, /^day launch --script dayscript\/demo.yaml$/m);
    assert.doesNotMatch(command, / -p |day build/);
    assert.match(list.find(s => s.id === 'submit').command, host === 'windows' ? /Scripts\/python.exe/ : /bin\/python/);
  }
  assert.ok(validate({ ...defaults, host: 'unknown' }).host);
});
test('display names remain literal shell arguments', () => {
  const title = "O'Brien's $(printf INJECTED) `printf INJECTED` & Notes";
  assert.deepEqual(validate({ ...defaults, title }), {});
  const result = spawnSync('bash', ['-c', `printf '%s' ${shell(title)}`], { encoding: 'utf8' });
  assert.equal(result.status, 0); assert.equal(result.stdout, title);
  for (const invalid of ['"quoted"', 'line\nbreak', 'back\\slash']) assert.ok(validate({ ...defaults, title: invalid }).title);
});
test('commands and settings URLs consistently use the supplied token', () => {
  const list = steps({ ...defaults, token: 'New-Token', title: 'A Different Name' });
  assert.deepEqual(list.map(s => s.id), stepIds);
  assert.match(list.find(s => s.id === 'create').command, /day new app 'New-Token'/);
  assert.match(list.find(s => s.id === 'create').command, /--title 'A Different Name'/);
  assert.doesNotMatch(list.find(s => s.id === 'create').command, /--toolkit|--no-input|mkdir/);
  assert.equal(list.find(s => s.id === 'pages').operations[0][1], 'https://github.com/New-Token/New-Token/settings/pages');
  assert.match(list.find(s => s.id === 'submit').command, /--tag 'v0.1.0'/);
  assert.match(list.find(s => s.id === 'submit').command, /--head "\$GH_USER:add-New-Token-v0.1.0"/);
  assert.ok(list.every(s => s.help.startsWith('/docs/troubleshooting/#')));
  assert.ok(!JSON.stringify(list).includes('Orbit-Notes'));
});
test('every generated command block is valid Bash for each development computer', () => {
  for (const host of ['macos', 'linux', 'windows']) {
    for (const step of steps({ ...defaults, host, title: "O'Brien's Notes" })) {
      for (const command of [step.command, step.optional?.command, step.alternative?.command].filter(Boolean)) {
        const check = spawnSync('bash', ['-n'], { input: command, encoding: 'utf8' });
        assert.equal(check.status, 0, `${step.id}: ${check.stderr}`);
      }
    }
  }
});
test('saved app details migrate without manual completion state', () => {
  for (const schema of [1, 2, 3]) {
    const state = { schema, values: { ...defaults, version: '3.2.1', build: '4' }, done: ['install', 'pages'], open: 'pages' };
    assert.deepEqual(restore(JSON.stringify(state)), { schema: 3, values: defaults, open: 'pages' });
  }
  for (const value of [null, 'bad json', 'null', '{}', JSON.stringify({ schema: 99, values: defaults }), JSON.stringify({ schema: 3, values: { ...defaults, token: '../bad' } })]) assert.equal(restore(value), null);
  assert.throws(() => steps({ ...defaults, token: 'bad;command' }));
});

test('host detection handles desktop, mobile and unknown browser agents', () => {
  for (const [ua, expected] of [
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'windows'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'macos'],
    ['Mozilla/5.0 (X11; Linux x86_64)', 'linux'],
    ['Mozilla/5.0 (Linux; Android 16; Pixel 9)', 'windows'],
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', 'macos'],
    ['Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)', 'macos'],
    ['Mozilla/5.0 (X11; CrOS x86_64)', 'linux'],
    ['Unknown Browser', 'linux'], ['', 'linux'],
  ]) assert.equal(detectHost(ua), expected, ua);
});
test('prerequisites follow the host and disable Xcode outside macOS', () => {
  for (const host of ['macos', 'windows', 'linux']) {
    const step = steps({ ...defaults, host })[0];
    assert.equal(step.id, 'prerequisites');
    assert.equal(step.installations.find(i => i.id === 'rustup').href, 'https://rustup.rs/');
    assert.equal(step.installations.find(i => i.id === 'xcode').disabled, host !== 'macos');
    assert.equal(step.installations.find(i => i.id === 'desktop').hidden, host === 'macos');
    const git = step.installations.find(i => i.id === 'git');
    assert.equal(git.href, host === 'windows' ? 'https://gitforwindows.org/' : 'https://git-scm.com/downloads');
    if (host === 'windows') assert.match(git.detail, /Git Bash/);
  }
});
