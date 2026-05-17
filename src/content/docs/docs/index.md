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

## How does the App Fair work? {#overview}

The end-to-end process has four steps:

1. **An app is developed independently.** The developer creates the application as a [Skip](https://skip.dev) project in its own dedicated GitHub organization (one organization per app). The application is designed to conform to the App Fair's [Inclusion Criteria](/docs/inclusion-criteria/) from the outset.
2. **A fork request is submitted.** When the app is ready and a semantic-version release tag has been pushed, the developer opens a fork request on the App Fair [discussion forums](https://github.com/orgs/appfair/discussions).
3. **The App Fair forks the repository and builds the initial release.** A maintainer reviews the app against the inclusion criteria and the [Submission Checklist](/docs/submitting/#checklist). On approval, the App Fair creates a fork in the [`appfair`](https://github.com/appfair) GitHub organization. The fork holds the signing credentials and store API keys; its CI workflow builds, signs, and submits the initial release to the Apple App Store and Google Play Store.
4. **Subsequent releases publish automatically.** Each time the developer pushes a new `X.Y.Z` tag to the source repository and that tag is synchronized to the fork, the fork's CI workflow rebuilds, re-signs, and re-submits the updated app to the stores, and updates the `appindex.json` that drives the [appfair.net](https://appfair.net) catalog.

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
