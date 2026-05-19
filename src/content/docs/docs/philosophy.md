---
title: Philosophy
description: The principles behind the App Fair Project and the Four Cornerstones every catalog app rests on.
---

The App Fair's purpose is to create global digital public goods in the form of mobile applications: software that is free of cost, free of advertising and tracking, and built from free and open-source software, in the service of users rather than advertisers.

The Four Cornerstones below operationalise that purpose. They build on the [Four Essential Freedoms of Free Software](https://en.wikipedia.org/wiki/Free_software#Definition) defined by the Free Software Foundation, extending them with the additional characteristics — reach, language, and ability — that make a free application's freedom meaningful in practice for a global mobile audience.

## The Four Cornerstones of an App Fair App {#four-cornerstones}

Every App Fair app is designed around four cornerstones, which build directly on the [Four Essential Freedoms of Free Software](https://en.wikipedia.org/wiki/Free_software#Definition). Each cornerstone should shape the project from the outset; retrofitting any of them after the fact is significantly more expensive than designing for it from the first commit.

<div class="diagram-vector cornerstones">
<img style="width: 100%; max-width: 720px; margin: 1.5rem auto; display: block; background: transparent; padding: 0; border-radius: 0;" alt="The four cornerstones of an App Fair app: Transparent, Ubiquitous, Global, and Accessible, arranged in a 2×2 grid." src="/assets/images/cornerstones.svg" />
</div>

### Transparent {#cornerstone-transparent}

An App Fair app is open to inspection, modification, and redistribution by anyone. Its source code, build configuration, and every direct and transitive dependency are published under [free and open-source software](https://en.wikipedia.org/wiki/Free_software#Definition) licences, so that any user, auditor, or future maintainer can study how the application works, verify what it does, modify it for their own needs, and share the result.

This cornerstone is the foundation the others rest on. The [Four Essential Freedoms of Free Software](https://en.wikipedia.org/wiki/Free_software#Definition) — the freedoms to run, study, modify, and redistribute the software — are what make community translation, community accessibility improvements, and independent verification possible at all. The licensing and dependency rules under [Licensing](/docs/inclusion-criteria/#licensing) in the Inclusion Criteria are the operational expression of this cornerstone.

### Ubiquitous {#cornerstone-ubiquitous}

An App Fair app strives to be available for every mobile device and operating system. Currently, this entails support for both iOS and Android. In the future, this will include additional emerging platforms as they become more prominent. A user on a current-model iPhone and a user on a budget Android device should receive the same set of features, each refined to feel at home on the respective platform.

SwiftUI source is compiled to a native iOS app and transpiled to a native Jetpack Compose Android app, so the underlying mechanics of cross-platform delivery are handled automatically. The developer's responsibility is to make platform decisions that include both audiences rather than excluding one of them.

### Global {#cornerstone-global}

An App Fair app supports the user's language. Every user-facing string is externalized, the supported locales are kept current, and the store listing is translated alongside the app itself. The catalog aggregates apps across more than a dozen primary locales (Arabic, Chinese, English, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Portuguese, Russian, Spanish, and others). The app must ship with at least **English** and **French** translations as a minimum verification baseline (see [Localization](/docs/building/#l10n-minimum)).

In practice, this requires the use of SwiftUI's localization infrastructure: primarily an [`Localizable.xcstrings` String Catalog](https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog) for every visible string. These catalogs are bridged to Android's string-resource system automatically, so a translation contributed once applies to both platforms.

### Accessible {#cornerstone-accessible}

An App Fair app should be usable by people across the spectrum of abilities. This includes users of [VoiceOver](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios) and [TalkBack](https://support.google.com/accessibility/android/answer/6283677), users of [Dynamic Type](https://developer.apple.com/design/human-interface-guidelines/typography#Dynamic-Type) at the largest sizes, users of [Switch Control](https://support.apple.com/guide/iphone/use-switch-control-iph2db00bef0/ios), and users who rely on sufficient colour contrast.

None of this is optional. Building accessibility in from the start is cheap; retrofitting it later isn't. The same affordances (larger text, better contrast, bigger tap targets) turn out to help most users at some point, not only the users who need them every day.

<aside class="callout callout-tip">
  <span class="callout-icon" style="--icon: url('/assets/icons/callout/hub.svg');" aria-hidden="true"></span>
  <div class="callout-body">
    <p class="callout-title">The cornerstones compound</p>
    <p>An app that is not transparent denies users the four freedoms that make the rest of the project possible. A localized app that is not accessible excludes blind speakers of every supported language. A cross-platform app that is not localized excludes most of the world's mobile users. The four cornerstones deliver their full value only in combination.</p>
  </div>
</aside>

An initial App Fair submission is not expected to be perfect against each cornerstone: they are aspirational cornerstones, and software is always a work in progress. A clear commitment to each cornerstone is expected, along with an architecture that allows each cornerstone to be improved over time.
