---
title: Creator Guide
description: Build, submit, and distribute a universal mobile app through the App Fair.
---

This guide describes the App Fair development, submission, and distribution process. It is written for developers who want to publish a mobile application through the App Fair Project.

<div class="diagram-vector">
<img style="width: 100%;" alt="App Fair Project Diagram" src="/assets/images/appfair-project.svg" />
</div>

<aside class="callout callout-note">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/construction.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Work in progress</p>
    <p>This guide is a living document. Corrections and suggestions can be filed on the <a href="https://github.com/orgs/appfair/discussions">App Fair discussion forums</a>.</p>
  </div>
</aside>

## What is the App Fair? {#what}

The App Fair is a distribution channel for mobile applications that do not monetize the end-user. Its catalog targets both major mobile platforms (iOS and Android), supports a broad range of languages, and is designed for users with varying abilities.

The apps in the catalog are characterized as **global digital public goods**:

- **Free.** No price, no in-app purchases, no subscriptions, no paywalls.
- **Fair.** No advertising, no surreptitious tracking, no analytics SDKs, no behavioural profiling.
- **Open.** Built from free and open-source software, so the source of every shipped binary is available for inspection.

## The Three Pillars of an App Fair App {#three-pillars}

Every App Fair app is designed around three pillars. Each pillar should shape the project from the outset; retrofitting any of them after the fact is significantly more expensive than designing for it from the first commit.

### 1. Ubiquitous {#pillar-ubiquitous}

An App Fair app is available on every mobile device: both iOS and Android, from a single Skip codebase, with no second-class platform. A user on a current-model iPhone and a user on a budget Android device should receive the same set of features, each refined to feel at home on the respective platform.

Skip itself handles most of this pillar: SwiftUI source is compiled to a native iOS app and transpiled to a native Jetpack Compose Android app. The developer's responsibility is to make platform decisions that include both audiences rather than excluding one of them.

### 2. Global {#pillar-global}

An App Fair app supports the user's language. Every user-facing string is externalized, the supported locales are kept current, and the store listing is translated alongside the app itself. The catalog aggregates apps across more than a dozen primary locales (Arabic, Chinese, English, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Portuguese, Russian, Spanish, and others).

In practice, this requires the use of SwiftUI's localization infrastructure: primarily an [`Localizable.xcstrings` String Catalog](https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog) for every visible string. Skip bridges these catalogs to Android's string-resource system automatically, so a translation contributed once applies to both platforms.

### 3. Accessible {#pillar-accessible}

An App Fair app should be usable by people across the spectrum of abilities. This includes users of VoiceOver and TalkBack, users of Dynamic Type at the largest sizes, users of Switch Control, and users who rely on sufficient colour contrast.

In SwiftUI, this is primarily a matter of applying the standard [accessibility view modifiers](https://developer.apple.com/documentation/swiftui/view-accessibility): `.accessibilityLabel`, `.accessibilityHint`, `.accessibilityValue`, `.accessibilityElement(children:)`, `.accessibilityAddTraits`, and related APIs. Skip translates these modifiers into the equivalent [Jetpack Compose accessibility semantics](https://developer.android.com/develop/ui/compose/accessibility) on Android, so describing a UI element once makes it accessible on both platforms.

<aside class="callout callout-tip">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/hub.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">The pillars compound</p>
    <p>A localized app that is not accessible excludes blind speakers of every supported language. A cross-platform app that is not localized excludes most of the world's mobile users. The three pillars deliver their full value only in combination.</p>
  </div>
</aside>

## How the project fits together {#how}

There are three moving pieces:

1. The developer maintains a [Skip](https://skip.dev) project in their own GitHub organization. The repository is the source of truth for the application: source code, issue tracker, and project direction. Every App Fair app is a [conventional Skip project](https://skip.dev/docs/project-types/#conventional-skip-projects), which produces a native iOS app and a native Android app from a single Swift codebase.
2. The App Fair forks the repository into the [`appfair`](https://github.com/appfair) GitHub organization. The fork holds the signing credentials and store API keys. When the developer pushes a release tag, the fork's CI workflow builds, signs, and submits the app to the Apple App Store and Google Play Store.
3. The fork publishes an `appindex.json` describing each release. The [appfair.net](https://appfair.net) catalog aggregates these index files automatically; a new release appears in the catalog within an hour of being signed.

<aside class="callout callout-tip">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/verified.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">The App Fair is the publisher of record</p>
    <p>Because the <code>appfair/</code> fork builds and signs the binary, the App Fair Project itself is the entity registered with Apple and Google as the app's publisher. Individual contributors are not required to enrol in the Apple Developer Program or the Google Play Console, and therefore are not required to accept the terms and conditions of those programs. A free GitHub account and a macOS development machine are sufficient.</p>
  </div>
</aside>

## Prerequisites {#requirements}

- A **macOS development machine** capable of running the latest Xcode. Skip uses Xcode to build the iOS target and to transpile the Android target, so macOS is currently required for development. The Android emulator can be launched from Xcode.
- A **free GitHub account**. Enrolment in the Apple Developer Program or the Google Play Console is not required, and the terms and conditions of those programs do not need to be accepted.
- An idea that satisfies the [Inclusion Criteria](/docs/inclusion-criteria/).

## Where to next {#next}

The remainder of the guide is organized into focused sections.

- **[Inclusion Criteria](/docs/inclusion-criteria/)**: the requirements an app must satisfy to be accepted into the catalog.
- **[Building Your App](/docs/building/)**: setting up the GitHub organization, creating the Skip project, and the day-to-day development workflow.
- **[Submitting Your App](/docs/submitting/)**: writing Fastlane metadata, tagging a release, and requesting an `appfair/` fork.
- **[Deployment & Distribution](/docs/deploying/)**: how the fork builds, signs, and distributes the app to the stores and the catalog.
- **[Maintaining Your App](/docs/maintenance/)**: updates, translations, and project handoff.
- **[FAQ](/docs/faq/)**: frequently asked questions.

Additional questions can be brought to the [discussion forums](https://github.com/orgs/appfair/discussions).
