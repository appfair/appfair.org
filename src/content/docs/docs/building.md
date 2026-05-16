---
title: Building Your App
description: Setting up the GitHub organization, creating the Skip project, and the day-to-day development workflow.
---

This section covers the process from an empty repository through a working App Fair project that builds and runs on both iOS and Android. It assumes that the proposed application has already been evaluated against the [Inclusion Criteria](/docs/inclusion-criteria/).

## Project model {#mental-model}

Every App Fair app is a **conventional Skip project** in **Skip Lite mode**:

- A single Swift codebase.
- Native iOS app built from SwiftUI source.
- Native Android app transpiled to Kotlin and Jetpack Compose. There is no embedded browser, no shared runtime, and no compromise on platform behaviour.
- Organized as a Swift Package, an Xcode project for iOS, and a Gradle project for Android, kept in sync by Skip's tooling.

Skip supports two distinct modes: **Skip Lite** (Swift source is transpiled to Kotlin, producing a native Jetpack Compose Android app) and **Skip Fuse** (Swift source is compiled directly to Android). App Fair apps must use Skip Lite. Skip Fuse is not yet suitable for App Fair distribution; its runtime characteristics, binary size, and platform coverage are still maturing. This decision is fixed for the catalog and is not a per-project choice.

Skip has its own documentation, which this guide does not duplicate. The reference for the full project layout is [Conventional Skip Projects](https://skip.dev/docs/project-types/#conventional-skip-projects), and the on-ramp for first-time Skip users is [Getting Started](https://skip.dev/docs/gettingstarted/). The sections below focus on the App Fair-specific configuration on top of that foundation.

## Step 1: Create a GitHub organization {#org}

Every App Fair app must live in its own GitHub organization, including projects with a single maintainer. The organization-per-app convention makes the app a self-contained unit that can be transferred, co-maintained, or rescued by the community without entangling personal accounts.

A free organization can be created at [github.com/account/organizations/new?plan=free](https://github.com/account/organizations/new?plan=free). The organization name should match the application identifier, which is typically the app's name written in Title-Case-With-Dashes (e.g. `Faire-Games` for an app named "Faire Games").

<aside class="callout callout-tip">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/schedule.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Other code hubs are planned</p>
    <p>The App Fair currently supports apps hosted on GitHub. Support for other code hubs (GitLab, Codeberg, and self-hosted Forgejo) is on the roadmap. GitHub is the only currently supported option.</p>
  </div>
</aside>

## Step 2: Create the repository {#repo}

A public repository should be created inside the new organization at [github.com/new](https://github.com/new). Two constraints apply:

- The repository name must match the organization name exactly. For the `Faire-Games` organization, the repository must also be `Faire-Games`, yielding the canonical URL `github.com/Faire-Games/Faire-Games`. This convention makes the fork-based distribution model unambiguous.
- The repository must be empty (no README, no `.gitignore`, no auto-generated `LICENSE`). The `skip create --appfair` command in the next step populates the repository, including the `LICENSE.GPL` file required by the App Fair.

## Step 3: Initialize the Skip project {#skip-init}

First-time Skip users should complete the [Skip Getting Started](https://skip.dev/docs/gettingstarted/) workflow to install Xcode, the Skip CLI, and the Android tooling. Once `skip checkup` reports a clean environment, the project can be initialized:

```sh
skip create --open-xcode --appfair Faire-Games
```

The `--appfair` flag instructs `skip create` to configure the project for App Fair distribution. Specifically, it:

- Configures `Package.swift`, `Skip.env`, and the Xcode and Gradle projects with App Fair-conventional defaults (bundle identifier under `org.appfair.app.*`, marketing version, etc.).
- Adds a `LICENSE.GPL` file (GNU GPL v2.0-or-later).
- Adds the `appfair/appfair-app` Swift package dependency for shared `AppFairUI` components.
- Generates a `.github/workflows/<app>.yml` workflow that invokes the [`skiptools/actions`](https://github.com/skiptools/actions) reusable build pipeline.
- Scaffolds the `fastlane/` metadata directories for iOS and Android.

The resulting project should be pushed to the repository:

```sh
cd Faire-Games
git init
git remote add origin https://github.com/Faire-Games/Faire-Games.git
git branch -M main
git add .
git commit -m "initial commit"
git push -u origin main
```

The repository now contains a valid (though minimal) App Fair app. Each push to `main` triggers the CI workflow, which builds the iOS and Android targets.

<aside class="callout callout-caution">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/play_circle.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">CI must remain enabled</p>
    <p>The GitHub Actions workflow created by <code>skip create --appfair</code> is required by the App Fair distribution process. It verifies that the application builds on both platforms before each release. The workflow should not be disabled.</p>
  </div>
</aside>

## Project layout {#layout}

The conventional Skip project layout is documented in detail on the [Skip docs site](https://skip.dev/docs/project-types/#conventional-skip-projects). The [Faire-Games repository](https://github.com/Faire-Games/Faire-Games) is a worked example. A brief orientation:

```
Faire-Games/
├── Package.swift                  ← Swift Package Manager manifest
├── Package.resolved
├── Skip.env                       ← Cross-platform config (bundle ID, version)
├── LICENSE.GPL                    ← GPL-2.0-or-later, required
├── README.md
├── Sources/                       ← Swift code (shared by iOS and Android)
├── Tests/                         ← XCTest tests, also run on Android via Robolectric
├── Darwin/                        ← iOS-specific files
│   ├── FaireGames.xcconfig
│   ├── Entitlements.plist
│   ├── Info.plist
│   ├── Assets.xcassets/
│   └── fastlane/                  ← App Store metadata and screenshots
└── Android/                       ← Android-specific files
    ├── settings.gradle.kts
    ├── app/
    └── fastlane/                  ← Play Store metadata and screenshots
```

Several points are worth noting:

- `Skip.env` is the source of truth for cross-platform settings. Bundle identifier, marketing version (e.g. `1.4.0`), build number, Android package name, and the App Store / Play Store IDs are all defined here. The `MARKETING_VERSION` and `CURRENT_PROJECT_VERSION` values must be updated here prior to tagging a release.
- The Swift sources are shared between platforms. Skip handles transpilation to Kotlin and Jetpack Compose. Where platform-specific code is genuinely required, the `#if SKIP` and `#if !SKIP` directives can be used to branch.
- Fastlane metadata is checked in under `Darwin/fastlane/` and `Android/fastlane/`. The contents of these directories are described in [Submitting Your App](/docs/submitting/). The general-purpose references are the [Fastlane documentation](https://docs.fastlane.tools/) and the [Skip Fastlane deployment guide](https://skip.dev/docs/deployment/#fastlane).

## Development workflow {#dev-loop}

Day-to-day development follows the standard Skip workflow:

1. Open the project in Xcode (via `Project.xcworkspace` at the repository root, or with `skip app launch` from the terminal). Swift and SwiftUI development proceeds as normal; Skip's plugin keeps the Android target in sync.
2. Run the app on the iOS Simulator directly from Xcode.
3. Run the app on the Android emulator by first launching an emulator from Android Studio's Device Manager, then building from Xcode. The "Launch Android APK" build phase deploys the transpiled Kotlin app to the running emulator. iOS logs appear in Xcode's console; Android logs appear in Android Studio's Logcat tab.
4. Commit and push. Each push triggers the CI workflow, which builds both targets and surfaces cross-platform regressions early.
5. Iterate. Pull Requests are recommended for non-trivial changes so that the CI build runs against the PR prior to merge.

The full development reference, including parity testing, FFI, and Kotlin interop, is in the [Skip documentation](https://skip.dev/docs/). The Skip Lite vs. Skip Fuse distinction is described there for completeness; App Fair apps use Skip Lite, so the Skip Fuse documentation is not applicable.

## Designing for the Three Pillars {#pillars-in-practice}

The [three pillars](/docs/#three-pillars) (ubiquitous, global, and accessible) are practical engineering constraints. Each is significantly easier to satisfy when designed for from the first commit than when retrofitted later. The remainder of this section translates each pillar into specific implementation guidance.

### Localization (Global) {#l10n}

App Fair apps are designed for a global audience, so every user-facing string must be localizable. The recommended mechanism is a [`Localizable.xcstrings` String Catalog](https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog): Xcode's structured, JSON-backed format for localized strings, which supersedes the older `.strings`/`.stringsdict` pair.

In practice:

- Use `Text("Some string")` and `LocalizedStringKey` (or, for resources in a SPM target, `Text("Some string", bundle: .module)`) rather than `Text(verbatim: "…")`. Strings written this way are picked up automatically by Xcode's string catalog generator.
- Keep one `Localizable.xcstrings` per target, located under `Sources/<Module>/Resources/`. The catalog is edited in Xcode and supports per-locale plural variants and per-string review states.
- Use string-format substitutions (`"Hello, %@"`) rather than string concatenation, so translators can reorder arguments to match the grammar of the target language.
- Provide an English translation at launch. Design every screen as if it had to accommodate Spanish, German, or Russian (each of which expands significantly relative to English), as well as Arabic or Hebrew (which read right-to-left).

Skip bridges the `Localizable.xcstrings` catalog to Android's `strings.xml` resource system automatically. A translation contributed once applies correctly on iOS and Android, including bidirectional layout flipping for RTL languages and per-locale formatting of dates, numbers, and currencies.

<aside class="callout callout-tip">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/storefront.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Store listings require translation too</p>
    <p>In-app strings cover only half of localization. The Fastlane metadata under <code>Darwin/fastlane/metadata/&lt;locale&gt;/</code> and <code>Android/fastlane/metadata/android/&lt;locale&gt;/</code> drives the App Store and Play Store listings; translated listings substantially improve discoverability in non-English markets. See <a href="/docs/submitting/#metadata">Submitting Your App</a> for details.</p>
  </div>
</aside>

### Accessibility (Accessible) {#a11y}

App Fair apps should function for users across the spectrum of abilities, including users of VoiceOver and TalkBack, users of Dynamic Type, users of Switch Control, and users who depend on sufficient colour contrast. SwiftUI provides most of the necessary infrastructure through its [accessibility view modifiers](https://developer.apple.com/documentation/swiftui/view-accessibility), and Skip translates those modifiers into the equivalent [Jetpack Compose accessibility semantics](https://developer.android.com/develop/ui/compose/accessibility) on Android. A UI element described once is accessible on both platforms.

The most frequently used modifiers:

- `.accessibilityLabel("…")`: the text spoken by a screen reader. Essential for icon-only buttons, custom drawing, and any element that is not text.
- `.accessibilityHint("…")`: additional context (e.g. `"Double-tap to play"`).
- `.accessibilityValue("…")`: the current value of a control (e.g. the position of a slider).
- `.accessibilityAddTraits(.isButton)` / `.isHeader` / `.isSelected`: semantic role hints.
- `.accessibilityElement(children: .combine)`: groups child views into one accessible element when they make sense together.
- `.accessibilityHidden(true)`: excludes decorative elements (such as background imagery) from screen-reader traversal.

Beyond the modifiers, several design practices matter:

- Support Dynamic Type. Use semantic text styles (`.body`, `.headline`, `.caption`) rather than fixed point sizes, and test at the largest accessibility text sizes (which is where layouts typically break first).
- Avoid relying on colour alone. Pair colour cues with shape, icon, or text so that colour-blind users receive the same information.
- Use tap targets of at least 44×44 points.
- Test with VoiceOver and TalkBack enabled. Walk through the primary user flows with the screen reader active. A UI that cannot be navigated by ear cannot be navigated by a blind user.
- Apply `accessibilityIdentifier` to key views to support UI tests and cross-platform parity testing.

<aside class="callout callout-note">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/accessibility_new.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Accessibility is not optional</p>
    <p>For an application that the App Fair classifies as a public good, accessibility cannot be deferred. Adding accessibility labels and Dynamic Type support during view construction is materially less expensive than retrofitting them at the end of the project.</p>
  </div>
</aside>

## Additional development practices {#habits}

Beyond the three pillars, the following practices are worth observing.

### Network conditions {#network}

App Fair apps reach users on flaky cellular connections, old Wi-Fi, and gigabit fibre alike. The app should be tested with the network conditioner set to "Edge" and "3G" at least once. An offline mode that degrades gracefully is a strong default.

### Power consumption {#battery}

Avoid background work the user has not requested. Avoid polling. Avoid burning CPU on animations that no user is currently observing. A significant fraction of App Fair users run older devices in regions where battery life and cellular data are constrained.

### The AppFairUI components {#appfair-ui}

Every App Fair app depends on the [`appfair-app`](https://github.com/appfair/appfair-app) package, which exposes the `AppFairUI` module. The dependency is added automatically by `skip create --appfair` and is mandatory for every catalog app (see [Technical requirements](/docs/inclusion-criteria/#technical-requirements)).

The package supplies the shared About screen, attribution metadata, third-party license rows, the "Made with Skip / Distributed through the App Fair" credits, and the `AppFairSettings` wrapper described below.

#### Settings screen {#settings-screen}

Every App Fair app must expose a prominent settings screen, reachable from one of:

- a top-level tab in the app's primary `TabView`, or
- a top-level toolbar button on the primary screen, presented either inline or as a modal sheet.

The settings view must wrap its contents in an `AppFairSettings(bundle: .module) { ... }` block:

```swift
import SwiftUI
import AppFairUI

struct SettingsView: View {
    @AppStorage("appearance") var appearance: String = ""

    var body: some View {
        AppFairSettings(bundle: .module) {
            Section("Appearance") {
                Picker("Theme", selection: $appearance) {
                    Text("System").tag("")
                    Text("Light").tag("light")
                    Text("Dark").tag("dark")
                }
            }
        }
    }
}
```

The wrapper inserts the standard App Fair rows (about, contributors, third-party licenses, App Fair Project links, and locale preferences) around the app's own configuration sections, producing a consistent settings experience across the catalog. Use of the wrapper is required, not opt-in.

Once the application implements its core functionality, proceed to [Submitting Your App](/docs/submitting/).
