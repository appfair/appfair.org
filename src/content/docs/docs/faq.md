---
title: FAQ
description: Frequently asked questions about the App Fair Project.
---

Questions not covered below can be raised on the [App Fair discussion forums](https://github.com/orgs/appfair/discussions).

## About the project {#about}

### Why Skip, and not Flutter, React Native, Xamarin, MAUI, or Capacitor? {#why-skip}

Platform-native user interfaces produce the best end-user experience: lowest battery use, best performance, and the look and feel that users already know on each platform. [Skip](https://skip.dev) supports the production of native UIs (SwiftUI on iOS, Jetpack Compose on Android) from a single Swift codebase, so code can be shared without compromising the user experience. Cross-platform frameworks that ship their own rendering stack or wrap a web view tend to feel inconsistent with the host platform on at least one device class. The App Fair takes the position that user experience is worth the engineering investment of building on the native UI toolkits.

### Can I use Skip Fuse instead of Skip Lite? {#why-skip-lite}

No. App Fair apps must use Skip Lite, the transpiled mode in which Swift source is converted to Kotlin and built into a native Jetpack Compose Android app. Skip Fuse, the compiled mode in which Swift source is compiled directly to Android, is not yet suitable for App Fair apps. Its runtime, binary footprint, and platform coverage remain a work in progress, and the App Fair distribution pipeline currently targets Skip Lite output exclusively. This may change in the future, but is fixed for now.

### Why GPL-2.0-or-later? Why not MIT, Apache, or BSD? {#why-gpl}

The App Fair's mission requires that its catalog remain free of advertising, tracking, and analytics over the lifetime of the project. A permissive license would allow a third party to fork an App Fair app, add advertising or tracking, and republish the result. The GPL's copyleft prevents this: any party that distributes a derived version must publish the corresponding source, under the same license. This restriction applies to the top-level application only. Libraries on which an app depends may use any GPL-compatible license.

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

The default Skip and App Fair targets are iOS 17 or later, and Android 10 (API 29) or later. Individual apps may require higher minimum versions where necessary, but this is discouraged because each version bump excludes users on older devices.

### Can an app provide different features on different distribution channels? {#heterogeneous}

Yes. An app can detect at runtime which channel it was installed from (the App Store, the Play Store, the App Fair app, or another channel) and adjust its features accordingly. This is sometimes necessary to comply with a particular store's policies.

## Submitting and releasing {#releasing}

### Is an Apple Developer account really not required? {#no-apple-account}

Correct. The App Fair Project is the entity registered as the publisher with Apple and Google. The distribution certificate, the App Store Connect API key, and the Play Console service account are managed centrally on behalf of every app in the catalog. The maintainer's name appears as the contributor in the app's About screen, README, and store description, but not as the developer of record on the stores.

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
