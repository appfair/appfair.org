---
title:  "App Fair Retrospective, 2024"
date:   2024-12-24
tags: [news, update]
layout: post
author: "Marc Prud'hommeaux"
---

As 2024 draws to a close, we reflect on the activities and progress of the App Fair Project.

The year started out with anticipation of Apple's compliance with the *Digital Markets Act*. As we wrote in [last year's retrospective](app-fair-2023-retrospective), the expectation was that iOS would be granted the technological capabilities to create a storefront application that can download, install, and update apps independently of Apple's App Store, similar to how Android has always supported third-party app storefronts. Instead, the actual compliance solution they have offered is merely an extension of the existing app submission workflow, with the additional option of redistributing approved apps through an "alternative app marketplace". This requires that a marketplace be approved and granted a special entitlement to be able to build and maintain an app store.

We regard this modification of the existing App Store regime as insufficient for the needs of a truly independent app distribution system. However, it is a first step, and we fully expect that the compliance efforts will evolve and expand in the coming months as EU regulators listen to feedback from the community and form their assessment of compliance (as they have recently done with [interoperability requirements](https://digital-markets-act.ec.europa.eu/commission-seeks-feedback-measures-apple-should-take-ensure-interoperability-under-digital-markets-2024-12-19_en)). So in March we applied for the alternative app marketplace entitlement, which required that we set up a European subsidiary organization. This led to the creation of the App Fair France. Once this was established, we were eventually granted the MarketplaceKit development entitlement, which gives us the ability to start implementing the App Fair client application using the new MarketplaceKit APIs.

However, to actually be able to distribute applications through the marketplace, we must be granted an additional "distribution entitlement", and we were informed that this requires the posting of a €1,000,000 letter of credit. This sum obviously presents a significant barrier to a project of this nature. We have requested an exemption from this requirement as a non-profit and are hopeful that Apple will eventually grant it.

Other activities throughout the year include participation on various panels and working groups that are assessing the DMA compliance efforts of the gatekeepers. In March I attended the EC Digital Markets Act workshop to assess the current state of compliance, which I [wrote about](digital-markets-act-workshop). Throughout the autumn, I participated in a "Workshop on Mobile Ecosystems – Technical & Security Issues" for alternative app installation channels, which is to be published on the European Commission’s website.

None of this wrangling is fun or pleasant, but is is all a prerequisite for the App Fair Project's mission: to provide a free universal app store to distribute software for the common good. We expect that 2025 will be the year that we will be able to start distributing free apps in a truly independent manner.



<!-- 
The actual changes they unveiled in March 2023 were a far cry from this: they simply expanded their App Store Connect program to permit submission of apps that could additionally target "alternative app marketplaces". As it is with the current regime, prospective developers must apply to the paid Apple Developer Program, and, if approved, can submit their apps through the App Store portal with the added possibility of specifying an 
 -->

<!-- 
The mission of the App Fair is to create a universal store of free and open-source apps that serve the public interest. By "universal", we mean that the applications should be usable regardless of location, language, or device. In order to enable this, we are not only working on the technologies to facilitate the creation and distribution of these applications, but equally important is our work towards establishing the ability to distribute these apps independently of any gatekeeping entities, so that free software developers can have faith that their efforts will be durable.

The main barrier to this vision has, thus far, been the question of distribution. The mobile smartphone market is split between Android and iOS, the former being dominant worldwide (with 75% of the total smartphone market), whereas the latter dominates the high-end of the spectrum. Supporting both operating systems for our apps is critical to our mission of universality.

The independent distribution of apps on Android has long been supported by the operating system. The Google Play Store is just one of many app storefronts available for devices running that OS: there are dozens of other very popular stores, some of which are run by device manufacturers (such as Samsung and Huwai) and others that are focused on certain market segments (such as Epic Games). And there are also stores that are focused solely on the distribution of free and open-source software, such as F-Droid. Creating an app store for Android is a simple matter of writing the software to download, install, and update apps from a certain repository using the published application programming interfaces (APIs).

The iPhone, on the other hand, had historically had only one official avenue for downloading and installing apps: the Apple App Store. They did not publish APIs for how to install and manage apps on the device, and even though there have been efforts to use unofficial methods going back to the Cydia store in 2008 (which pre-dates the App Store), these efforts have been periodically blocked and disabled to the point where attempting to circumvent the monopoly Apple holds on distribution has been a never-ending game of cat and mouse.

This all promised to change – in Europe at least – with the passage of the *Digital Markets Act* and the official designation of Apple as a "gatekeeper". It was mandated that Apple must open up their devices to competition on a number of fronts, including supporting third party app stores. 
 -->

