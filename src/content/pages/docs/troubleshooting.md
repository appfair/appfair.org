---
title: Submission troubleshooting
description: Diagnose Day installation, GitHub Pages, CI, screenshots, release assets, catalog checks and app-store publication failures.
---

> [!TIP] Find the first failure
> Start with the first failed job, not the final “workflow failed” summary. Record the repository, commit, tag and run URL. App build failures belong in the app repository; catalog metadata failures belong in its submission PR. Store-side failures need an App Fair maintainer.

## Tools

**`day` or `cargo` is not found.** Install Rust with [rustup](https://rustup.rs/), then restart the terminal so Cargo’s bin directory is on `PATH`. Run `cargo install day-cli`, then `day doctor`.

**A flag or template feature is missing.** Check which binary runs with `command -v day`. Run `cargo install day-cli` to install the current release, then retry. If the feature is still unavailable, report the failing command and error to the template maintainer.

**A compiler or SDK is missing.** Run `day doctor` and follow the relevant [platform requirements](https://daybrite.dev/docs/system-requirements). iOS needs macOS and Xcode; web and desktop builds do not validate mobile SDK setup.

## Token

**GitHub will not accept the organization name.** The token must be unique across GitHub account names, not just App Fair apps. Try another arbitrary token. Use 2–39 characters starting with a letter; avoid consecutive or trailing hyphens. Keep your preferred app display name.

**The catalog reports a duplicate token, title or store ID.** Check existing entries. Choosing a different token does not permit publishing into another app’s store record. Resolve title or identity conflicts with App Fair before submitting.

**You want to rename a published token.** Coordinate the repository/organization rename and catalog migration with App Fair. Preserve store IDs and update the catalog’s publication state and links. GitHub redirects alone do not update catalog state. A renamed token is not a new app release identity. See [token selection](/docs/getting-started/#choose-a-token).

## Scaffold

**The destination already exists.** `day new app` creates a new directory. Choose an unused directory or continue working in the existing project; do not scaffold over it.

**Scaffolding reports an unknown `placeholders` variable in `.github/README.md`.** Your CLI is treating the template repository’s own CI files as app templates. Install the current Day CLI using the command in [Getting started](/docs/getting-started/#install-day), then retry in an unused directory.

**The generated name or config is malformed.** Use `--title` for the display name, not the token. Avoid double quotes, backslashes and line breaks in the initial title because the template inserts it into TOML. Set localized display text in the generated resources afterward.

**An existing project lacks a target.** Run `day project add-target <target>` and update the target list in `.github/workflows/ci.yml`. Recheck the manifest and workflow together. [Day project reference](https://daybrite.dev/docs/cli).

## Build

**A local build fails.** Run `day doctor`, then reproduce with `day build --verbose`. Read the first compiler error. Confirm that Cargo dependencies and `Cargo.lock` match the committed project.

**No mobile device is available.** Run `day devices list`. Start an appropriate simulator or emulator and repeat `day launch`. Follow the [iOS](https://daybrite.dev/docs/platforms/ios-uikit) or [Android](https://daybrite.dev/docs/platforms/android-mdc) setup guide.

**The walkthrough fails after UI changes.** Update the selectors, assertions and screenshots in `dayscript/demo.yaml`. Re-run the same locale and target that failed in CI. Do not remove assertions just to make publication pass.

## Repository

**GitHub authentication fails.** If you use the optional GitHub CLI, run `gh auth status`, then `gh auth login` and `gh auth setup-git`. If you use Git directly, check your HTTPS credential helper or SSH setup instead. Use an account with access to the organization and follow any SSO authorization prompts. Do not commit tokens.

**`gh repo create` reports “not found” or “forbidden”.** Create the organization first and check your membership and repository-creation permissions. The required path is `<token>/<token>`, not `<your-user>/<token>`.

**The repository already exists.** Do not run the creation command again. Clone it, or add its URL as the existing project’s remote. Inspect `git remote -v` before pushing.

**The first push is rejected.** A repository initialized online with a README has its own history. Reconcile that history locally before pushing; do not force-push over files you have not reviewed.

## Pages

**No site appears.** Set **Settings → Pages → Source** to **GitHub Actions**, then inspect the website/deployment jobs. The template supplies the workflow. A successful Rust build alone does not mean deployment succeeded.

**A release tag cannot deploy.** Under **Settings → Environments → github-pages**, allow tags matching `v*` as well as the default branch. The environment can appear only after Pages or its first deployment is configured. See [GitHub’s Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

**The site loads but links or assets return 404.** Check the URL reported by the Pages deployment. Project Pages needs the repository path, with its exact capitalization. A custom root domain usually does not.

**A custom domain or HTTPS fails.** Check the Pages custom-domain setting and DNS records against [GitHub’s custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Allow time for DNS and certificate provisioning.

## CI

**No workflow starts.** Confirm `.github/workflows/ci.yml` was committed, Actions is enabled in repository settings, and the push matches its branch or tag triggers. Fork PR workflows may need an authorized maintainer to approve their first run.

**App Fair lint fails.** Read its file-and-line annotations. Common failures include missing license texts, missing SPDX notices and a malformed App Fair flavor. Preserve `LICENSE.txt`, `LICENSE-EXCEPTIONS.txt` and the template’s source notices, or discuss alternate licensing before submission.

**Only one platform fails.** Reproduce that target. Confirm the native SDK, generated project and workflow target list agree. A passing web build is not evidence that iOS packaging works.

**A job is queued or requests approval.** Read the job’s reason. Runner availability, Actions permissions, fork approval and environment approval are different conditions; rerunning does not resolve a missing approval.

## Release assets

**The release does not exist yet.** A tag and a GitHub release are different objects. Pushing a `v<major>.<minor>.<patch>` tag starts the template’s CI; its release job creates the release after building. Inspect that tag’s run.

**`queue.py add` or `update` cannot find the new version.** The template publishes a pre-release. Pass `--tag v0.1.0` explicitly rather than relying on GitHub’s Latest release. A draft is not public; wait until the workflow publishes it.

**The release lacks an AAB, IPA or screenshots.** Check that both mobile targets, walkthroughs and `release-assets: true` are enabled. Inspect the release job and device captures. Do not submit before the requested channels’ assets exist.

**The tag, manifest version and commit disagree.** Commit the correct version and build values, create a new tag and regenerate the submission. Do not move the tag currently under review. [Release procedure](/docs/releases/#create-a-release).

## Screenshots

**A named screenshot is missing.** Match `store/storefront.toml` screenshot names to the `screenshot:` steps in the walkthrough. Check `gallery.json` for the relevant store, locale, theme and device class.

**A store rejects dimensions or device coverage.** Keep the template’s capture profiles until you have verified replacements. Apple requires supported sizes for each required device class; Google enforces dimensions and aspect ratios. Use the failing annotation’s accepted sizes rather than resizing an unrelated screenshot. Each required locale needs coverage.

**The gallery and ZIP disagree.** Both files must come from the same release run. Rebuild a corrected release instead of mixing files from different tags or manually replacing reviewed captures.

**An update should retain existing screenshots.** The catalog supports `screenshots: false`; use it only when the store already has the required images. It does not provide a first app’s missing screenshots. [Listing requirements](/docs/releases/#store-listing).

## Submission

**Python cannot import `yaml`.** Install PyYAML in the virtual environment used to run `scripts/queue.py`. On Windows the environment executable is `Scripts/python.exe`; on macOS/Linux it is `bin/python`.

**The fork clone directory already exists.** Reuse your clean catalog clone. Fetch `upstream main`, create a new branch from it and follow [the update procedure](/docs/releases/#submit-an-update). Do not overwrite a checkout with uncommitted work.

**`gh pr create` cannot find the head branch.** Push the branch to your fork first. `--repo` is `appfair/appfair-apps`; `--head` is `<fork-owner>:<branch>`. Inspect `git remote -v`. A fork owned by an organization needs that organization’s name, not your personal login.

**The catalog YAML fails validation.** Use `queue.py add` for a new app and `queue.py update` for an existing entry. Check the title, tag, 40-character commit and channels. A first submission should add only its app file; do not change catalog policy to bypass a check.

**Identity or permissions disagree.** Fix `Day.toml`, `Day-appfair.toml` or the app’s permission declarations, then release a new version. Preserve existing store IDs. See [the submission reference](https://github.com/appfair/appfair-apps/blob/main/CONTRIBUTING.md).

**Package comparison or scanning fails.** Read the report and reproduce the difference. Toolchain or flavor changes may explain it; App Fair decides whether a documented exception is acceptable. Do not suppress scanning or alter comparison policy in your submission PR.

## Build number

**The store already has this build.** Increase the effective `[app] build` for the next binary; check flavor overrides as well as `Day.toml`. Once a binary has been uploaded, a failed later step does not make its number reusable.

**The upload succeeded but review submission failed.** Ask App Fair to finish submission of the existing binary rather than uploading it again. Include the run URL and store. A new binary requires a new build number and release. [Publication recovery](/docs/releases/#retry-a-failed-publication).

## Approval

**All checks pass but the PR is still open.** App Fair review or `store` environment approval may still be pending. Read the PR and workflow status; there is no fixed approval time.

**The PR merged but the app is not live.** App Fair publication and store review are separate. Apple or Google may still be processing, reviewing or awaiting release. Ask in the existing PR rather than opening another submission for the same build.

**One store succeeded and the other failed.** Report the failed channel and run URL in a [publication problem](https://github.com/appfair/appfair-apps/issues/new?template=publication-problem.yml). App Fair can recover that channel without requesting a duplicate upload to the successful store.

**Signed packages are missing from the GitHub release.** Check whether the [App Fair publisher](https://github.com/apps/app-fair-publisher) is installed with access to this repository. If attachment failed or was not enabled, ask the maintainer for the signed workflow artifacts.

## Saved app details

The app token, name and development computer are stored in this browser. Clearing site data removes them. If storage is blocked, commands still update while the page is open.

The refresh button suggests a new token and matching name without changing your position in the guide. Suggested tokens still need an availability check on GitHub. Return to [Getting started](/docs/getting-started/).
