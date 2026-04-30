---
title:  "A Gatekeeper's Paradise: the App Fair response to the first review of the Digital Markets Act"
date:   2026-04-29
tags: [news, blog, dma, apple, google, adv, policy]
layout: post
author: "Marc Prud'hommeaux"
---

The European Commission has published its first review of the Digital Markets Act[^ec-review], the landmark regulation that was supposed to break the stranglehold of Big Tech gatekeepers on app distribution. The accompanying Staff Working Document[^swd] provides a detailed assessment of compliance across all designated gatekeepers. Despite the conclusion of the review being that the DMA “remains fit for purpose and has positive impact”[^dma_review_conclusion], after two years of enforcement proceedings, preliminary findings, and hundreds of millions of euros in fines, the bleak reality is that Apple remains the sole gatekeeper for every app installed on every iPhone in the world, and Google, emboldened by Apple's consequence-free defiance, has now begun locking down Android.

Article 6(4)[^dma-text] of the Digital Markets Act is Europe's attempt to pry open the app distribution monopolies. As we argued in our FOSDEM 2026 talk, ["Fear and Loathing in the App Stores,"](https://appfair.org/blog/fear-and-loathing-in-the-app-stores/)[^fosdem-talk] the gatekeepers have every incentive to resist and sabotage this process, and the enforcement mechanisms have thus far proven inadequate to overcome their resistance. The DMA review itself confirms it: the gatekeepers are winning.

## I. Article 6(4): What the DMA Was Supposed to Require

Article 6(4) of the Digital Markets Act mandates that designated gatekeepers:

> "allow and technically enable the installation and effective use of third-party apps or app stores using, or interoperating with, their operating systems, and allow those apps or app stores to be accessed by means other than the gatekeepers' relevant core platform services."[^dma-text]

The intent is plain and unambiguous: users should be free to install apps from wherever they choose (alternative app stores, the web, or directly from developers) without being forced to submit to the gatekeeper's procedures, accept their non-negotiable terms and conditions, and be subjected to their junk fees. Gatekeepers _may_ implement security measures, but _only_ to the extent that they are "strictly necessary and proportionate."[^swd-p20]

### What Actually Happened: Apple's Malicious Compliance

Before the DMA took effect, Apple's App Store was the sole channel for distributing native apps on iOS and iPadOS.[^swd-pre-dma] Article 6(4) was supposed to end this monopoly. But what Apple delivered instead is a masterclass in delay, obfuscation, malicious non-compliance, and outright defiance. Here is a condensed timeline of events:

**January 25, 2024**: Apple announces its DMA compliance plan.[^apple-jan-2024] The centerpiece: a new "Core Technology Fee" (CTF) of EUR 0.50 per "first annual install" above one million downloads, applicable to *all* apps distributed outside the App Store. Their message to developers was: leave the App Store, and we will charge you for every user. Apple also introduces a "Notarization" process, a mandatory review of *every* app, regardless of distribution channel, through Apple's own servers, and imposes eligibility requirements so onerous that most developers and aspiring marketplace operators cannot meet them.[^apple-eligibility]

**March 7, 2024**: The DMA's compliance deadline arrives. iOS 17.4 ships with the changes. In theory, alternative app marketplaces can now operate on iOS. In practice, marketplace operators must either post a EUR 1,000,000 standby letter of credit from an A-rated financial institution, or have been an Apple Developer Program member for two continuous years *and* have an app with over one million EU installs in the prior year.[^fsfe-notarization] Nonprofit and open-source projects (including the App Fair Project), the very organizations that should benefit most from open distribution, are effectively locked out by these steep requirements. And their fallback option presents a comically Kafkaesque scenario: to be free of the gatekeeper requirements, you must first subject yourself to them.

**March 18, 2024**: The Commission hosts a DMA Compliance Workshop for Apple. Attendees (including this author) report an atmosphere of frustration and hostility.[^dma-workshop] Apple's representatives fend off questions by repeatedly invoking "user security, privacy and safety" while offering no technical substance.

**March 19, 2024**: The Coalition for App Fairness[^caf-disclaimer] issues a statement describing Apple's compliance plan as a "continued refusal to comply with the Digital Markets Act."[^caf-slam]

**June 24, 2024**: The Commission opens a formal non-compliance investigation into Apple's Article 6(4) compliance, examining the business terms, fees, the "multi-step user journey for installing app stores and apps from the web," and the eligibility requirements imposed on developers.[^ec-6-4-investigation]

**April 23, 2025**: The Commission finds Apple in breach of the DMA's anti-steering provisions under Article 5(4) and imposes a EUR 500 million fine.[^ec-apple-fine] On the same day, it issues preliminary findings of non-compliance on Article 6(4), the alternative distribution obligation.[^ec-6-4-preliminary] Apple appeals the fine.[^apple-appeal]

**June 26, 2025**: In response to the fine, Apple announces revised EU business terms, replacing the CTF with a "Core Technology Commission" (CTC), a 5% levy on all sales of digital goods and services.[^apple-ctc] Developers report that the new system involves *three separate fees* for certain downloads.[^cnbc-fees]

**January 1, 2026**: Apple moves all EU developers to a unified business model based on the CTC.[^apple-unified] The per-install CTF is nominally eliminated, but the new commission structure ensures Apple continues to extract rents from every transaction, regardless of distribution channel.

**January 2026**: At the Commission's DMA Compliance Workshop, the Coalition for App Fairness[^caf-disclaimer] reports that Apple's representatives "dodged questions" and demonstrated that they "have no intent to comply with the law."[^caf-january-2026]

### The Fundamental Problem: Apple Is Still the Sole Gatekeeper

Through all of these iterations (CTF, CTC, Notarization, eligibility requirements), one fact has remained constant: **Apple remains the sole, mandatory intermediary for every app distributed to every iPhone in the world.** Every developer, whether distributing through the App Store, an alternative marketplace, or the web, must:

1. **Enroll in the Apple Developer Program**, paying Apple's annual fee and agreeing to Apple's non-negotiable terms and conditions.
2. **Submit every app to Apple** through App Store Connect for "Notarization," Apple's euphemism for what is, in substance, the same gatekeeper review process that existed before the DMA, just with slightly loosened restrictions.[^fsfe-notarization]
3. **Accept Apple's unilateral right** to reject, revoke, or delist any app at any time, for any reason Apple deems appropriate.

As the Free Software Foundation Europe has meticulously documented, Apple's Notarization process "represents the very gatekeeping behaviour the DMA was written to prevent."[^fsfe-notarization] The process requires all apps to be "submitted to Apple's servers for scanning, approval, and cryptographic re-signing before installation." Developers of alternative app stores have "no control over the apps they can distribute in their store, as Apple still holds gatekeeping power through notarisation."

This is not compliance: it is the *opposite* of compliance. The DMA requires that app distribution be possible without gatekeeper intermediation. Apple has ensured that gatekeeper intermediation remains mandatory, total, and inescapable, and then relabelled it "Notarization" in place of "App Review."

## II. Google's Android Lockdown: Emboldened by Apple's Impunity

Regardless of whether the Commission's tepid response to Apple's defiance has been due to intentional permissiveness or political pressure, its consequences are now becoming starkly clear. Google has watched Apple scoff at the Digital Markets Act with impunity for two years, being subject to only minuscule fines relative to their revenues, and emerge with its iron-fisted monopoly on app distribution fully intact. And Google has drawn the obvious conclusion: if Apple can get away with it, so can we.

### The Android Developer Verification Program

In September 2025, Google quietly introduced its "Developer Verification" policy[^fdroid-sept-2025], and in March 2026, the program was rolled out to all developers worldwide.[^google-adv-blog] The program establishes, for the first time in Android's history, Google as the central gatekeeper for the distribution of all apps on Android Certified Devices, encompassing over 95% of Android devices globally.[^fdroid-open-letter]

Here is what the program requires:

- **Every developer** who wishes to distribute an app on a certified Android device, whether through the Play Store, an alternative app store like F-Droid, or by direct download, must register with Google through either the Play Console or the new Android Developer Console.[^google-adv-blog]
- **Registration requires** submitting government-issued identification, paying fees, and accepting Google's non-negotiable terms and conditions.[^fdroid-open-letter]
- **Every app** must be "registered," that is, associated with a verified developer identity in Google's database.[^google-adv-blog]
- **Beginning in September 2026**, unregistered apps will be blocked from installation on certified Android devices unless the user navigates an "advanced flow" that includes a 24-hour waiting period and a device reboot.[^google-advanced-flow] This will start being enforced in a select group of vulnerable countries, followed by rolling enforcement worldwide in 2027.[^google-adv-blog]

Google has framed this as a security measure, claiming to have found "90 times more malware" in apps installed outside the Play Store.[^google-adv-blog] But the program's scope reveals its true purpose: it applies universally, to all apps from all sources, including legitimate app stores that have their own robust security review processes. F-Droid, which has maintained an exemplary security record through transparent verification pipelines, reproducible builds, and community audits for over a decade, is treated identically to a malware distribution network.

### The Keep Android Open Movement

On February 24, 2026, a coalition of 37 organizations (now over 60) from over 20 countries around the world, including the Electronic Frontier Foundation, the Free Software Foundation Europe, the Software Freedom Conservancy, F-Droid, Vivaldi, Fastmail, and Article 19, published an [open letter opposing the program](https://keepandroidopen.org/open-letter/). The letter contests Google's reassurances that "sideloading is not going away", responding that "direct and unintermediated installation of software of your choosing on the device that you own, is indeed going away if they follow through."[^fdroid-open-letter]

The EFF's Corynne McSherry has warned that the program "creates a comprehensive database of developer identities worldwide," making this information vulnerable to government subpoenas and warrants, and placing at particular risk "VPN developers in jurisdictions where privacy tools invite legal scrutiny, journalists and activists building documentation software, and researchers who publish under pseudonyms."[^eff-warning]

### Moral Hazard

Apple openly defied the DMA, and has gotten away with it (so far). The Commission responded with proceedings that have dragged on for two years without a final resolution on Article 6(4). Apple was fined EUR 500 million (an amount it earns in approximately six hours[^apple-revenue]) and promptly appealed. And through it all, Apple's Notarization process has ensured that Apple remains the sole gatekeeper for every app on every iPhone.

Google watched all of this, and decided to follow suit.

This is the very definition of "moral hazard": when the consequences of defiance are negligible, defiance becomes rational. The Commission's failure to enforce Article 6(4) with sufficient speed and severity has not merely allowed Apple to maintain its monopoly: it has *created* a new one. The Android ecosystem, which was the one remaining platform where true alternative distribution was possible, where F-Droid and the App Fair Project could operate freely and developers could distribute apps without any gatekeeper's permission, is now being locked down. The consequence of the Commission's restraint is not _one_ closed ecosystem, but _two_.

### Security Theater

Both Apple and Google have invoked the same escape hatch to justify their gatekeeping: the DMA's allowance for measures that are "strictly necessary and proportionate" to protect "the integrity of the hardware or operating system."[^swd-p20] Apple claims that Notarization is essential for platform security. Google claims that Developer Verification is needed to combat malware. In both cases, these security claims are asserted but never demonstrated.

Apple has never published independent evidence that its Notarization process catches threats that would not be caught by alternative security mechanisms (such as the decentralized curation model employed by F-Droid, which relies on reproducible builds, open-source auditing, and community review). Google's claim that sideloaded apps contain "90 times more malware" than Play Store apps[^google-adv-blog] conflates the *source* of an app with the *mechanism* of installation. The relevant question is not whether unscreened APKs downloaded from random websites contain more malware than Play Store apps: it is whether apps distributed through *legitimate alternative channels* with their own review processes (F-Droid, the Samsung Galaxy Store, or direct distribution by established developers) pose a meaningfully different security risk. Neither Apple nor Google has provided evidence that they do.

The "strictly necessary and proportionate" standard is supposed to be a narrow exception, not a blanket authorization. But in practice, it has become an unfalsifiable get-out-of-jail-free card. The gatekeepers claim it is to fight "malware" while studiously avoiding defining the term, leaving it to mean whatever they want it to mean, and leaving them to change the definition and move the goalposts whenever they choose.

The gatekeepers assert that their measures are necessary for security, and because no independent body has the authority to scrutinize those claims, the assertion stands unchallenged. There is no adversarial process, no independent technical review, and no mechanism for developers or alternative distributors to contest the gatekeeper's security rationale.

This problem extends well beyond app distribution. Apple has invoked the same security justification to resist its interoperability obligations under Article 6(7),[^apple-interop] and Google could easily do the same. If "security" is an unchallengeable trump card, then every DMA obligation can be circumvented simply by asserting that compliance would create a security risk.

## III. The Path Forward: Total Disintermediation

The DMA's Article 6(4) contains the right principle. The problem is not the law. The problem is that the law has been allowed to be interpreted in a way that permits "compliance" measures that are functionally indistinguishable from the gatekeeping behavior they were supposed to eliminate.

The simple solution is to adhere to a single fundamental principle: **app distribution must be possible with no gatekeeper intermediation _whatsoever_.**

### What "No Gatekeeper Intermediation" Means

1. **No mandatory registration with the gatekeeper.** A developer should not be required to enroll in any program operated by the platform vendor, pay any fee to the platform vendor, or agree to any terms and conditions imposed by the platform vendor, as a precondition for distributing software to users of that platform. This applies equally to Apple's Developer Program and Google's Developer Verification.

2. **No mandatory review or approval by the gatekeeper.** The platform vendor should have no right to review, approve, reject, or revoke any app distributed outside its own app store. Apple's "Notarization" and Google's "Verification" are euphemisms for the same thing: a gatekeeper veto over all software distribution. This veto must end.

3. **No technical barriers to direct installation.** Users should be able to install software (what is often misleadingly termed as "sideloading"[^sideloading]) by the same mechanism they install any other file: by downloading it and opening it. On every desktop and laptop operating system, installing software from arbitrary sources is the *default*. It should be the default on mobile platforms as well. Your computer is _your_ computer, regardless of whether it is in your pocket or on your desk.

4. **Alternative app stores must be able to operate independently.** Free and open-source app stores like the App Fair Project and F-Droid, as well as commercial marketplaces like the Samsung Galaxy Store and Epic Games Store alike, must be able to distribute apps without any dependency on the platform vendor's infrastructure, approval processes, or fee structures. The App Fair Project's own experience demonstrates how far we remain from this ideal: Apple's eligibility requirements, requiring either a million-euro letter of credit or a million prior downloads within the EU, are designed to ensure that only large, well-capitalized corporations can operate alternative marketplaces.[^dma-workshop]

### What the Commission Must Do

1. The non-compliance investigation into Apple's Article 6(4) compliance has been open since June 2024, nearly two years.[^ec-6-4-investigation] It is time for a final decision, and that decision must establish the principle of _total disintermediation_: that no developer should be required to interact with, pay, or submit to the gatekeeper in order to distribute software to users of that platform.

2. The Commission must also act preemptively on Google's Android Developer Verification program. MEP Schaldemose's question[^eu-parliament-question] deserves an answer: mandatory developer registration for all apps, including those distributed outside the Play Store, is plainly incompatible with Article 6(4). The Commission should not wait until September 2026 to begin proceedings. It should act now.

3. The Commission should establish an _independent_ review mechanism for gatekeepers' security claims, with the burden of proof squarely on the gatekeeper to demonstrate that their measures are, in fact, strictly necessary and proportionate. Without such a mechanism, the security exception will continue to be used as an easy tool to avoid compliance and sabotage the principles of the DMA.

4. Finally, the Commission should consider whether its enforcement tools are adequate. A EUR 500 million fine against a company with annual revenues exceeding EUR 350 billion[^apple-revenue] is not a deterrent: it is a licensing fee. If gatekeepers can pay fines and maintain their monopolies, fines are not working. The Commission has the power under the DMA to impose structural remedies.[^dma-structural] It is time to consider using them.

## Conclusion

The DMA was enacted to ensure that digital markets are "fair and contestable."[^dma-text] Two years into enforcement, Apple has turned "Notarization" into "App Review" with a different name, and Google has decided that if Apple can be the sole gatekeeper for iOS, then Google can be the sole gatekeeper for Android too.

The Commission's first review of the DMA acknowledges that alternative app stores "have already emerged and are continuously expanding their range."[^ec-review] This is true, but it obscures the fundamental reality: every one of those alternative stores operates *at the pleasure of Apple*, subject to Apple's fees, Apple's review process, and Apple's unilateral right to shut them down. That is not an open market: it is a managed concession.

The clock is ticking: Google's Android Developer Verification enforcement begins in September. If the Commission does not act decisively, not just against Apple's two-year-old non-compliance, but against Google's impending lockdown, then the DMA will have achieved the very _opposite_ of its purpose. Instead of opening the app distribution market to fair competition, it will have presided over the closing of the last open platform.

Is it our fate that all mobile software be forever gated by the whims of two opaque and unaccountable profit-seeking corporations? If that future is to change, then change needs to start here and now, before these gatekeepers become inextricably entrenched. The European Commission and the Digital Markets Act team should consider their place in history and do the right thing for both their own businesses and consumers, as well as for the other nations throughout the world whose regulatory bodies are taking their their cues from the "Brussels Effect".


*The App Fair Project is a nonprofit organization building free and open-source app marketplace infrastructure. Learn more at [appfair.org](https://appfair.org).*

[^ec-review]: European Commission, "Report from the Commission to the European Parliament, the Council, and the European Economic and Social Committee on the first review of the Digital Markets Act," COM(2026) 178 final, published April 2026. [https://digital-markets-act.ec.europa.eu/consultation-first-review-digital-markets-act_en](https://digital-markets-act.ec.europa.eu/consultation-first-review-digital-markets-act_en)

[^swd]: European Commission, "Commission Staff Working Document accompanying the Report on the first review of the Digital Markets Act," SWD(2026) 123 final, published April 2026. [https://commission.europa.eu/publications/working-documents-2026_en](https://commission.europa.eu/publications/working-documents-2026_en)

[^dma_review_conclusion]: "Review highlights Digital Markets Act remains fit for purpose and has positive impact", press release published April 27, 2026 [https://ec.europa.eu/commission/presscorner/detail/en/ip_26_914](https://ec.europa.eu/commission/presscorner/detail/en/ip_26_914)


[^dma-text]: Regulation (EU) 2022/1925 of the European Parliament and of the Council of 14 September 2022 on contestable and fair markets in the digital sector (Digital Markets Act), Article 6(4). [https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R1925](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R1925)

[^swd-p20]: SWD(2026) 123 final, p. 20. The document specifies that gatekeepers "are free to implement measures to protect security and integrity and ensure compliance with other laws to the extent that these measures are strictly necessary and proportionate." [https://commission.europa.eu/publications/working-documents-2026_en](https://commission.europa.eu/publications/working-documents-2026_en)

[^swd-pre-dma]: SWD(2026) 123 final, p. 20. "Before the DMA, Apple's App Store was the only app store on iOS and iPadOS from which native apps could be downloaded." [https://commission.europa.eu/publications/working-documents-2026_en](https://commission.europa.eu/publications/working-documents-2026_en)

[^apple-jan-2024]: Apple Inc., "Apple announces changes to iOS, Safari, and the App Store in the European Union," Apple Newsroom, January 25, 2024. [https://www.apple.com/newsroom/2024/01/apple-announces-changes-to-ios-safari-and-the-app-store-in-the-european-union/](https://www.apple.com/newsroom/2024/01/apple-announces-changes-to-ios-safari-and-the-app-store-in-the-european-union/)

[^apple-eligibility]: Apple requires alternative marketplace operators to either provide a EUR 1,000,000 standby letter of credit from an A-rated financial institution, or have been an Apple Developer Program member for two continuous years with an app exceeding one million first annual installs in the EU. See Apple Developer, "Getting started as an alternative app marketplace in the European Union." [https://developer.apple.com/support/alternative-app-marketplace-in-the-eu/](https://developer.apple.com/support/alternative-app-marketplace-in-the-eu/)

[^fsfe-notarization]: Free Software Foundation Europe, "Legal Corner: Apple's 'notarisation' — blocking software freedom of developers and users," November 5, 2025. The FSFE details how Apple's notarisation process requires all apps to be "submitted to Apple's servers for scanning, approval, and cryptographic re-signing before installation," regardless of distribution channel. [https://fsfe.org/news/2025/news-20251105-01.en.html](https://fsfe.org/news/2025/news-20251105-01.en.html)

[^dma-workshop]: App Fair Project, "Apple DMA Compliance Workshop," March 18, 2024. First-hand account of the Commission-hosted workshop on Apple's DMA compliance. [https://appfair.org/blog/digital-markets-act-workshop/](https://appfair.org/blog/digital-markets-act-workshop/)

[^caf-disclaimer]: Note: The "Coalition for App Fairness" (appfairness.org) and the "App Fair Project" (appfair.org) are distinct and completely unrelated entities.

[^caf-slam]: Coalition for App Fairness (unrelated to the App Fair Project[^caf-disclaimer]), "CAF Slams Apple's Continued Refusal to Comply with the Digital Markets Act," March 19, 2024. [https://appfairness.org/caf-slams-apples-continued-refusal-to-comply-with-the-digital-markets-act/](https://appfairness.org/caf-slams-apples-continued-refusal-to-comply-with-the-digital-markets-act/)

[^ec-6-4-investigation]: European Commission, "Commission sends preliminary findings to Apple and opens additional non-compliance investigation against Apple under the Digital Markets Act," Press Release, June 24, 2024. The investigation examines Apple's business terms, fees, the multi-step user journey, and developer eligibility requirements. [https://ec.europa.eu/commission/presscorner/detail/en/ip_24_3433](https://ec.europa.eu/commission/presscorner/detail/en/ip_24_3433)

[^ec-apple-fine]: European Commission, "Commission finds Apple and Meta in breach of the Digital Markets Act," Press Release, April 23, 2025. Apple was fined EUR 500 million for violating Article 5(4) anti-steering provisions. [https://digital-markets-act.ec.europa.eu/commission-finds-apple-and-meta-breach-digital-markets-act-2025-04-23_en](https://digital-markets-act.ec.europa.eu/commission-finds-apple-and-meta-breach-digital-markets-act-2025-04-23_en)

[^ec-6-4-preliminary]: European Commission, "Commission closes investigation into Apple's user choice obligations and issues preliminary findings on rules for alternative apps under the Digital Markets Act," Press Release, April 23, 2025. [https://digital-markets-act.ec.europa.eu/commission-closes-investigation-apples-user-choice-obligations-and-issues-preliminary-findings-rules-2025-04-23_en](https://digital-markets-act.ec.europa.eu/commission-closes-investigation-apples-user-choice-obligations-and-issues-preliminary-findings-rules-2025-04-23_en)

[^apple-appeal]: Apple filed an appeal against the EUR 500 million fine (Case T-438/25) on July 7, 2025. See CNBC, "Apple appeals 500 million euro EU fine over App Store policies," July 7, 2025. [https://www.cnbc.com/2025/07/07/apple-appeal-eu-fine-app-store.html](https://www.cnbc.com/2025/07/07/apple-appeal-eu-fine-app-store.html)

[^apple-ctc]: Apple announced the Core Technology Commission (CTC) as successor to the Core Technology Fee, a 5% levy on digital goods and services sold through apps distributed from any channel. See RevenueCat, "Apple's June 2025 EU update: one entitlement, three fees, and CTF's 2026 sunset," June 2025. [https://www.revenuecat.com/blog/growth/apple-eu-dma-update-june-2025/](https://www.revenuecat.com/blog/growth/apple-eu-dma-update-june-2025/)

[^cnbc-fees]: CNBC, "Apple reveals complex system of App Store fees to avoid EU fine of 500 million euro," June 26, 2025. Reports that some developers now face three separate fees for a single download. [https://www.cnbc.com/2025/06/26/apple-eu-500-million-euro-app-store.html](https://www.cnbc.com/2025/06/26/apple-eu-500-million-euro-app-store.html)

[^apple-unified]: Apple Developer, "Update on apps distributed in the European Union." Details the unified CTC-based business model effective January 1, 2026. [https://developer.apple.com/support/dma-and-apps-in-the-eu/](https://developer.apple.com/support/dma-and-apps-in-the-eu/)

[^caf-january-2026]: Coalition for App Fairness (unrelated to the App Fair Project[^caf-disclaimer]) statement following Apple's January 2026 DMA Compliance Workshop, in which Apple's representatives reportedly "dodged questions" and demonstrated "no intent to comply with the law." See The Register, "Devs say Apple still flouting EU's DMA six months on," December 16, 2025. [https://www.theregister.com/2025/12/16/apple_dma_complaint/](https://www.theregister.com/2025/12/16/apple_dma_complaint/)

[^swd-stores]: SWD(2026) 123 final, pp. 20–21. Lists Epic Games Store, Aptoide, AltStore PAL, mobivention, and Skich as third-party app stores that have begun distributing apps on iOS/iPadOS. [https://commission.europa.eu/publications/working-documents-2026_en](https://commission.europa.eu/publications/working-documents-2026_en)

[^ec-review-friction]: COM(2026) 178 final, p. 8. "Friction can also be the result of design choices by gatekeepers and result in unnecessarily cumbersome compliance measures that discourage users from discovering and using alternatives." [https://digital-markets-act.ec.europa.eu/consultation-first-review-digital-markets-act_en](https://digital-markets-act.ec.europa.eu/consultation-first-review-digital-markets-act_en)

[^swd-epic]: SWD(2026) 123 final, p. 21, footnote 42. One developer (identified as Epic Games) reported a reduction in the drop-off rate from 65% to 25% following Apple's iOS 18.6 update in July 2025. [https://commission.europa.eu/publications/working-documents-2026_en](https://commission.europa.eu/publications/working-documents-2026_en)

[^fdroid-sept-2025]: F-Droid, "Google Developer Verification Policy and the DMA," September 22, 2025. Initial analysis of Google's developer verification policy and its implications for the DMA. [https://f-droid.org/2025/09/22/google-developer-verification-policy-and-the-dma.html](https://f-droid.org/2025/09/22/google-developer-verification-policy-and-the-dma.html)

[^google-adv-blog]: Google, "Android developer verification: Rolling out to all developers on Play Console and Android Developer Console," Android Developers Blog, March 2026. [https://android-developers.googleblog.com/2026/03/android-developer-verification-rolling-out-to-all-developers.html](https://android-developers.googleblog.com/2026/03/android-developer-verification-rolling-out-to-all-developers.html)

[^fdroid-open-letter]: F-Droid, "An Open Letter Opposing Android Developer Verification," February 24, 2026. Signed by 37 organizations including the EFF, FSFE, Software Freedom Conservancy, Vivaldi, Fastmail, and Article 19. [https://f-droid.org/2026/02/24/open-letter-opposing-developer-verification.html](https://f-droid.org/2026/02/24/open-letter-opposing-developer-verification.html)

[^google-advanced-flow]: Google's "advanced flow" for installing unregistered apps requires a multi-step process including a 24-hour waiting period and a device reboot. See The Hacker News, "Google Adds 24-Hour Wait for Unverified App Sideloading to Reduce Malware and Scams," March 2026. [https://thehackernews.com/2026/03/google-adds-24-hour-wait-for-unverified.html](https://thehackernews.com/2026/03/google-adds-24-hour-wait-for-unverified.html)

[^eff-warning]: Electronic Frontier Foundation, as quoted in WinBuzzer, "EFF, F-Droid open letter: Google mandatory Android developer registration," February 25, 2026. [https://winbuzzer.com/2026/02/25/eff-f-droid-open-letter-google-mandatory-android-developer-registration-xcxwbn/](https://winbuzzer.com/2026/02/25/eff-f-droid-open-letter-google-mandatory-android-developer-registration-xcxwbn/)

[^pirate-party]: European Pirate Party, "European Pirate Party's Stance on Google's Android Developer Verification Requirement," 2026. Formal submission to the European Commission's DMA review consultation. [https://europeanpirates.eu/european-pirate-partys-stance-on-googles-android-developer-verification-requirement/](https://europeanpirates.eu/european-pirate-partys-stance-on-googles-android-developer-verification-requirement/)

[^eu-parliament-question]: Christel Schaldemose (S&D), Written Question E-001419/2026 to the European Commission, submitted April 8, 2026. Asks whether mandatory developer registration is compatible with the DMA and how the Commission will prevent security requirements from circumventing DMA obligations. [https://www.europarl.europa.eu/doceo/document/E-10-2026-001419_EN.html](https://www.europarl.europa.eu/doceo/document/E-10-2026-001419_EN.html)

[^apple-revenue]: Apple reported annual revenue of approximately USD 391 billion (approximately EUR 360 billion) in fiscal year 2025. A EUR 500 million fine represents roughly 0.14% of annual revenue, or approximately six hours of revenue. See Apple Inc., "Apple Reports Fourth Quarter Results," October 2025. [https://investor.apple.com/sec-filings/default.aspx](https://investor.apple.com/sec-filings/default.aspx)

[^sideloading]: The term "sideloading" is itself a rhetorical device designed to make direct software installation sound illegitimate. On desktop platforms (Windows, macOS, Linux), installing software from any source is simply called "installing software." No one speaks of "sideloading" a program onto their laptop. The term exists solely to normalize the idea that mobile devices should be closed platforms where the manufacturer controls all software distribution.

[^dma-structural]: Under Article 18 of the DMA, the Commission may impose behavioral or structural remedies in cases of systematic non-compliance, including requiring the divestiture of a business or parts of it. [https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R1925](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R1925)

[^apple-interop]: Apple has appealed both of the Commission's March 2025 specification decisions on interoperability under Article 6(7) (Cases T-354/25 and T-359/25). See also FSFE, "Apple keeps challenging its interoperability obligations under the DMA," April 20, 2026. [https://fsfe.org/news/2026/news-20260420-01.html](https://fsfe.org/news/2026/news-20260420-01.html)

[^fosdem-talk]: App Fair Project, "Fear and Loathing in the App Stores," FOSDEM 2026 main track talk, Brussels, February 1, 2026. Examines how Apple and Google maintain their app distribution monopolies despite regulatory intervention. [https://appfair.org/blog/fear-and-loathing-in-the-app-stores/](https://appfair.org/blog/fear-and-loathing-in-the-app-stores/)
