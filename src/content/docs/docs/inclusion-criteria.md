---
title: Inclusion Criteria
description: Requirements an application must satisfy to be accepted into the App Fair catalog.
---

The App Fair exists to create global digital public goods in the form of mobile applications. Every app in the catalog is required to satisfy this purpose, so the criteria below should be reviewed before any significant development effort is undertaken.

<aside class="callout callout-note">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/draft.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Provisional</p>
    <p>This is a provisional version of the inclusion criteria. The rules below may be refined as the project matures. Questions about whether a specific idea fits should be raised on the <a href="https://github.com/orgs/appfair/discussions">forums</a> prior to development.</p>
  </div>
</aside>

## The Four Cornerstones of an App Fair App {#four-cornerstones}

Every App Fair app is designed around four cornerstones, which build directly on the [Four Essential Freedoms of Free Software](https://en.wikipedia.org/wiki/Free_software#Definition) defined by the Free Software Foundation. Each cornerstone should shape the project from the outset; retrofitting any of them after the fact is significantly more expensive than designing for it from the first commit.

<div class="diagram-vector cornerstones">
<img style="width: 100%; max-width: 720px; margin: 1.5rem auto; display: block; background: transparent; padding: 0; border-radius: 0;" alt="The four cornerstones of an App Fair app: Transparent, Ubiquitous, Global, and Accessible, arranged in a 2×2 grid." src="/assets/images/cornerstones.svg" />
</div>

### Transparent {#cornerstone-transparent}

An App Fair app is open to inspection, modification, and redistribution by anyone. Its source code, build configuration, and every direct and transitive dependency are published under [free and open-source software](https://en.wikipedia.org/wiki/Free_software#Definition) licences, so that any user, auditor, or future maintainer can study how the application works, verify what it does, modify it for their own needs, and share the result.

This cornerstone is the foundation the others rest on. The [Four Essential Freedoms of Free Software](https://en.wikipedia.org/wiki/Free_software#Definition) — the freedoms to run, study, modify, and redistribute the software — are what make community translation, community accessibility improvements, and independent verification possible at all. The licensing and dependency rules under [Licensing](#licensing) below are the operational expression of this cornerstone.

### Ubiquitous {#cornerstone-ubiquitous}

An App Fair app strives to be available for every mobile device and operating system. Currently, this entails support for both iOS and Android. In the future, this will include additional emerging platforms as they become more prominent. A user on a current-model iPhone and a user on a budget Android device should receive the same set of features, each refined to feel at home on the respective platform.

SwiftUI source is compiled to a native iOS app and transpiled to a native Jetpack Compose Android app, so the underlying mechanics of cross-platform delivery are handled automatically. The developer's responsibility is to make platform decisions that include both audiences rather than excluding one of them.

### Global {#cornerstone-global}

An App Fair app supports the user's language. Every user-facing string is externalized, the supported locales are kept current, and the store listing is translated alongside the app itself. The catalog aggregates apps across more than a dozen primary locales (Arabic, Chinese, English, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Portuguese, Russian, Spanish, and others). The app must ship with at least **English** and **French** translations as a minimum verification baseline (see [Localization](/docs/building/#l10n-minimum)).

In practice, this requires the use of SwiftUI's localization infrastructure: primarily an [`Localizable.xcstrings` String Catalog](https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog) for every visible string. These catalogs are bridged to Android's string-resource system automatically, so a translation contributed once applies to both platforms.

### Accessible {#cornerstone-accessible}

An App Fair app should be usable by people across the spectrum of abilities. This includes users of [VoiceOver](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios) and [TalkBack](https://support.google.com/accessibility/android/answer/6283677), users of [Dynamic Type](https://developer.apple.com/design/human-interface-guidelines/typography#Dynamic-Type) at the largest sizes, users of [Switch Control](https://support.apple.com/guide/iphone/use-switch-control-iph2db00bef0/ios), and users who rely on sufficient colour contrast.

In SwiftUI, this is primarily a matter of applying the standard [accessibility view modifiers](https://developer.apple.com/documentation/swiftui/view-accessibility): `.accessibilityLabel`, `.accessibilityHint`, `.accessibilityValue`, `.accessibilityElement(children:)`, `.accessibilityAddTraits`, and related APIs. These modifiers are translated into the equivalent [Jetpack Compose accessibility semantics](https://developer.android.com/develop/ui/compose/accessibility) on Android, so describing a UI element once makes it accessible on both platforms.

<aside class="callout callout-tip">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/hub.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">The cornerstones compound</p>
    <p>An app that is not transparent denies users the four freedoms that make the rest of the project possible. A localized app that is not accessible excludes blind speakers of every supported language. A cross-platform app that is not localized excludes most of the world's mobile users. The four cornerstones deliver their full value only in combination.</p>
  </div>
</aside>

An initial App Fair submission is not expected to be perfect against each cornerstone: they are aspirational cornerstones, and software is always a work in progress. A clear commitment to each cornerstone is expected, along with an architecture that allows each cornerstone to be improved over time.

## Mission statement {#mission}

> The App Fair is a forum for the creation of global digital public goods in the form of mobile applications that are free, fair, and clean, with no goal to monetize the end-user in any way.

Each prospective app should be evaluated against this statement. Ideas that do not align with the mission are not eligible for distribution through the App Fair.

## Prohibited content and functionality {#forbidden}

Apps that include any of the following are not eligible for the App Fair catalog.

### Advertisements {#no-ads}

App Fair apps may not embed advertisements of any kind. This includes banner advertising, interstitials, native advertisements, sponsored content, affiliate links presented as recommendations, and any other mechanism whose purpose is to direct user attention to a paying third party.

<aside class="callout callout-note">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/campaign.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Embedded ads versus ads in content</p>
    <p>This prohibition applies to advertising that the app itself embeds. It does not apply (and cannot apply) to advertising that appears within third-party content the app displays. A web browser that renders web pages may show pages that contain advertising; a podcast player may play audio that includes advertisements or product endorsements; a video player may play content that includes commercials. The relevant test is whether the advertising is introduced by the app, or by the content the app is presenting on the user's behalf.</p>
  </div>
</aside>

### Surreptitious tracking {#no-tracking}

App Fair apps may not track users in ways the user has not knowingly and explicitly consented to. This prohibition covers behavioural tracking SDKs, device fingerprinting, cross-app or cross-site identifiers, attribution services, and similar mechanisms.

Apps that legitimately require user-data transmission to provide a user-facing feature (e.g. a sync service) are permitted, provided that the data flow is necessary for the feature, the user has clearly opted in, and the data is not used for profiling.

### Analytics {#no-analytics}

Third-party analytics SDKs are prohibited. First-party telemetry beacons are prohibited. "Anonymous usage statistics" features that report screen views or feature engagement back to the developer are prohibited. Crash reporting is permitted only if it is opt-in, contains no user content, and is anonymous.

### Gambling {#no-gambling}

Real-money gambling is prohibited. Simulated gambling that maps to real-money mechanics is prohibited. Loot boxes, sports betting interfaces, and social-casino patterns are prohibited.

### Cryptocurrency {#no-crypto}

Cryptocurrency wallets, on-chain integrations, NFT functionality, token-reward systems, and "play to earn" mechanics are prohibited. The App Fair considers cryptocurrency integration incompatible with the goal of providing trustworthy software to a general audience.

## Encouraged characteristics {#encouraged}

The following are not strict requirements, but applications that exhibit several of these characteristics are more likely to be approved and to flourish within the catalog.

### Suitable for all ages {#all-ages}

The catalog targets a general audience. Content should be appropriate for all ages, interfaces should accommodate users with a wide range of abilities, and the UI should not presuppose an adult, English-speaking, technically sophisticated user. As a guideline, an App Fair app should be one that a school librarian could recommend without reservation.

### Platform applications {#platform-apps}

Applications that are wide in scope and serve as a foundation for a range of related tasks are referred to as **platform apps**. Examples include a general-purpose ebook reader, a generic media player, a flexible note-taking application, and a feed reader that supports multiple formats. Platform apps tend to be more durable, more reusable, and more likely to attract a contributor community than apps with a narrow single purpose.

Narrow-scope apps are not excluded, but where a choice exists between an app that performs one specific task and an app that performs that task as part of a broader platform, the broader option is generally preferred.

### Standardized over proprietary services {#multi-service}

When an application interacts with external services, it should prefer **standardized, interoperable protocols** over single proprietary services. An RSS/Atom reader is preferable to a single-vendor news client. A WebDAV/CalDAV/CardDAV client is preferable to a wrapper around one specific cloud service. An OPDS-based ebook reader is preferable to a client for a single bookstore.

The general principle: an App Fair app should preserve the user's freedom to choose providers rather than locking them into one. Where an open protocol exists, it should be supported. Where one does not, support for several competing proprietary services is preferred to support for a single one.

### Broad and durable utility {#useful}

Apps should aim for broad and durable utility: useful to many people, in many locations, in many languages, over many years. Apps tied to specific events, current cultural moments, or content that will become stale are discouraged.

## Technical requirements {#technical-requirements}

In addition to the criteria above, every App Fair app must satisfy a small set of mandatory technical requirements.

### Dependency on the `appfair-app` package {#appfair-app-dep}

Each app's `Package.swift` must include a dependency on [`github.com/appfair/appfair-app`](https://github.com/appfair/appfair-app). This package provides the shared UI components, attribution metadata, and App Fair-branded affordances used across the catalog. The dependency is added automatically by `skip create --appfair` and should not be removed.

### A prominent settings screen {#settings-screen-requirement}

Each app must expose a **prominent settings screen** reachable from a top-level entry point: either a tab in the app's primary `TabView`, or a top-level toolbar button (which may either navigate inline or present a modal sheet). The settings screen must wrap its contents in an `AppFairSettings(bundle: .module) { ... }` block, supplied by the `AppFairUI` module of the `appfair-app` package. The wrapper surfaces the App Fair-supplied rows (about, attribution, third-party licenses, and links back to the App Fair Project) alongside the app's own configuration rows.

Implementation details and a code example are in [Building Your App](/docs/building/#appfair-ui).

## Licensing {#licensing}

App Fair apps must be licensed under the [**GNU General Public License version 2.0 or later**](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt) (GPL-2.0-or-later). It exists to guarantee that the source for every shipped binary remains freely inspectable, and to allow the broader community to maintain, fork, or rescue the project if the original maintainer becomes unavailable.

The top-level application may depend on libraries released under any [GPL-compatible](https://www.gnu.org/licenses/license-list.html#GPLCompatibleLicenses) OSI-approved license, including Apache 2.0, MIT, BSD, and MPL 2.0.

### Dependencies {#dependencies}

All non-platform dependencies of an App Fair app must themselves be completely free and open source, and must be released under an [OSI-approved license](https://opensource.org/licenses). "Platform dependencies" refers to the operating system itself and the SDKs supplied by the platform vendor (Apple's SDKs on iOS, Android's SDKs on Android); these are not subject to the requirement. Every other dependency, whether direct or transitive, must satisfy it.

This requirement is the practical extension of the project's commitment to verifiable transparency. A user, an auditor, or a future maintainer must be able to read the source of every component that ends up on the user's device. A proprietary or source-unavailable library, even if it appears to behave well, defeats this guarantee.

<aside class="callout callout-caution">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/block.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Some popular libraries are excluded</p>
    <p>The dependency requirement rules out a number of widely used libraries. Notable examples include Firebase (closed-source client SDKs), libraries that depend on Google Play Services (proprietary, available only on Play-certified devices), and most vendor-specific analytics, attribution, and crash-reporting SDKs. The presence of such a dependency, even indirectly through a transitive chain, will block acceptance into the catalog.</p>
    <p>Where a proprietary SDK provides functionality that an App Fair app genuinely needs, an open-source alternative or a direct protocol-level integration should be used in its place.</p>
  </div>
</aside>

When the licensing or openness of a prospective dependency is uncertain, the question should be raised on the [discussion forums](https://github.com/orgs/appfair/discussions) before the dependency is added to the project. Identifying a problematic library at the proposal stage costs significantly less than removing it from a substantially developed app.

When a new App Fair project is initialized with `skip create --appfair`, a `LICENSE.GPL` file is added to the repository. This file should not be removed.

## Naming {#naming}

Each app has two distinct names that the inclusion criteria treat differently:

- The **app token** is the immutable identifier used for the app's GitHub organization and repository (e.g. `Faire-Games`). It appears in URLs and tooling and never changes for the lifetime of the project. The token only needs to be unique within the App Fair catalog and conformant with GitHub's organization-name rules.
- The **displayed title** is the localizable string the user sees on their device home screen and in store listings (e.g. "Fair Games"). It is set in `Skip.env` and the [Fastlane metadata](/docs/submitting/#metadata), can differ per locale, and may change over time without affecting the token.

The displayed title is the one that must be distinctive and unique. It must not collide with any existing App Fair app and must not be confusingly similar to any well-known application on the commercial app stores.

<aside class="callout callout-caution">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/link_off.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Verifying title availability is non-trivial</p>
    <p>Confirming title availability worldwide is difficult: the commercial app stores include many name-squatters, and trademark scopes vary by jurisdiction. Displayed titles should be selected with the understanding that they may need to change prior to publication or in response to a later dispute. The app token, by contrast, is private to the App Fair / GitHub namespace and is not subject to commercial trademark conflict — renaming an early-stage token is straightforward, but it is not normally necessary.</p>
  </div>
</aside>

## External storefront requirements {#storefronts}

Conformance to the App Fair's own inclusion criteria is necessary, but it is not sufficient for an app to reach end users. Every storefront the App Fair publishes to imposes its own additional requirements, and the binary submitted by the App Fair must satisfy each applicable store's policy on top of the criteria above. Maintainers should familiarise themselves with the relevant guidelines and design their app to meet the strictest applicable rules; where two stores' rules conflict, the app should comply with both.

The canonical references for each distribution channel:

- **Apple App Store.** The [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) cover content, safety, performance, business, design, and legal expectations for every app shipped through the App Store. The corresponding [App Store Connect Resources](https://developer.apple.com/app-store-connect/resources/) describe the technical submission process.
- **Google Play Store.** The [Google Play Developer Program Policies](https://play.google.com/about/developer-content-policy/) define analogous content, monetisation, technical, privacy, and policy rules. The [Restricted Content](https://support.google.com/googleplay/android-developer/topic/9858052) and [Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469) sections are the items most likely to surface during review.
- **F-Droid.** F-Droid is the long-standing non-commercial Android storefront; distribution through it is a planned App Fair channel. Its [Inclusion Policy](https://f-droid.org/docs/Inclusion_Policy/) is more stringent on dependencies and proprietary components than the commercial stores, but in practice overlaps closely with the App Fair's own criteria.

App Fair maintainers reviewing a submission do not adjudicate every store-specific rule, but a submission that visibly conflicts with a store guideline will be flagged for the developer to resolve before the binary is submitted. Rejections that arrive after submission (from Apple or Google) are surfaced to the upstream maintainer through the channel described in [Division of responsibilities](/docs/deploying/#responsibilities).

## Submitting a proposal {#unsure}

When the suitability of an idea is uncertain, a proposal should be posted on the [discussion forums](https://github.com/orgs/appfair/discussions) before development begins. Pre-submission discussion costs significantly less than rejection of a completed project, and the community may identify existing projects that the contributor could join rather than start from scratch.

Once an idea has been evaluated against the criteria above, proceed to **[Building Your App](/docs/building/)**. When the app is ready to ship, the criteria here are translated into a concrete pre-submission gate in the **[Submission Checklist](/docs/submitting/#checklist)**.

<aside class="callout callout-tip">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/alt_route.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Apps that don't fit can still be published directly</p>
    <p>An app that does not satisfy the criteria above is not eligible for distribution through the App Fair, but nothing in the default project layout precludes the developer or organisation from publishing it independently. The upstream source repository remains under the developer's full control, and the Skip project scaffold imposes no encumbrance that would prevent a parallel direct submission to the stores. Direct publication to the <a href="https://developer.apple.com/programs/">Apple Developer Program</a> requires an Apple developer account, and direct publication to the <a href="https://play.google.com/console/about/">Google Play Console</a> requires a Google developer account. The App Fair operates these accounts on behalf of the catalog, but does not own or constrain the upstream source.</p>
  </div>
</aside>
