---
title: Glossary
description: Recurring terms used throughout the App Fair Creator Guide.
---

Recurring terms used throughout the documentation, in alphabetical order. Question-and-answer-style entries are on the [FAQ](/docs/faq/) page.

## App Token {#token}

The immutable identifier for an App Fair app's source. The token is the name shared by the app's GitHub organization and its repository (e.g. `Faire-Games`) and is the first positional argument passed to `skip init --appfair`. It is distinct from the app's **displayed title** (e.g. "Fair Games"), which is localizable and may change over time.

See also: [Naming](/docs/inclusion-criteria/#naming), [Create a GitHub organization](/docs/building/#org), [Initialize the Skip project](/docs/building/#skip-init).

## Call for Maintenance (CFM) {#cfm}

A public posting on the App Fair discussion forums asking the community to take over maintenance of an app whose original maintainer can no longer continue. The CFM describes the project, its current state, and the expectations on a successor; if someone steps forward, they can be added to the app's GitHub organization and ownership is transferred incrementally. The organization-per-app convention is what makes a CFM handoff feasible without entangling personal accounts.

See also: [Project handoff](/docs/maintenance/#handoff).

## Code Hub {#hub}

A source-hosting platform on which an App Fair app's source repository lives. GitHub is the only currently supported code hub; GitLab, Codeberg, and self-hosted Forgejo are on the project roadmap.

See also: [Create a GitHub organization](/docs/building/#org), [Will the App Fair support code hubs other than GitHub?](/docs/faq/#other-hubs).

## Digital Public Good {#dpg}

A [digital public good](https://en.wikipedia.org/wiki/Digital_public_goods) is an application that is free of cost, free of advertising and tracking, and built from free and open-source software, intended for general benefit rather than commercial gain. Every App Fair app is a digital public good in this sense.

See also: [What is the App Fair?](/docs/#what), [Philosophy](/docs/philosophy/), [Digital public goods (Wikipedia)](https://en.wikipedia.org/wiki/Digital_public_goods).

## Fastlane {#fastlane}

An open-source convention for managing mobile-app store metadata as plain-text and PNG files alongside the source code. App Fair apps store their App Store and Play Store metadata under `Darwin/fastlane/` and `Android/fastlane/`.

See also: [Write store metadata](/docs/submitting/#metadata), [Project layout](/docs/building/#layout), [Fastlane documentation](https://docs.fastlane.tools/).

## Fork {#fork}

The mirror of an App Fair app's source repository inside the [`appfair`](https://github.com/appfair) GitHub organization (often referred to as "the `appfair/` fork"). The fork holds the signing credentials and store API keys, and is the entity that builds, signs, and publishes the app to the stores.

See also: [The fork-based distribution model](/docs/deploying/#model), [Division of responsibilities](/docs/deploying/#responsibilities), [Request an `appfair/` fork](/docs/submitting/#fork-request).

## Four Cornerstones {#four-cornerstones}

The four design principles every App Fair app is built around: **Transparent** (free and open source), **Ubiquitous** (every mobile platform), **Global** (every language), and **Accessible** (every ability). They build on the Free Software Foundation's [Four Essential Freedoms](https://en.wikipedia.org/wiki/Free_software#Definition).

See also: [Philosophy](/docs/philosophy/#four-cornerstones).

## Inclusion Criteria {#inclusion-criteria}

The policy that defines which applications are eligible for distribution through the App Fair: prohibited content, encouraged characteristics, licensing, dependencies, naming, and external-storefront compliance. The philosophical underpinnings live separately in [Philosophy](/docs/philosophy/).

See also: [Inclusion Criteria](/docs/inclusion-criteria/), [Submission checklist](/docs/submitting/#checklist).

## Skip {#skip}

The cross-platform mobile development framework from [skip.dev](https://skip.dev/) used by every App Fair app. Skip produces a native iOS app and a native Android app from a single Swift codebase.

See also: [Project model](/docs/building/#mental-model), [Skip documentation](https://skip.dev/docs/).

## Skip Lite {#skip-lite}

The Skip mode in which Swift source is transpiled to Kotlin, producing a native Jetpack Compose Android app. App Fair apps must use Skip Lite; the alternative Skip Fuse mode is not yet suitable for App Fair distribution.

See also: [Project model](/docs/building/#mental-model), [Skip modes](https://skip.dev/docs/modes/).
