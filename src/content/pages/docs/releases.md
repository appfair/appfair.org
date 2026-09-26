---
title: Releases and updates
description: Prepare store metadata and release assets, open an App Fair catalog pull request, and publish subsequent versions without changing store identity.
---

The app repository holds your code and release assets. The catalog repository holds the request to publish a particular release. Every new version needs a catalog pull request, including updates to an accepted app. `gh` commands below are optional conveniences; use Git directly for commits, tags and pushes, and GitHub’s website for CI, releases and pull requests. See [without GitHub CLI](#without-github-cli).

## Store listing

Edit `store/storefront.toml` and the localized text it contains or references. Replace the template’s title, description, support and privacy links, icon and release notes. The actual app behavior must agree with its listing and permission declarations.

The walkthrough in `dayscript/demo.yaml` defines named screenshots. Select the captures for each store in `store/storefront.toml`; the names must match the walkthrough. For example:

```toml
[storefront.ios-uikit.apple-app-store.screenshots]
iphone = ["home", "settings"]
ipad = ["home", "settings"]

[storefront.android-mdc.google-play-store.screenshots]
default = ["home", "settings"]
```

Use names that your walkthrough actually captures. Test each shipped locale. App Store submissions need both required Apple device classes; do not remove the template’s device profiles without checking store requirements. The release’s `gallery.json` describes which files appear in each listing, and `screenshots.zip` supplies their bytes.

See Day’s [store metadata reference](https://daybrite.dev/docs/guide-store-submission) and [dayscript guide](https://daybrite.dev/docs/dayscript). [Screenshot failures](/docs/troubleshooting/#screenshots) identify the usual mismatches.

## Create a release

1. Set `[workspace.package] version` in `Cargo.toml`, for example `0.2.0`. Update the lockfile through a build if needed.
2. Increase `[app] build` in `Day.toml`. Check `Day-appfair.toml` for overrides. The number must exceed what each store has already received for that app ID, including unsuccessful submissions that uploaded a binary.
3. Update the listing’s release notes, run lint and tests, commit the changes and push. Inspect the CI run for that commit.
4. Create an annotated tag matching the source version and push it:

```sh
# Inside the app repository, after committing and checking the release changes.
git status --short
git tag -a v0.2.0 -m 'Field Notes v0.2.0'
git push origin v0.2.0
# Optional: use gh, or inspect the Actions tab in your browser.
gh run list --repo Orbit-Notes/Orbit-Notes --workflow ci.yml --limit 5
```

The template’s workflow creates the GitHub release and uploads its assets. It uses `release-mode: pre-release`: the new version is public but does not replace the current Latest release while App Fair is reviewing it. 

> [!WARNING] Let CI create the release
> Do not also run `gh release create` for the same tag. If you use a different release workflow, follow that workflow’s publishing procedure.

After the tag run finishes, inspect its assets in the repository’s **Releases** page, or use GitHub CLI:

```sh
gh release view v0.2.0 --repo Orbit-Notes/Orbit-Notes
gh release view v0.2.0 --repo Orbit-Notes/Orbit-Notes \
  --json assets --jq '.assets[].name'
```

For both catalog channels, expect the base app’s Android `.aab`, iOS `.ipa`, package metadata, and—when replacing screenshots—`gallery.json` and `screenshots.zip`. CI may publish other targets too. Read the workflow result, not just the presence of a release page.

After CI finishes, edit the release notes on GitHub’s **Releases** page. Alternatively, write the notes in a local file and use GitHub CLI:

```sh
gh release edit v0.2.0 --repo Orbit-Notes/Orbit-Notes \
  --notes-file release-notes.md
```

The `release-notes.md` file must already contain your notes. Do not change the release’s pre-release status just to make the catalog helper find it: pass `--tag v0.2.0` explicitly. [Release troubleshooting](/docs/troubleshooting/#release-assets).

## First submission

Open a first-app discussion, then use the [personalized checklist](/docs/checklist/#step-submit). Its commands create a personal fork of the catalog, run `queue.py add`, and open a PR with the optional `gh` client. The [Git and browser alternative](#without-github-cli) covers the same submission.

The file is `apps/<token>.yaml`. Its core fields are:

```yaml
token: Orbit-Notes
title: Field Notes
tag: v0.1.0
commit: FULL_40_CHARACTER_COMMIT_HASH
distribution:
  ios-uikit:
    - apple-app-store
  android-mdc:
    - google-play-store
```

The commit line above is a placeholder. Use the helper to resolve the real hash. Tags can move; the catalog pins a commit so every stage builds the reviewed source. Omit a channel only if you are not submitting to that store. The helper’s generated file needs review before committing.

The [catalog contribution reference](https://github.com/appfair/appfair-apps/blob/main/CONTRIBUTING.md) documents optional fields, upload-only settings, screenshot handling and identity pins. Do not add credentials or choose a signing flavor in this file.

## Submit an update

Keep the app token and store identities. Release a new version from the app repository, wait for its assets, then update the existing catalog file.

These commands assume the first-submission checklist created `appfair-submission/`, an `origin` remote pointing to your personal fork, an `upstream` remote pointing to App Fair, and `../appfair-submit-venv/` containing Python and PyYAML. Inspect `git remote -v` and adapt if your clone differs. Start with a clean working tree.

```sh
cd appfair-submission
git remote -v
git fetch upstream main
git switch -c update-Orbit-Notes-v0.2.0 upstream/main
../appfair-submit-venv/bin/python scripts/queue.py update Orbit-Notes --tag v0.2.0
../appfair-submit-venv/bin/python scripts/queue.py validate apps/Orbit-Notes.yaml
git diff -- apps/Orbit-Notes.yaml
git add apps/Orbit-Notes.yaml
git commit -m 'Update Field Notes to v0.2.0'
git push -u origin HEAD
# Optional: use gh, or open the PR in your browser after pushing.
GH_USER=$(gh api user --jq .login)
gh pr create --repo appfair/appfair-apps --base main \
  --head "$GH_USER:update-Orbit-Notes-v0.2.0" \
  --title 'Update Field Notes to v0.2.0' \
  --body 'Release: https://github.com/Orbit-Notes/Orbit-Notes/releases/tag/v0.2.0'
```

> [!NOTE] Windows paths
> On Windows, the virtual environment uses `Scripts/python.exe` instead of `bin/python`. If your fork belongs to an organization, use that organization instead of `$GH_USER` in `--head`.

Usually only `tag` and `commit` change. If the display name changes, update the catalog’s `title` too; the helper preserves the existing title. Describe behavior changes and link the release notes in the PR. [Submission troubleshooting](/docs/troubleshooting/#submission).

## Without GitHub CLI

Use Git for local work and transport; use GitHub’s website for repository and pull-request operations. No `gh` installation or authentication is required. Configure your usual Git HTTPS credential helper or SSH access before pushing.

For a first submission:

1. Open [appfair/appfair-apps](https://github.com/appfair/appfair-apps) and select **Fork** to create a personal fork.
2. Clone your fork and add the App Fair repository as `upstream`. Replace `YOUR-LOGIN` with your GitHub username:

```sh
git clone https://github.com/YOUR-LOGIN/appfair-apps.git appfair-submission
cd appfair-submission
git remote add upstream https://github.com/appfair/appfair-apps.git
git fetch upstream main
git switch -c add-Orbit-Notes-v0.1.0 upstream/main
python3 -m venv ../appfair-submit-venv
../appfair-submit-venv/bin/python -m pip install PyYAML
../appfair-submit-venv/bin/python scripts/queue.py add Orbit-Notes --tag v0.1.0
../appfair-submit-venv/bin/python scripts/queue.py validate apps/Orbit-Notes.yaml
cat apps/Orbit-Notes.yaml
git add apps/Orbit-Notes.yaml
git diff --cached
git commit -m 'Add Field Notes v0.1.0'
git push -u origin HEAD
```

3. Open your fork on GitHub and select **Compare & pull request**. Set the base repository to `appfair/appfair-apps`, base branch to `main`, and head branch to your submission branch. Link the app release and first-app discussion in the description, then create the PR.

On Windows, replace the virtual environment’s `bin/python` with `Scripts/python.exe`. For later versions, follow [Submit an update](#submit-an-update) through `git push`, skip the `gh` lines, and open the PR in the browser the same way. Inspect builds in the app repository’s **Actions** tab and manage release notes and assets in **Releases**.

## Approval and deployment

| State | Meaning | Your next action |
| --- | --- | --- |
| Catalog checks running | App Fair is verifying and rebuilding the pinned release | Read failing annotations; fix the app or submission |
| Awaiting App Fair review | A maintainer has not yet approved publication | Answer questions in the PR |
| Waiting for `store` environment | Signing and upload jobs need maintainer approval | Wait; contributors cannot supply this approval |
| Signing or submitting | App Fair is uploading through its store accounts | Follow the linked run; avoid starting duplicate submissions |
| PR merged | The configured publication steps succeeded | Check the actual store status and listing |
| Store review or processing | Apple or Google is evaluating or processing the release | Respond to App Fair if changes are requested |
| Available | The intended version is live in the store | Announce it and begin the next update |

The catalog separates untrusted app builds from package inspection and credential-bearing signing jobs. It checks package identity and permissions, compares release contents, checks build metadata and scans packages. The comparison allows some flavor-specific differences, including the app’s native binary; it is not a proof that all executable bytes match.

App Fair approval does not replace store review. Apple’s approved version may still require App Fair to release it; Google’s rollout follows the configured track and review state. There is no fixed review time. [Approval and store problems](/docs/troubleshooting/#approval).

With the publisher GitHub App installed, the catalog can attach signed packages and promote the GitHub release. That release event can rebuild the app’s website, provided Pages accepts its tag. Signed packages are also retained as workflow artifacts. Installing the publisher is distinct from granting access to any store account.

## Retry a failed publication

> [!CAUTION] Do not upload the same build twice
> If a store already received the binary, do not upload it again under the same build number. Report the failed job and run URL in a [publication problem](https://github.com/appfair/appfair-apps/issues/new?template=publication-problem.yml). An App Fair maintainer can use the catalog’s manual publish workflow to finish a single channel or submit an existing Apple build.

If source or package changes are needed, fix the app, increase its version/build, create a new tag and update the catalog PR. Do not replace assets or retag a release that is being reviewed. [Duplicate build numbers](/docs/troubleshooting/#build-number).
