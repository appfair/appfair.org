---
title:  "Fear and Loathing in the App Stores"
date:   2026-02-06
tags: [news, blog, fosdem, dma, app, store]
layout: post
author: "Marc Prud'hommeaux"
draft: false
---

I presented a talk on the FOSDEM main track in Brussels last weekend titled "Fear and Loathing in the App Stores" ([abstract](https://fosdem.org/2026/schedule/event/TYZH97-fear-loathing-app-stores/)). It was amazing to see so much interest in the topic, and I had a lot of great conversations afterwards with folk who shared the alarm at the lack of choices, competition, and freedom.

<div class="video">
  <video preload="auto" controls="controls" width="100%">
    <source src="https://video.fosdem.org/2026/k1105/TYZH97-fear-loathing-app-stores.av1.webm#t=1" type="video/webm; codecs=&quot;av01.0.08M.08.0.110.01.01.01.0&quot;">
    <source src="https://video.fosdem.org/2026/k1105/TYZH97-fear-loathing-app-stores.mp4#t=1" type="video/mp4">
  </video>
</div>


_Following is my draft of the talk. My speaker notes weren't working, so the talk as presented was somewhat more extemporaneous that I had planned, but it mostly followed along the same points as the draft._

## Introduction

Hello everyone. I'm here today to talk about mobile devices, app stores, and software freedom.

The majority of humans carry around a little computer in their pocket. These devices are pretty magical: they are packed with high-tech cameras and microphones and sensors and networking and communication hardware.

They also store nearly every personal detail about you: who you are, who your friends and family are, where you are, where you are going, and your favorite books and music and movies and web sites.

But do you own this computer? Truly own it? Can you do whatever you want with it? Is it actually yours, or do you merely possess it?

## History

The purpose of a computer is to run software. All that fancy equipment is useless unless there is software that is driving it and telling it what to do.

How does software get on a computer? When I first started programming in 1982 on my TRS-80, I subscribed to a magazine called "The Rainbow"[^rainbowmag] that would publish pages of source code that I would tediously transcribe into the computer's BASIC interpreter — mostly games and graphics demos and things like that. Later on, I got a cassette peripheral that would allow loading programs from magnetic tape. Then onto floppy disks, and so on.

Nowadays, software distribution through physical media is completely gone. It is almost inconceivable that software would be obtained through any means other than downloading it from the internet. The advent of the modern smartphone also coincided with the advent of "app stores" that collect and bundle catalogs of downloadable programs.

What is an app store? It is essentially just an app that can download and install other apps. It also has other useful features, like the ability to browse and search for applications, to read and post reviews, and to update to new versions of the app. But ultimately, an app store is just an app that installs apps.

So far I've just been telling you things you probably already know.

## A Tale of Two Platforms: the Duopoly

The state of the world in 2026 is that nearly every one of these pocket computers runs one of two operating systems: Apple's iOS, which powers their iPhone and iPad devices, or Google's Android, which powers their own line of Pixel devices, as well as a myriad other devices from other manufactures that either license Android Certification or that build on top of the foundational Android Open-Source project (AOSP).

Android is installed on around 75% of all smartphones worldwide, with iOS taking up the remainder; this ratio varies greatly on a per-country basis, with the iPhone being more widely-used in richer countries due it is higher price. But regardless, these two companies form a global duopoly, controlling the operating systems that are installed on over 95% of all smartphones worldwide outside of China.

### Apple

The first "app store" for this modern generation of smartphones was called Cydia, and was developed by Jay Freeman — also known as "saurik" — in 2008.[^cydia] It was a thriving marketplace with thousands of apps and millions of users.

Apple then released iOS 2.0 that contained their own bundled App Store app and suddenly claimed the exclusive right of software distribution on their phones. As the same time, they banished Cydia by locking down the operating system to break the mechanism that Cydia had been using to install software. Cydia managed to limp along for a few more years by finding workarounds to get their software installed, but ultimately when your operating system vendor is determined to crush you, you will likely always lose.

From then on, and until very recently, the Apple App Store has been the one and only app store on iPhones and other iOS devices.

### Google

As for the other half of the duopoly, Google's Android has historically been more open. Android has long provided APIs for developers to build their own "app store", and many have done exactly that over the years. These stores might be commercial, like the Amazon Appstore and Samsung Galaxy Store, or they might be non-commercial, like F-Droid.

But despite the ability to have additional app stores, it was never a level playing fields: the terms of Android Certification and its related contracts required that the Google Play store be the one and only app store that is pre-installed and prominently positioned on Android devices.

### Apple + Google

Despite supposedly being competitors in the smartphone space, Apple and Google's actual marketplace policies are startlingly similar. They both require developers to register with their respective portals, pay a fee, agree to lengthy, nonnegotiable, and ever-changing terms and conditions, and then submit themselves to an opaque and indeterminate "app review" process whenever they upload a new app or submit an update to an existing app.

Developers willing to undergo all of this get the benefit of reaching the billions of users served by these marketplaces, but at the cost of a 30% fee skimmed from the top of any and all digital transactions that take place through the app.

These enormous fees have resulted in some of the most profitable business divisions on the history of technology. Google's play store department has around 70% profit margin, and Apple's app store is almost 80%. These margins are extraordinary and unprecedented.

### Why We Fight

So what's the actual problem? Sure, we don't have any real competition, and sure we have to live under the yoke of capricious and authoritarian tech overlords, but what actual harm is being done here?

In the free software community, we often think of free software as an end that is self-justifying. We love free software because of course we do. But why does the world need free software? Why does the world need open source?

Free software provides a very real and tangible defense against some of the harms that are actively being perpetrated against millions of smartphone users on a daily basis.

### A Silent Hazard: Normalized Malware

The exorbitant digital taxes I mentioned have led to commercial app developers eschewing the practice of selling their apps directly, and instead resorting to shady tactics to extract monetization from users through other means. One common avenue for this is ad-tech: making money by displaying advertisements to users.

This by itself can be quite profitable, since unlike the web, it is all but impossible to block ads in native applications. And on top of this, the ad-tech that is utilized by these apps is invariably communicating with data brokers, surreptitiously and non-consensually building a profile on users based on every piece of information they can get their hands on.

And that can be a lot of data: depending on what permissions an app can plausibly request, an app might have access to your location, your contacts, your calendar, your photos, and much more. All this data can be siphoned off without your knowledge or consent, and goes towards assembling a profile of you for targeted advertisement, for tracking, and for surveillance, and retained indefinitely, for who knows what future purpose, years or decades down the road. All without your consent or knowledge.

This is malware in its purest form, but these apps are not only accepted, but oftentimes promoted, by the first-party app stores.

## A Solution: Free Software

If we could see inside these apps, we could tell what they were doing any how they are doing it, then we would be able to identify which apps are respecting our rights and which are clandestinely stealing our intimate personal information.

But apps distributed to the app stores are not distributed with their source code, but rather are compiled down into opaque binary blobs whose code is obfuscated or encrypted. Laws like the Digital Millennium Copyright Act in the United States — and the various equivalents subsequently passed in most aligned countries — make it a felony to try to break open these apps to study and reveal their inner workings.

So, free software to the rescue, right? Once could just avoid these hazards by having a personal policy of only ever installing free and open-source software on their devices. It might be tedious to have to cross reference every app you want to install from the Goole Play Store or Apple App Store with some externally curated list of open-source apps, but would be possible, right?

Except, even in cases where you have winnowed a list of potential apps down to only contain ones that are free and open source, how do you actually validate this list? After all, you are just getting an obfuscated or encrypted blob from the app stores. Who is to say that the source code that the creator claimed corresponded to your app is actually complete, and hasn't had certain malicious bits of it stripped out of it in order to pass scrutiny?

## Enter F-Droid: Trust, but verify

For 15 years, there has been an app store for Android called [F-Droid](https://f-droid.org). As I mentioned previously, there are many app stores on Android, but F-Droid is special: it not only has a policy of including only free and open-source applications, it also has the means to prove it.

When an app is submitted for including in the F-Droid catalog, it is built from the source code, either by the F-Droid servers themselves, or by verifying the reproducibility of a pre-built binary that the developer submits. Reproducibility means that anyone — not just F-Droid — is able to take the source code, build it themselves, and verify, byte-for-byte, that the compiled artifact matches the app that you are installing on your device. In this way, users can have real trust in the applications they choose to let into their lives.

## A New Hope for iOS: the Digital Markets Act

F-Droid is great, but it only helps the Android half of the market. iPhone users were still stuck with the "trust-me-bro" security that they have become accustomed to in that App Store exclusive environment. At least, that was until the advent of the EU's Digital Markets Act, which was proposed in 2020, passed in 2022, and went into enforcement in March of 2024.[^dma]

One of the requirements of the DMA was that the "digital gatekeepers" of "online intermediation services" — i.e., Apple and Google with their app stores — be required to open them up to competition and interoperability. For Apple, this meant that for the first time since the demise of Cydia, they would have to permit additional app stores onto their devices.

So the outlook was rosy. We could finally have complete control of the software we let into our lives, regardless of which ecosystem we find ourselves in?

## The Empire Strikes Back: the gatekeepers' counter-assault on software freedom

Unfortunately, Apple wound up implementing a twisted misinterpretation of the rules. Their claimed compliance was to establish a program they called "Alternative App Marketplaces",[^altappmarketplaces] but they were in no way independent. The marketplaces would need to apply to Apple to be vetted and approved, provide 1 million euros in the form of a letter of credit, and agree to onerous junk fees and persistent oversight.

For developers, they would continue to have to apply to the Apple developer program, pay an annual $100 developer fee, agree to the same nonnegotiable terms and conditions as if they were distributing on Apple's App Store, and continue to submit their apps and updates though the Apple App Review process, even to get them distributed through the alternative app marketplace of their choosing. It is in no way, shape, or form complying with either the spirit or letter of the DMA, and they've gotten away with it without any regulatory repercussions.

Despite all these hurdles and barriers, some new marketplaces have managed to emerge. [AltStore](https://altstore.io) is one of them, and its catalog is growing to include new and novel applications that never would have seen the light of day on the Apple App Store.

However, it continues to be impossible to distribute trustworthy and reproducibly built open-source applications through the alternative app marketplace scheme, because when a developer submits their app to Apple and waits for the manual app review process — or "notarization" as they term it — the end result is that the approved app will be wrapped in an encrypted package and signed by Apple themselves, and only then is the bundle passed off to the Alternative App Marketplace for subsequent distribution through to the end user.

Neither the user, not the app marketplace itself, is ever permitted to see inside this encrypted bundle. Not only does this make it impossible for the user to trust and verify the contents of an app that claims to be free and open source, it also makes it impossible for the app marketplace itself to comply with one of Apple's core requirements for alternative distribution, which is that the marketplace vouch that all apps they distribute are completely free of malware. But this is an impossible requirement, because they forbid the marketplace from examining the apps themselves.

## Google: I have altered the deal (pray I don't alter it further)

But at least we still have Android and alternatives like F-Droid, right?

Well, not to be out Darth-Vadered by Apple, Google last year announced out of the blue that it was no longer going to be possible to independently distribute applications without registering centrally with Google.[^googledevreg] Starting this year, they say that developers will be required to create an account with Google, verify their identity, pay a fee, agree to terms and conditions, and register each and every one of their applications centrally with Google. Failure to do so will result in Android Certified devices refusing to install the app at all.

This is an existential threat to software freedom in general, but also to F-Droid specifically.[^fdroidblog1] We cannot require that developers register with Google, and many will not. If this policy gets implemented, the world will be deprived of some of the most trustworthy and privacy-respecting applications every created.  

So instead of inching forward, we are suddenly lurching backwards.

## Consolidating Power

As the big tech duopoly increasingly tightens their stranglehold over mobile software, we need to be acutely aware of what is at stake with an app store monoculture. This centralization by unaccountable actors has real global consequences. 

And this isn't just about the prevalence bad software. This is also about what software isn't available. It is about what is banned, blocked, or never approved in the first place.

Your right to protest (Hong Kong 2019), to hold free and fair elections (Russia 2021), and to protect yourself from police brutality (US 2025) is directly jeopardized by the centralized kill switches these companies hold, and their willingness to use it when extra-legal pressure is applied by powerful actors. This couldn't happen in an open and competitive marketplace.

## How We Fight: Make your voice heard

The prospects for any meaningful regulation happening on my own home country over the next few years are next to zero. As you have probably already guessed, I'm from the United States.

However, since I'm speaking to a predominantly European crowd, you have the fortune of still having strong regulatory bodies and policymakers that are receptive to the needs of their citizens. Reach out to them. Visit https://keepandroidopen.org to find out who you can contact and the best way to go about it.

And on an individual level, if you are a developer: create free software and distribute it **first** through the alternative stores: through F-Droid for Android and through AltStore for iOS. You can always distribute it additionally through the first-party app stores afterwards, but the best way to show your support for the alternatives is to make them no longer be "alternatives", and it is only with your high-quality software they they can thrive and expand.

And even if you are not a developer, you should still be using these stores. Download and install [F-Droid](https://f-droid.org) on your Android phone, or [AltStore](https://altstore.io) on your iPhone. They cost nothing, and the mere act of having these present on your device helps chip away at the self-perceived indomitability of the tech giants.

And who knows, before too long, they may become your primary — or only — source of applications.

Thank you for your time, and enjoy the resort of FOSDEM!

---

## Footnotes

[^rainbowmag]: The Rainbow was a monthly magazine dedicated to the TRS-80 Color Computer, a home computer made by Tandy Corporation. Sources: [Wikipedia — The Rainbow (Magazine)](https://en.wikipedia.org/wiki/The_Rainbow_(magazine)), [Archive.org — Rainbow Issue 111](https://archive.org/details/198401Rainbow)
[^cydia]: Cydia was first released by Jay Freeman (saurik) on February 28, 2008, for iPhone OS 1.1.x, providing jailbroken iPhone users with an alternative app store before Apple's official App Store launched later that year. Sources: [Wikipedia - Cydia](https://en.wikipedia.org/wiki/Cydia), [Wikipedia - Jay Freeman](https://en.wikipedia.org/wiki/Jay_Freeman), [iDownloadBlog - Cydia Store Shutdown FAQ](https://www.idownloadblog.com/2018/12/16/cydia-store-shut-down-faq/)

[^dma]: The Digital Markets Act (DMA) was proposed by the European Commission in December 2020, formally adopted by the European Parliament on July 5, 2022, signed into law on September 14, 2022, and came into force on November 1, 2022. The regulation started applying on May 2, 2023, with gatekeepers designated on September 6, 2023. Full compliance became mandatory on March 6-7, 2024. Sources: [Wikipedia - Digital Markets Act](https://en.wikipedia.org/wiki/Digital_Markets_Act), [European Commission - Digital Markets Act](https://digital-markets-act.ec.europa.eu/index_en), [TechPolicy.Press - DMA Roundup March 2024](https://www.techpolicy.press/digital-markets-act-roundup-march-2024/)

[^altappmarketplaces]: Apple announced changes to iOS, Safari, and the App Store in the European Union on January 25, 2024, to comply with the Digital Markets Act. The changes included introducing "Alternative App Marketplaces" (also called alternative app distribution), new payment options, and alternative browser engines. However, the implementation required marketplace developers to provide a €1 million letter of credit, submit to Apple's notarization process, and pay various fees including the Core Technology Fee. The European Commission opened non-compliance investigations against Apple on March 25, 2024, and sent preliminary findings on June 24, 2024, that Apple's business terms continued to impose anti-competitive provisions. Sources: [Apple Newsroom - EU Changes Announcement](https://www.apple.com/newsroom/2024/01/apple-announces-changes-to-ios-safari-and-the-app-store-in-the-european-union/), [Brookings - Overseeing App Stores Under the DMA](https://www.brookings.edu/articles/overseeing-app-stores-to-promote-competition-in-the-digital-markets-act/), [TechPolicy.Press - Understanding Apple Non-Compliance](https://www.techpolicy.press/understanding-the-apple-and-meta-noncompliance-decisions-under-the-digital-markets-act/)

[^googledevreg]: Google announced in August 2025 that it would require all Android app developers to undergo identity verification and register with Google, regardless of whether they distribute through Google Play or alternative channels. The policy requires developers to provide legal name, address, email, phone number, and government-issued ID, plus pay the $25 registration fee. Early access began in October 2025, with full enforcement starting in September 2026 in Brazil, Indonesia, Singapore, and Thailand, followed by global rollout in 2027. Sources: [Announcement - Android Developer Blog](https://android-developers.googleblog.com/2025/08/elevating-android-security.html), [Keep Android Open](https://keepandroidopen.org/)

[^fdroidblog1]: F-Droid published a detailed response to Google's developer registration decree on September 29, 2025, warning that the policy represents an existential threat to the project and to software freedom on Android. Source: [F-Droid - Google's Developer Registration Decree](https://f-droid.org/2025/09/29/google-developer-registration-decree.html), [F-Droid - What We Talk About When We Talk About Sideloading](https://f-droid.org/2025/10/28/sideloading.html)

