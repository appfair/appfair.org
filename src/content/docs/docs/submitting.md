---
title: Submitting Your App
description: Writing Fastlane metadata, tagging a release, and requesting an App Fair fork.
---

Once an application implements its core functionality and builds reliably on both platforms, it is ready for submission. The submission process has three stages: writing the metadata that will appear on the app stores, tagging a release, and requesting that the App Fair create a fork in the `appfair/` organization.

## Step 1: Write store metadata {#metadata}

Both the Apple App Store and the Google Play Store require structured copy and imagery for each app: title, subtitle, description, keywords, screenshots, release notes, and similar fields. The App Fair manages all of this through [**Fastlane**](https://fastlane.tools/) metadata files, which live in the repository as plain text and PNG assets alongside the source code. The canonical references are the [Fastlane documentation](https://docs.fastlane.tools/) and the [Skip Fastlane deployment guide](https://skip.dev/docs/deployment/#fastlane); this section describes the App Fair-specific expectations that apply on top of those references.

This approach has two benefits: metadata is version-controlled alongside the code, and translators can contribute store-listing translations by submitting pull requests rather than working in proprietary dashboards.

### iOS / App Store metadata {#metadata-ios}

iOS metadata lives under `Darwin/fastlane/metadata/`. Within that directory, one folder per locale is named with the standard locale identifiers (`en-US`, `fr-FR`, `de-DE`, `pt-BR`, `zh-Hans`, and so on).

Inside each locale directory:

| File | Purpose | Notes |
|---|---|---|
| `title.txt` | App Store display name | 30 characters max |
| `subtitle.txt` | Short subtitle under the title | 30 characters max |
| `description.txt` | Full description | up to 4000 characters |
| `keywords.txt` | Search keywords | comma-separated, 100 characters total |
| `release_notes.txt` | Release notes for the current version | shown to users on update |
| `version_whats_new.txt` | Equivalent value used by Skip's tooling | should remain aligned with `release_notes.txt` |
| `privacy_url.txt` | URL to the privacy policy |  |
| `support_url.txt` | URL where users can get help |  |
| `software_url.txt` | URL of the app's home page |  |

iOS screenshots live under `Darwin/fastlane/screenshots/<locale>/` with filenames following Apple's device-class naming convention (for example, `0_APP_IPHONE_65_0.png` is the first screenshot for the 6.5" iPhone class). Apple requires screenshots for each supported device size.

Two additional iOS-only files exist alongside the per-locale folders:

- `app_privacy_details.json`: declares the data the app collects, in App Store Connect's structured format. For most App Fair apps this is `[{"data_protections": ["DATA_NOT_COLLECTED"]}]`.
- `rating.json`: content rating responses (advertising, gambling, violence, and so on). The majority of these values should be `false` or `"NONE"` for an App Fair app.

### Android / Play Store metadata {#metadata-android}

Android metadata lives under `Android/fastlane/metadata/android/`, with one folder per locale.

| File | Purpose | Notes |
|---|---|---|
| `title.txt` | Play Store display name | 30 characters max |
| `short_description.txt` | Short tagline | 80 characters max |
| `full_description.txt` | Full Play Store description | up to 4000 characters |

Android screenshots live under `Android/fastlane/metadata/android/<locale>/images/`:

- `phoneScreenshots/`: phone screenshots (Play Store requires at least two)
- `sevenInchScreenshots/`: 7" tablet screenshots
- `tenInchScreenshots/`: 10" tablet screenshots
- `wearScreenshots/`: Wear OS screenshots (if applicable)
- `tvScreenshots/`: Android TV screenshots (if applicable)
- `icon.png`: high-resolution icon (512×512)
- `featureGraphic.png`: feature graphic (1024×500)

### Translations {#metadata-translations}

Metadata should be provided for as many locales as is feasible. Even partial coverage (such as `title` and `short_description` alone) measurably improves store discoverability outside English-speaking markets. Community contributors frequently add additional locales after launch.

The [`Darwin/fastlane/metadata`](https://github.com/Faire-Games/Faire-Games/tree/main/Darwin/fastlane/metadata) and [`Android/fastlane/metadata`](https://github.com/Faire-Games/Faire-Games/tree/main/Android/fastlane/metadata) directories of the Faire-Games repository serve as a worked example of complete metadata.

## Step 2: Bump versions and tag a release {#tag}

App Fair apps follow [semantic versioning](https://semver.org/). Prior to tagging a release:

1. Open `Skip.env` and bump `MARKETING_VERSION` (e.g. `1.0.0` to `1.0.1`) and `CURRENT_PROJECT_VERSION` (the integer build number).
2. Update `release_notes.txt` and `version_whats_new.txt` for each locale to describe the changes.
3. Commit and push.

Then create and push a release tag that matches `MARKETING_VERSION`. The tag must follow the pattern `X.Y.Z`:

```sh
git tag 1.0.0
git push origin 1.0.0
```

Pushing the tag triggers the repository's CI workflow in release mode. It builds unsigned `.ipa`, `.apk`, and `.aab` binaries for both platforms and attaches them to a GitHub Release, alongside an `appindex.json` describing the release. The unsigned builds serve as verification that the release builds cleanly, and allow independent inspectors to verify the binary against the source.

The unsigned release in the developer's own repository is not the version distributed to end users. Distribution is the responsibility of the App Fair fork, described in the next step.

## Step 3: Request an App Fair fork {#fork-request}

Once a tagged release builds cleanly and the [Submission Checklist](#checklist) below is satisfied, a **fork request** should be opened on the [App Fair discussion forums](https://github.com/orgs/appfair/discussions). The request should include:

- The name of the app and a link to the repository.
- A short description of its functionality (one or two paragraphs).
- The version intended for first release.
- Any notable information about dependencies, platform support, or target audience.

A maintainer will review the application against the [inclusion criteria](/docs/inclusion-criteria/) and confirm each item in the [Submission Checklist](#checklist): licence, absence of advertising/tracking/analytics, alignment with the project mission, correspondence between the code and the README, and the technical prerequisites. If the review is positive, a fork is created at `github.com/appfair/<app-token>`.

The fork is the location where the signing credentials live. Once it exists, the remainder of the pipeline is automated. See [Deployment & Distribution](/docs/deploying/) for the details.

<aside class="callout callout-tip">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/forum.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Review is iterative</p>
    <p>A reviewer flagging a concern (a missing screenshot locale, an unexplained dependency, a borderline feature) is not a rejection. The concern is identified so it can be addressed. The majority of fork requests result in a fork being created.</p>
  </div>
</aside>

Once the fork has been created, proceed to [Deployment & Distribution](/docs/deploying/) for the rest of the pipeline.

## Submission Checklist {#checklist}

Before opening a fork request, verify that the app satisfies each item below. The App Fair maintainer reviewing the submission will check the same list, and submissions that pass every item are materially likely to be approved on the first pass.

<ol class="submission-checklist">
  <li>
    <span class="submission-checklist-num">1</span>
    <div class="submission-checklist-body">
      <strong>Builds and launches on the latest iOS and Android.</strong>
      <p>The app must compile and start under the most recent stable releases of both platforms, on both the iOS Simulator and the Android emulator. No platform-specific build failures or launch-time crashes.</p>
    </div>
  </li>
  <li>
    <span class="submission-checklist-num">2</span>
    <div class="submission-checklist-body">
      <strong>Depends on <code>appfair-app</code> and uses <code>AppFairSettings</code>.</strong>
      <p><code>Package.swift</code> includes the <a href="https://github.com/appfair/appfair-app"><code>appfair-app</code></a> dependency, and the app exposes a prominent settings screen (a top-level <code>TabView</code> tab or a top-level toolbar button) whose contents are wrapped in <code>AppFairSettings(bundle: .module) { … }</code>. See <a href="/docs/building/#appfair-ui">AppFairUI components</a>.</p>
    </div>
  </li>
  <li>
    <span class="submission-checklist-num">3</span>
    <div class="submission-checklist-body">
      <strong>All dependencies are free and open-source software.</strong>
      <p>Every direct <em>and</em> transitive dependency (Swift Package Manager, Gradle, and any platform-side imports) must ship its source freely under an OSI-approved licence. Proprietary SDKs, closed-source binaries, and libraries that rely on Google Play Services are not eligible. See <a href="/docs/inclusion-criteria/#dependencies">Dependencies</a> in the inclusion criteria.</p>
    </div>
  </li>
  <li>
    <span class="submission-checklist-num">4</span>
    <div class="submission-checklist-body">
      <strong>Accessibility attributes on every major UI element.</strong>
      <p>Every interactive control, icon-only button, custom drawing, and non-text element carries an <code>.accessibilityLabel</code>; semantic SwiftUI text styles are used so Dynamic Type works; tap targets are at least 44×44 points. See <a href="/docs/building/#a11y">Accessibility</a>.</p>
    </div>
  </li>
  <li>
    <span class="submission-checklist-num">5</span>
    <div class="submission-checklist-body">
      <strong>Ships with at least English and French translations.</strong>
      <p>The <code>Localizable.xcstrings</code> catalogue contains a complete set of strings for both <code>en</code> and <code>fr</code>. The app launches cleanly with the device locale set to French and displays no untranslated literals. See <a href="/docs/building/#l10n-minimum">Minimum supported languages</a>.</p>
    </div>
  </li>
  <li>
    <span class="submission-checklist-num">6</span>
    <div class="submission-checklist-body">
      <strong>Complete Fastlane metadata for both stores.</strong>
      <p><code>Darwin/fastlane/metadata/</code> and <code>Android/fastlane/metadata/android/</code> each contain the required text files (title, subtitle / short description, description, keywords, release notes, support and privacy URLs) for every supported locale.</p>
    </div>
  </li>
  <li>
    <span class="submission-checklist-num">7</span>
    <div class="submission-checklist-body">
      <strong>At least English screenshots for both platforms.</strong>
      <p>iOS screenshots are present under <code>Darwin/fastlane/screenshots/en-US/</code> for each device class Apple requires; Android screenshots are present under <code>Android/fastlane/metadata/android/en-US/images/phoneScreenshots/</code> (at minimum two phone screenshots).</p>
    </div>
  </li>
</ol>
