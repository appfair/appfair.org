---
title: Deployment & Distribution
description: How the App Fair fork builds, signs, and distributes the application.
---

After a fork has been created at `github.com/appfair/<app-token>`, the application is connected to the App Fair distribution pipeline. This section describes how the pipeline operates: from the release tag through the signed binary, the app stores, and the [appfair.net](https://appfair.net) catalog.

## The fork-based distribution model {#model}

Each App Fair app is associated with two repositories, both addressed by the app's [token](/docs/inclusion-criteria/#naming):

- The **source repository** in the developer's GitHub organization, e.g. [`github.com/Faire-Games/Faire-Games`](https://github.com/Faire-Games/Faire-Games) for the `Faire-Games` token (published under the displayed title "Fair Games"). The developer owns this repository: source code, issue tracker, and project direction.
- The **App Fair fork** in the [`appfair`](https://github.com/appfair) organization, e.g. [`github.com/appfair/Faire-Games`](https://github.com/appfair/Faire-Games). The App Fair owns this repository, which holds the signing credentials, store API keys, and the published release pipeline.

This separation has two effects. The developer retains full control of the source code, including the option to discontinue the App Fair relationship and continue independently. The App Fair handles the account-bound and certificate-bound parts of mobile app distribution.

## Division of responsibilities {#responsibilities}

The two repositories also represent a clear division of labour between the upstream project and the downstream `appfair/` fork. Each side is responsible for a distinct set of tasks, and neither side is expected to take on the other's work.

### Upstream (the developer's project) {#upstream-responsibilities}

The organization that maintains the app's source repository is responsible for the **app itself**, including:

- **Core development and maintenance** of the application: features, bug fixes, refactoring, and the project's overall direction.
- **Responding to support requests** from users, whether they arrive through GitHub Issues, store reviews, or other channels.
- **Keeping dependencies current**, including Skip, the platform SDKs, and any third-party libraries the app uses.
- **Service and server maintenance**, for any external services the app directly relies on. If the app requires a backend service that the upstream organization operates (its own API server, an authentication endpoint, a sync service, a content backend, and so on), keeping that service available, current, and operational is the upstream developer's responsibility. An App Fair app whose required backend service becomes non-functional may be removed from distribution by the App Fair, since users installing the app from the catalog would otherwise encounter a broken application.
- **Regulatory and policy compliance**, including data-protection obligations that fall on the application itself (privacy disclosures within the app, lawful handling of any data the app processes, age-appropriate content, jurisdiction-specific requirements, and so on).

### Downstream (the `appfair/` fork) {#downstream-responsibilities}

The App Fair, through the downstream fork, is responsible for **distribution and review**, specifically:

1. **Reviewing the initial submission and each subsequent update** to confirm that the app continues to conform to the [Inclusion Criteria](/docs/inclusion-criteria/).
2. **Publishing the app to the app stores**, including signing the binaries, uploading them, managing the storefront accounts, and accepting the storefronts' terms and conditions on the project's behalf.
3. **Transmitting feedback from the app stores to the upstream developer**, including reviewer correspondence, policy notices, and store-side rejections that require developer action.
4. **Offering guidance and support to upstream developers** on the App Fair process itself, on Skip and the build pipeline, and on the practical aspects of catalog membership.

The division is intentional: the upstream project keeps the work that requires hands-on knowledge of the application, while the downstream fork carries the work that requires the App Fair's centralized accounts and review process.

## Publisher of record {#publisher}

Because the `appfair/` fork builds and signs the binary, the App Fair Project is the entity registered with Apple and Google as the publisher of each app. From the perspective of the App Store and Play Store, the App Fair Project is the developer; the actual contributors are listed in the app's About screen, README, and store description.

The practical consequences are:

- Contributors are not required to enrol in the Apple Developer Program or to accept its terms and conditions.
- Contributors are not required to enrol in the Google Play Console or to accept its terms and conditions.
- Contributors do not sign binaries, manage certificates, rotate API keys, or correspond with store reviewers.

The App Fair maintains the relevant accounts on behalf of every app in the catalog, and accepts the storefront terms and conditions on the project's behalf. This is the central service the project provides.

## Release pipeline {#pipeline}

When the App Fair creates the fork, it syncs the `.github/workflows/<app>.yml` file from the source repository. The fork's instance of the workflow has access to a set of GitHub Actions secrets configured at the organization level:

- **Android signing**: `KEYSTORE_JKS`, `KEYSTORE_PROPERTIES` (the keystore and password for signing the AAB).
- **Android publishing**: `GOOGLE_PLAY_APIKEY` (the service-account API key for uploading to Play Console).
- **iOS signing**: `APPLE_CERTIFICATES_P12`, `APPLE_CERTIFICATES_P12_PASSWORD` (the distribution certificate for signing the IPA).
- **iOS publishing**: `APPLE_APPSTORE_APIKEY` (the App Store Connect API key for uploading to App Store Connect).

When a release tag (for example, `1.0.0`) is synchronized from the source repository to the fork, GitHub Actions fires the workflow on the fork. The workflow invokes the reusable [`skiptools/actions/skip-app.yml@v1`](https://github.com/skiptools/actions) pipeline, which:

1. Builds the iOS target with `skip export` and signs it with the App Fair certificate.
2. Builds the Android target with `skip export` and signs it with the App Fair keystore.
3. Reads the Fastlane metadata from `Darwin/fastlane/` and `Android/fastlane/` and uploads it alongside the signed binaries to App Store Connect and the Play Console.
4. Submits the build for review.
5. Generates an `appindex.json` describing the release and publishes it (together with the signed binaries) as assets on the corresponding GitHub Release in the App Fair fork. The source repository is not modified by this step.

Store review timing is outside the App Fair's control. Apple and Google operate their own review queues, but updates typically appear within a few days. The progress of each step can be observed in real time on the Actions tab of the fork.

## Distribution channels {#channels}

After a release has been signed, submitted, and approved, users can install the application through any of the following channels.

### The Apple App Store {#channel-app-store}

The Apple App Store is the dominant channel for iPhone and iPad. App Fair releases appear there under the App Fair Project's developer name. Within the European Union, [alternative distribution channels for iOS](https://appfair.org/marketplace/) are also planned.

### The Google Play Store {#channel-play-store}

The Google Play Store is the dominant channel for Android worldwide, outside mainland China. App Fair releases appear there under the App Fair Project's developer account.

### Future channels {#channel-future}

The same `appindex.json` and signed binaries support distribution through F-Droid, AltStore, and other alternative app stores. Expansion into these channels is on the project roadmap.

## Branding {#branding}

App Fair apps are built by their developers, but the App Fair Project appears prominently on store pages and within each app:

- The App Store and Play Store developer name is "The App Fair Project."
- The store description should reference the fact that the app is distributed through the App Fair.
- The app's About screen (provided by the `AppFairUI` helper in the `appfair-app` package) credits the App Fair and links back to [appfair.org](https://appfair.org).

This branding requirement allows users to discover the rest of the catalog from any one App Fair app.

## Working Example {#example}

The app with the [`Faire-Games`](https://github.com/Faire-Games/Faire-Games) token (published under the title "Fair Games") demonstrates the full pipeline:

1. The developer maintains the source at [`Faire-Games/Faire-Games`](https://github.com/Faire-Games/Faire-Games), pushing commits, accepting PRs, and responding to issues there.
2. When a release is ready, the developer bumps `MARKETING_VERSION` in `Skip.env`, updates the release notes, commits, and pushes a `1.5.1` tag.
3. The CI workflow on the source repository builds unsigned `.ipa`, `.apk`, and `.aab` binaries, attaching them to a draft GitHub Release.
4. The App Fair maintainers sync the `1.5.1` tag to the fork at [`appfair/Faire-Games`](https://github.com/appfair/Faire-Games).
5. The fork's CI workflow runs. It builds signed binaries, reads metadata from `Darwin/fastlane/` and `Android/fastlane/`, uploads to App Store Connect and the Play Console, and generates an `appindex.json` that is attached to the fork's GitHub Release.
6. Apple and Google review the build. One to three days later, version 1.5.1 of [Fair Games](https://apps.apple.com/app/id6761661340) is live on both stores.
7. The next hourly aggregator run picks up the new `appindex.json` and the [appfair.net](https://appfair.net) catalog is updated.

The same version, with the same metadata, appears in every location, driven by the same source repository.

Once the app is live, see [Maintaining Your App](/docs/maintenance/).
