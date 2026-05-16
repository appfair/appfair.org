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

### The Three Pillars {#three-pillars-requirement}

Every App Fair app should aim to support the [three pillars](/docs/#three-pillars): **ubiquitous, global, and accessible**.

- **Ubiquitous.** The app ships on both iOS and Android from a single Skip codebase. Ideas that cannot work on one of the two platforms are not eligible. Platform-specific refinements are permitted, but the core experience must be available to both audiences.
- **Global.** Every user-facing string is externalized through a [`Localizable.xcstrings` String Catalog](https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog), the app accommodates translated layouts, and store metadata is translated for as many of the App Fair's primary locales as is feasible.
- **Accessible.** Standard SwiftUI [accessibility view modifiers](https://developer.apple.com/documentation/swiftui/view-accessibility) are applied to all interactive and non-text elements, Dynamic Type is respected, and the app passes manual VoiceOver review on iOS and TalkBack review on Android. Skip translates these modifiers into the equivalent [Jetpack Compose accessibility semantics](https://developer.android.com/develop/ui/compose/accessibility) automatically.

A first submission is not expected to be perfect against each pillar. A clear commitment to each pillar is expected, along with an architecture that allows each pillar to be improved over time.

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

Each app requires a distinctive, unique name. The name must not collide with any existing App Fair app and must not be confusingly similar to any well-known application on the commercial app stores.

<aside class="callout callout-caution">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/link_off.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">Verifying name availability is non-trivial</p>
    <p>Confirming name availability worldwide is difficult: the commercial app stores include many name-squatters, and trademark scopes vary by jurisdiction. Names should be selected with the understanding that they may need to change prior to publication. Renaming an early-stage project is straightforward; defending a name in a takedown dispute is not.</p>
  </div>
</aside>

## Submitting a proposal {#unsure}

When the suitability of an idea is uncertain, a proposal should be posted on the [discussion forums](https://github.com/orgs/appfair/discussions) before development begins. Pre-submission discussion costs significantly less than rejection of a completed project, and the community may identify existing projects that the contributor could join rather than start from scratch.

Once an idea has been evaluated against the criteria above, proceed to **[Building Your App](/docs/building/)**.
