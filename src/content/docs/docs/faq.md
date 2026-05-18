---
title: FAQ and Glossary
description: Frequently asked questions about the App Fair Project, with a glossary of recurring terms.
---

Questions not covered below can be raised on the [App Fair discussion forums](https://github.com/orgs/appfair/discussions). A glossary of recurring terms is provided at the bottom of the page.

## About the project {#about}

### Why does each app need its own GitHub organization? {#why-org}

Several reasons. The organization-per-app convention keeps the app's source separable from any individual maintainer's account, which makes ownership transfers and community rescues straightforward. It produces an unambiguous canonical URL for each app (`github.com/<App>/<App>`). And it provides each app with a context in which a contributor community can develop independently of permission entanglements.

For a solo project the convention may appear excessive, but the one-time cost is small relative to the long-term benefits.

### Will the App Fair support code hubs other than GitHub? {#other-hubs}

Yes, this is planned. GitLab, Codeberg, and self-hosted Forgejo are all candidates. The build pipeline is currently tightly coupled to GitHub Actions, so this is not a short-term change. Preference for a particular platform can be expressed on the forums.

## Building and developing {#building}

### Can development be done on Linux or Windows? {#dev-linux-windows}

Not at present. Building and testing iOS apps requires Xcode and the iOS Simulator, both of which require macOS. Android development is possible on any operating system, but App Fair apps target both platforms from a single codebase, so macOS is currently required for the complete development workflow.

### Can an App Fair app target desktop platforms (macOS, Windows, Linux)? {#desktop}

No. App Fair apps are focused on mobile platforms. Skip itself can produce a macOS build, but the App Fair catalog does not accept desktop-only or desktop-primary apps.

### Can an App Fair app target the web? {#web}

No. App Fair apps are native mobile applications.

### Can an App Fair app target only iOS or only Android? {#one-platform}

No. App Fair apps must support both iOS and Android. Platform-specific features are permitted (a watchOS extension on iOS, a Wear OS extension on Android, a platform-specific widget), but the core experience must be available to both audiences.

### What are the minimum OS versions an App Fair app must support? {#os-versions}

The default App Fair targets are iOS 17 or later, and Android 10 (API 29) or later. Individual apps may require higher minimum versions where necessary, but this is discouraged because each version bump excludes users on older devices.

### Can an app provide different features on different distribution channels? {#heterogeneous}

Yes. An app can detect at runtime which channel it was installed from (the App Store, the Play Store, the App Fair app, or another channel) and adjust its features accordingly. This is sometimes necessary to comply with a particular store's policies.

## Submitting and releasing {#releasing}

### Is an Apple Developer or Google Developer account required? {#no-developer-account}

Not for distribution through the App Fair. The App Fair Project is the **publisher of record** registered with both Apple and Google, and it operates the distribution certificate, the App Store Connect API key, and the Play Console service account on behalf of every app in the catalog. The upstream app developer therefore does not need to enrol in the Apple Developer Program or the Google Play Console, and does not need to accept the terms and conditions of either programme.

The upstream developer's name and project URL appear as the contributor in the app's About screen, in the README, and in the store description, but the entity Apple and Google bill, hold accountable, and correspond with is the App Fair Project. (Developers who wish to publish their app independently of the App Fair are free to do so under their own accounts; see [Apps that don't fit can still be published directly](/docs/inclusion-criteria/#unsure).)

### Can I build my own signed binaries instead of having the App Fair do it? {#self-build}

Yes. The unsigned binaries from the source repository's tag-triggered builds can be signed independently using an Apple Developer or Google Play account. In this case, the maintainer is responsible for the signing and store submission. The App Fair catalog and the centrally managed store accounts do not carry such builds, but parallel distribution channels are not prohibited.

### What happens if my fork build fails on the App Fair side? {#fork-failure}

A maintainer will contact the developer. Most failures are mechanical (an expired certificate, a transient store API error) and resolve quickly. Occasionally a failure indicates a problem in the release itself, in which case the developer is asked to push a fix and re-tag.

### Can my app leave specific App Fair distribution channels (e.g. only the App Store)? {#leave-channel}

Yes. Per-channel unpublication is supported. A request can be opened on the forums.

### Can I leave the App Fair entirely? {#leave-project}

Yes. The source code remains the developer's property under GPL-2.0-or-later. The App Fair fork can be archived or removed at the developer's request, and the app can be distributed independently through any channel and under any developer accounts. The only assets that do not transfer are the App Fair branding and the centralized publisher relationships.

## Contributing {#contributing}

### I'm not a developer, but I'd like to translate an app into another language. How can I help? {#translators}

Most App Fair apps use `Localizable.xcstrings` String Catalogs for in-app strings, and Fastlane `.txt` files for store metadata. To contribute a translation:

1. Browse the [App Fair repositories](https://github.com/orgs/appfair/repositories) or each app's source organization and identify an app of interest.
2. Inspect the existing locale support. The folder names under `Sources/.../Resources/`, `Darwin/fastlane/metadata/`, and `Android/fastlane/metadata/android/` indicate the locales already covered.
3. Open a pull request with the additions: a new locale folder, or new keys filled in for an existing locale.

Partial coverage is welcome. Adding the `title` and `short_description` for a new locale is a real contribution that improves store discoverability.

### I'm not a developer or a translator. How else can I help? {#non-dev-help}

The App Fair Project depends on donations. Hosting fees, store fees, and infrastructure costs are not free. Financial contributions can be made at [appfair.org/donate/](/donate/).

Public awareness is also valuable. References to the App Fair in conversations about advertising and tracking in commercial apps, recommendations of specific App Fair apps, and written commentary on the project all contribute to its visibility.

## Other questions {#something-else}

### Something not covered here.

Please raise the question on the [App Fair discussion forums](https://github.com/orgs/appfair/discussions). Useful questions are typically incorporated into this FAQ for future reference.

## Glossary {#glossary}

Recurring terms used throughout the documentation, in alphabetical order.

### App Token {#token}

The immutable identifier for an App Fair app's source. The token is the name shared by the app's GitHub organization and its repository (e.g. `Faire-Games`) and is the final argument passed to `skip create --appfair`. It is distinct from the app's **displayed title** (e.g. "Fair Games"), which is localizable and may change over time.

See also: [Naming](/docs/inclusion-criteria/#naming), [Create a GitHub organization](/docs/building/#org), [Initialize the Skip project](/docs/building/#skip-init).

### Code Hub {#hub}

A source-hosting platform on which an App Fair app's source repository lives. GitHub is the only currently supported code hub; GitLab, Codeberg, and self-hosted Forgejo are on the project roadmap.

See also: [Create a GitHub organization](/docs/building/#org), [Will the App Fair support code hubs other than GitHub?](#other-hubs).

### Digital Public Good {#dpg}

An application that is free of cost, free of advertising and tracking, and built from free and open-source software, intended for general benefit rather than commercial gain. Every App Fair app is a digital public good in this sense.

See also: [What is the App Fair?](/docs/#what), [Mission statement](/docs/inclusion-criteria/#mission).

### Fastlane {#fastlane}

An open-source convention for managing mobile-app store metadata as plain-text and PNG files alongside the source code. App Fair apps store their App Store and Play Store metadata under `Darwin/fastlane/` and `Android/fastlane/`.

See also: [Write store metadata](/docs/submitting/#metadata), [Project layout](/docs/building/#layout), [Fastlane documentation](https://docs.fastlane.tools/).

### Fork {#fork}

The mirror of an App Fair app's source repository inside the [`appfair`](https://github.com/appfair) GitHub organization. The fork holds the signing credentials and store API keys, and is the entity that builds, signs, and publishes the app to the stores.

See also: [The fork-based distribution model](/docs/deploying/#model), [Division of responsibilities](/docs/deploying/#responsibilities), [Request an App Fair fork](/docs/submitting/#fork-request).

### Inclusion Criteria {#inclusion-criteria}

The policy that defines which applications are eligible for distribution through the App Fair: prohibited content, encouraged characteristics, the four cornerstones, technical requirements, licensing, naming, and external-storefront compliance.

See also: [Inclusion Criteria](/docs/inclusion-criteria/), [Submission Checklist](/docs/submitting/#checklist).

### Skip {#skip}

The cross-platform mobile development framework from [skip.dev](https://skip.dev/) used by every App Fair app. Skip produces a native iOS app and a native Android app from a single Swift codebase.

See also: [Project model](/docs/building/#mental-model), [Skip documentation](https://skip.dev/docs/).

### Skip Lite {#skip-lite}

The Skip mode in which Swift source is transpiled to Kotlin, producing a native Jetpack Compose Android app. App Fair apps must use Skip Lite; the alternative Skip Fuse mode is not yet suitable for App Fair distribution.

See also: [Project model](/docs/building/#mental-model), [Skip modes](https://skip.dev/docs/modes/).
