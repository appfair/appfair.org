---
title:  "App Fair Retrospective, 2023"
date:   2023-12-25
tags: [news, update]
layout: post
author: "Marc Prud'hommeaux"
---

2023 was the first full year of the App Fair Project's existence. This post looks back on the year, and towards 2024.

The mission of the App Fair Project — as conceived in the Spring of 2022 — is to nurture and distribute global digital public goods in the form of mobile applications. In other words, we will make free and useful apps, and we will make them global. 

"Global" is meant both in consumer terms (apps will be translated and localized for many languages and regions) as well as in hardware terms (apps will be universally available for both iPhone and Android devices: 99% of all smartphones). An App Fair app aims to reach the entire global community of smartphone users, regardless of language, device, or region: a market that encompasses over 75% of the world's population.[^1]

The year 2023 was spent laying the technological foundations to support the project. We now have the beginnings of a development pipeline to create and contribute apps, and to build and submit those projects – via the App Fair organization – to both the Apple App Store and the Google Play Store. We have shipped a single app through to production on the App Store, and another as a beta to the Play Store. This has served as a proof of concept for us, and we envision this pipeline evolving to support all aspects of the app submission and distribution process.

In 2024 we intend to complete these workflows, to the point where independent projects can start contributing their own apps through the project. This will allow app projects to release their apps through to Android devices that run the Google Play Store and iOS devices that use the Apple App Store. However, this does not cover all the devices: there are numerous Android distributions provided by other organizations, such as Amazon, LineageOS, and most Chinese smartphone vendors, that do not use the Google Play store.

In order to support 100% of the available devices, we will be releasing our own universal "App Store" for both iOS and Android: the App Fair app. This app will be available everywhere, and will act as a transparent and unbiased directory of App Fair projects. It will provide a unified interface for finding, downloading, installing, and updating App Fair apps, but it will be unencumbered by advertisements, tracking or other analytics. The App Fair app will be — like all our other projects — 100% free and open-source software.

Android already has the sufficient technological capabilities to support this sort of app-store app, which is already being utilized by other free software projects such as F-Droid. And while there has historically been no equivalent support for this on the iPhone side, they recently added a new *ManagedAppDistribution*[^2] framework to support this as required by the Digital Markets Act (DMA)[^3]. We have taken the first steps to obtain the necessary approvals and entitlements from Apple to utilize this framework. We will be writing articles and technical posts on the process once we have been granted these entitlements, in order assist with other similar projects who may want to create their own app store.

Our goal is to provide a free and ubiquitous source of apps that smartphone users can trust and rely on for everyday needs. App Fair apps will contain no advertisements, no in-app purchases, analytics, or other dark patterns. Contributors to these projects can be confident that their efforts will be available to everyone in the world, in perpetuity. 

2024 will be an exciting year for the App Fair. Please follow this blog for progress and updates.

[^1]: 75.05% as of 2020 according to [https://www.statista.com/topics/840/smartphones/#topicOverview](https://www.statista.com/topics/840/smartphones/#topicOverview)
[^2]: Apple developer documentation: “Provide a consistent app presentation in your organization’s app store” [https://developer.apple.com/documentation/managedappdistribution/fetching-and-displaying-managed-apps](https://developer.apple.com/documentation/managedappdistribution/fetching-and-displaying-managed-apps)
[^3]: Compliance principles for the Digital Markets Act: [https://www.bruegel.org/policy-brief/compliance-principles-digital-markets-act](https://www.bruegel.org/policy-brief/compliance-principles-digital-markets-act)
