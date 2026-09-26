// Shared by the server-rendered example, the browser checklist, and its tests.
export const STORAGE_KEY = 'appfair-submission-checklist-v1';
// The static example remains readable without JavaScript. Browsers get a fresh suggestion.
export const defaults = { token: 'Orbit-Notes', title: 'Orbit Notes', host: 'macos' };
export const namePrefixes = `Amber Alpine Aqua Arctic Aspen Atlas Aurora Autumn Azure Bamboo
Birch Blue Brisk Brook Calm Canyon Cedar Cherry Cinder Citrus Clear Cloud Clover Cobalt
Copper Coral Cosmic Cozy Crescent Crimson Crystal Dawn Delta Drift Dune Echo Elm Ember
Emerald Ever Fern Firefly Flint Flora Forest Frost Gentle Glade Golden Granite Green Grove
Harbor Hazel Hidden Honey Indigo Iris Ivory Jade Jasper Juniper Kestrel Lake Lark Laurel
Lavender Leaf Lemon Light Lilac Linden Little Lotus Lucky Lunar Maple Meadow Meridian Mint
Misty Moon Morning Moss Mountain Nectar Nimbus North Nova Oak Ocean Olive Onyx Opal Orbit
Orchid Otter Pebble Pine Plum Polar Poppy Prairie Prism Quartz Quiet Rain Raven Reed River
Robin Rose Rowan Ruby Sage Sand Scarlet Sea Shadow Silver Sky Slate Snow Solar Solstice
Sparrow Spring Spruce Star Stone Summer Summit Sun Sunny Swift Teal Terra Thistle Tide
Timber Topaz Trail Tulip Twilight Valley Velvet Verdant Violet Willow Wind Winter Wren`.split(/\s+/);
export const nameSuffixes = `Agenda Album Almanac Archive Atlas Beacon Binder Bloom Board Book
Bookmark Box Breeze Bridge Browser Brush Budget Calendar Camera Canvas Capsule Cards Chart
Checklist Chime Clock Cloud Compass Counter Courier Craft Deck Diary Dock Draft Drawer
Dream Explorer Field Finder Flow Focus Folder Folio Forge Frame Garden Gauge Globe Graph
Grid Guide Habit Harbor Haven Hive Horizon House Index Ink Journal Keeper Kit Lab Lantern
Ledger Lens Library Light Lines Link List Log Loom Loop Map Marker Memo Meter Mirror Mosaic
Motion Muse Nest Notebook Notes Orbit Organizer Outline Palette Paper Parcel Path Pattern
Pencil Planner Pocket Post Prism Pulse Reader Recipe Recorder Relay Reminder Rhythm Roster
Route Rover Scout Shelf Signal Sketch Slate Space Spark Spiral Spot Stack Station Studio
Survey Table Task Tempo Thread Tiles Timer Tracker Trail Treasury Tune Vault Verse View
Viewer Vista Voice Watch Wave Weather Wheel Window Workshop World Writer Yard Zone`.split(/\s+/);

export function suggestName(previousToken = '', random = Math.random) {
  const previous = namePrefixes.findIndex(prefix => previousToken.startsWith(prefix + '-'));
  const suffix = previous < 0 ? -1 : nameSuffixes.indexOf(previousToken.slice(namePrefixes[previous].length + 1));
  const previousIndex = suffix < 0 ? -1 : previous * nameSuffixes.length + suffix;
  const count = namePrefixes.length * nameSuffixes.length;
  // Choose from all pairs except the last one, so Shuffle always changes the suggestion.
  let index = Math.floor(random() * (count - (previousIndex < 0 ? 0 : 1)));
  if (previousIndex >= 0 && index >= previousIndex) index++;
  const parts = [namePrefixes[Math.floor(index / nameSuffixes.length)], nameSuffixes[index % nameSuffixes.length]];
  return { token: parts.join('-'), title: parts.join(' ') };
}
export function detectHost(userAgent = '') {
  // Android includes Linux in its UA; map mobile browsers before desktop hosts.
  if (/Android|Windows/i.test(userAgent)) return 'windows';
  if (/iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(userAgent)) return 'macos';
  return 'linux';
}
export const stepIds = ['prerequisites', 'install', 'token', 'create', 'local', 'repository', 'pages', 'ci', 'release', 'submit', 'approval'];
export function validate(values) {
  const errors = {};
  if (!/^[A-Za-z][A-Za-z0-9-]{1,38}$/.test(values.token) || /--|-$/.test(values.token)) errors.token = 'Use 2–39 letters, digits or single hyphens. Start with a letter; end with a letter or digit.';
  if (!values.title.trim() || values.title.length > 80 || /["\\\x00-\x1f\x7f]/.test(values.title)) errors.title = 'Use 1–80 characters without double quotes, backslashes or line breaks (the template writes this into TOML).';
  if (!['macos', 'linux', 'windows'].includes(values.host)) errors.host = 'Choose your development computer.';
  return errors;
}
export function shell(value) { return "'" + String(value).replaceAll("'", "'\"'\"'") + "'"; }
export function restore(raw) {
  try {
    const state = JSON.parse(raw);
    if (![1, 2, 3].includes(state?.schema) || !state.values || Object.keys(defaults).some(k => typeof state.values[k] !== 'string') || Object.keys(validate(state.values)).length) return null;
    // Older saved checklists retain their app details; manual completion is no longer used.
    return { schema: 3, values: Object.fromEntries(Object.keys(defaults).map(k => [k, state.values[k]])), open: stepIds.includes(state.open) ? state.open : 'prerequisites' };
  } catch { return null; }
}
export function steps(v) {
  if (Object.keys(validate(v)).length) throw new Error('Invalid checklist values');
  const { token, title, host } = v;
  const version = '0.1.0', build = '1';
  const repo = `${token}/${token}`, url = `https://github.com/${repo}`, tag = `v${version}`;
  const python = host === 'windows' ? '../appfair-submit-venv/Scripts/python.exe' : '../appfair-submit-venv/bin/python';
  const help = (anchor) => `/docs/troubleshooting/#${anchor}`;
  return [
    {
      id: 'prerequisites', title: 'Install prerequisites',
      location: { macos: 'macOS', windows: 'Windows', linux: 'Linux' }[host], text: '',
      installations: [
        { id: 'git', title: host === 'windows' ? 'Install Git for Windows (Git Bash)' : 'Install Git',
          href: host === 'windows' ? 'https://gitforwindows.org/' : 'https://git-scm.com/downloads',
          detail: host === 'windows' ? 'Open Git Bash to run this guide’s commands.' : 'Use Bash or zsh for the commands below.', disabled: false, hidden: false },
        { id: 'rustup', title: 'Install rustup', href: 'https://rustup.rs/', disabled: false, hidden: false,
          detail: host === 'windows' ? 'Use the MSVC toolchain.' : 'Restart your terminal after installation.' },
        { id: 'android', title: 'Install Android Studio', href: 'https://developer.android.com/studio', disabled: false, hidden: false,
          detail: 'Install the SDK and NDK; create an emulator in Device Manager.' },
        { id: 'xcode', title: 'Install Xcode', href: 'https://developer.apple.com/xcode/', disabled: host !== 'macos', hidden: false,
          detail: host === 'macos' ? 'Open Xcode once and install an iOS simulator runtime.' : 'macOS only' },
        { id: 'desktop', title: host === 'windows' ? 'Install C++ Build Tools' : 'Install GTK development packages',
          href: host === 'windows' ? 'https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022' : 'https://daybrite.dev/docs/system-requirements#linux',
          detail: host === 'windows' ? 'Select Desktop development with C++, including the Windows SDK.' : 'GTK 4.10+, libadwaita 1.5+ and pkg-config.',
          disabled: false, hidden: host === 'macos' },
        { id: 'vscode', title: 'Install VSCode (optional)', href: 'https://code.visualstudio.com', disabled: false, hidden: false,
          detail: 'An IDE is not required to build and run Day apps; the `day` cli can be used without VSCode.' },
      ],
      links: [['Android SDK setup', 'https://daybrite.dev/docs/system-requirements#android'], ['Host requirements', `https://daybrite.dev/docs/system-requirements#${host}`]],
      help: help('tools'),
    },
    { id: 'install', title: 'Install Day', location: 'Any directory', text: '', command: 'cargo install day-cli\nday doctor', optional: { title: 'VSCode extensions (optional)', text: 'Run only if you installed VSCode and plan to use it. Skip these commands for CLI-only development.', command: 'code --install-extension daybrite.day-vscode\ncode --install-extension rust-lang.rust-analyzer' }, links: [['Day installation', 'https://daybrite.dev/docs/getting-started'], ['Day extension', 'https://marketplace.visualstudio.com/items?itemName=daybrite.day-vscode'], ['Day extension source', 'https://github.com/daybrite/day-vscode'], ['rust-analyzer', 'https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer']], help: help('tools') },
    { id: 'token', title: `Create the ${token} organization on GitHub`, location: 'GitHub', text: '', operations: [['Create the organization', 'https://github.com/account/organizations/new?plan=free'], ['Install the App Fair Publisher', 'https://github.com/apps/app-fair-publisher/installations/select_target', 'Select the newly created organization.']], links: [], help: help('token') },
    { id: 'create', title: 'Create the app', location: 'Parent directory for your new project', text: '', command: `day new app ${shell(token)} --title ${shell(title)} --template https://github.com/appfair/day-appfair\ncd ${shell(token)}`, links: [['Template source', 'https://github.com/appfair/day-appfair'], ['Project files', 'https://daybrite.dev/docs/project-structure']], help: help('scaffold') },
    { id: 'local', title: 'Build and test locally', location: `Inside ${token}/`, text: 'Replace the starter screens, icon, listing and walkthrough before testing.', command: `day doctor\nday lint\nday launch\n# Close the app before running the walkthrough.\nday launch --script dayscript/demo.yaml`, optional: { title: 'Build and launch in VSCode (optional)', text: 'With VSCode and the Day extension installed, open the project folder containing Day.toml:', command: 'code .', instructions: ['Open the Day icon in the activity bar and expand your project’s Targets.', `Tick the ${ { macos: 'macos-appkit', windows: 'windows-xaml', linux: 'linux-gtk' }[host] } checkbox for this computer. Leave other targets unchecked to run only the desktop app.`, 'Press Run in the Day view’s title bar to build and launch. Use Build when you only want to compile.', 'Build output appears in the task terminal; compiler errors also appear in Problems. If a toolchain is missing, run Day: Doctor (check toolchains) from the Command Palette.'] }, links: [['Build and launch in VSCode', 'https://vscode.daybrite.dev/docs/getting-started'], ['Dayscript testing', 'https://daybrite.dev/docs/dayscript'], ['Prepare the listing', '/docs/releases/#store-listing']], help: help('build') },
    { id: 'repository', title: 'Create the app repository', location: `Inside ${token}/`, text: 'Commit the project, then choose one method below to create the remote repository.', command: `git init -b main\ngit add .\ngit diff --cached --stat\ngit commit -m ${shell('Create ' + title)}`, optional: { title: 'With GitHub CLI', text: '', command: `gh auth login\ngh auth setup-git\ngh repo create ${shell(repo)} --public --source=. --remote=origin` }, alternative: { title: 'Or use GitHub’s website', text: 'Create a public repository without a README, license or .gitignore, then connect it:', href: `https://github.com/organizations/${token}/repositories/new?name=${token}&owner=${token}&visibility=public`, label: 'Create a new repository', command: `git remote add origin ${shell(url + '.git')}` }, links: [ ['Optional GitHub CLI', 'https://cli.github.com/']], help: help('repository') },
    { id: 'pages', title: 'Enable the website', location: 'GitHub repository settings · before the first push', text: '', operations: [['Configure Pages', `${url}/settings/pages`, 'Set Source to GitHub Actions.'], ['Configure deployment rules', `${url}/settings/environments`, 'Under github-pages, allow main and v* tags. If the environment is missing, return after the first deployment.']], links: [['Custom domain instructions (optional)', 'https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site']], help: help('pages') },
    { id: 'ci', title: 'Push and inspect CI', location: `Inside ${token}/`, text: '', command: `git push -u origin main`, operations: [['Inspect the CI run', `${url}/actions`, 'Wait for a passing run and review its screenshots.'], ['Check the website', `https://${token.toLowerCase()}.github.io/${token}/`]], links: [], help: help('ci') },
    { id: 'release', title: `Release ${tag}`, location: `Inside ${token}/ · first release`, text: `Confirm version ${version} and build ${build} in Cargo.toml and Day.toml, including overrides. Skip the commit if nothing changed.`, command: `git status --short\ngit add Cargo.toml Cargo.lock Day.toml Day-appfair.toml store resource dayscript src\ngit diff --cached\ngit commit -m ${shell('Prepare ' + tag)}\ngit push origin main\ngit tag -a ${shell(tag)} -m ${shell(title + ' ' + tag)}\ngit push origin ${shell(tag)}`, operations: [['Inspect release and assets', `${url}/releases/tag/${tag}`]], links: [['Release requirements', '/docs/releases/#create-a-release']], help: help('release-assets') },
    { id: 'submit', title: 'Open the catalog pull request', location: 'A separate working directory · first submission', text: 'After release assets are available, run these commands with gh. Check the generated metadata before committing. For Git and browser instructions, see the link below.', command: `gh repo fork appfair/appfair-apps --clone --remote -- appfair-submission\ncd appfair-submission\ngit switch -c ${shell('add-' + token + '-' + tag)}\npython3 -m venv ../appfair-submit-venv\n${python} -m pip install PyYAML\n${python} scripts/queue.py add ${shell(token)} --tag ${shell(tag)}\n${python} scripts/queue.py validate ${shell('apps/' + token + '.yaml')}\ngit diff -- ${shell('apps/' + token + '.yaml')}\ncat ${shell('apps/' + token + '.yaml')}\ngit add ${shell('apps/' + token + '.yaml')}\ngit commit -m ${shell('Add ' + title + ' ' + tag)}\ngit push -u origin HEAD\nGH_USER=$(gh api user --jq .login)\ngh pr create --repo appfair/appfair-apps --base main \\\n  --head "$GH_USER:${'add-' + token + '-' + tag}" \\\n  --title ${shell('Add ' + title + ' ' + tag)} \\\n  --body ${shell(`Submit ${repo} at ${tag}. Release: ${url}/releases/tag/${tag}.`)}`, links: [['Without GitHub CLI', '/docs/releases/#without-github-cli'], ['Catalog pull requests', 'https://github.com/appfair/appfair-apps/pulls']], help: help('submission') },
    { id: 'approval', title: 'Track approval and store deployment', location: 'Catalog PR and linked workflow run', text: '', operations: [['Review your catalog pull request', 'https://github.com/appfair/appfair-apps/pulls', 'Address review comments.'], ['Track store deployment', 'https://github.com/appfair/appfair-apps/actions', 'Follow the linked workflow run and check the published listings.']], links: [['Approval and deployment', '/docs/releases/#approval-and-deployment'], ['Submit an update', '/docs/releases/#submit-an-update'], ['Report a publication problem', 'https://github.com/appfair/appfair-apps/issues/new?template=publication-problem.yml']], help: help('approval') },
  ];
}
