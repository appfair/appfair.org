---
title:  "Total Disintermediation is the Only Solution for DMA Regulation of the App Store"
date:   2025-03-24
tags: [news, blog, update, dma, app, store]
layout: post
author: "Marc Prud'hommeaux"
draft: true
---

The only path to digital sovereignty is through total disintermediation.

As the digital gatekeepers have faced increasing scrutiny over their anti-competitive practices, the hope had been that the attention and potential for regulatory enforcement would help open up these ecosystems to interoperability, competition, and unfettered technological innovation. But in the realm of the mobile app store duopoly, the exact opposite has happened: rather than Apple becoming more open with iOS, Google is increasingly locking down Android by closing off the development of the Android Open Source Project and instituting a plan to force all developers worldwide to register with Google in order to be able to distribute their Android applications, regardless of their storefront or distribution channel of choice. The fact that Apple has gotten away with their flagrant violations of the EU's Digital Markets Act has clearly emboldened Google to take advantage of the timid and limp enforcement regime and rush to lock down the Android ecosystem. The impending requirement that all mobile apps will soon need to funnel through the approval of two for-profit US companies should be a cause for alarm, not just for competition concerns but also for digital sovereignty.






OLD DRAFT:


The European Union's Digital Markets Act (DMA) aims to curb the power of digital gatekeepers and foster a more competitive digital marketplace. However, when it comes to Apple's App Store, the current implementation falls significantly short of the DMA's ambitions. The App Fair Project has concluded that nothing less than total disintermediation—removing Apple entirely from the app distribution process—will effectively enforce the DMA's goals.

## The Digital Markets Act: A Brief History

The DMA represents the culmination of years of European regulatory concern about the growing power of digital platforms. Proposed by the European Commission in December 2020 and officially enacted in November 2022, the DMA specifically targets "gatekeepers"—large digital platforms that serve as unavoidable intermediaries between businesses and consumers.

The legislation was born from the recognition that traditional competition law was insufficient to address the unique challenges posed by digital markets, where network effects and data advantages create winner-takes-all dynamics. By the time a traditional antitrust investigation concludes, the market may have already tipped irreversibly in favor of the dominant player.

The DMA's core philosophy is _ex-ante_ regulation — establishing rules beforehand rather than punishing violations after the fact. It requires designated gatekeepers to:

- Allow third-party interoperability with their services
- Enable business users to access data they generate on the platform
- Provide businesses with tools to promote offers and conclude contracts outside the platform
- Allow users to install and use third-party apps or app stores

For mobile ecosystems specifically, the DMA mandates that gatekeepers allow alternative methods of app installation and distribution beyond their own app stores—directly challenging Apple's closed ecosystem.

## Understanding App Review and Technical Control Mechanisms

To appreciate why disintermediation matters, it's important to understand the technical mechanisms Apple uses to maintain control over iOS software distribution:

### App Review Explained

"App Review" is Apple's human-conducted evaluation process for all software submitted to the App Store. Before any app reaches users, Apple employees examine it for compliance with the company's guidelines, which cover everything from functionality and design to business models and content.

While portrayed as primarily a security and quality assurance measure, App Review serves as a powerful control point that allows Apple to:

- Reject apps that compete with Apple's own services
- Force developers to use Apple's payment systems (and pay commissions)
- Control what types of applications and content are available on iOS
- Influence app business models and pricing

The review process is notoriously subjective and opaque. Developers frequently report inconsistent enforcement, unexplained rejections, and different standards for different companies. Small developers lack the resources to challenge Apple's decisions, creating a chilling effect on innovation.

### Entitlements: The Keys to iOS Functionality

In the iOS security model, "entitlements" are special permissions that allow apps to access protected features of the operating system. Think of them as digital keys that unlock specific capabilities:

- Access to the camera or microphone
- Ability to use location services
- Permission to run in the background
- Access to home automation controls
- Utilize near-field communication (NFC) connectivity hardware

What makes entitlements particularly powerful as a control mechanism is that many require Apple's explicit approval. Developers can't simply declare they need an entitlement; Apple must grant it during the review process.

Under Apple's DMA implementation, alternative app marketplaces require special "marketplace entitlements" that only Apple can issue. This gives Apple discretionary power over which companies can operate competing app stores and under what conditions—maintaining their gatekeeper position despite the DMA's intent.

### Notarization: Review by Another Name

"Notarization" is Apple's process for verifying apps distributed outside the App Store. Developers must submit their apps to App Store Connect in the exact same way as if they were distributing through the App Store, where a combination of automated and human checks will examine the app for compliance with a large subset for the App Store rules. Upon approval, Apple cryptographically signs the app, allowing it to run on iOS devices.

While less intrusive than full App Review, notarization still positions Apple as a mandatory intermediary. The company retains the ability to deny notarization or revoke certificates after the fact, effectively removing apps from users' devices remotely—even those not distributed through the App Store.

## The Current State of "Compliance"

Apple's response to the DMA has been tepid at best and obstructionist at worst. While technically allowing alternative app stores and sideloading in the EU, Apple has wrapped these options in layers of friction:

- Developers must still maintain an Apple Developer Program account, requiring annual fees and acceptance of Apple's terms
- Apps still require Apple's notarization process, giving Apple visibility into and control over all software
- Alternative marketplace vendors need Apple's approval for special entitlements to operate their stores
- Apple retains the power to revoke certificates or block software remotely
- Developers using alternative distribution must pay "Core Technology Fees" for each first annual install over a certain threshold

This approach preserves Apple's gatekeeper role while creating an illusion of compliance. It's akin to a monopolistic bridge operator being told to allow competition, only to demand that all alternative bridge builders obtain expensive permits, submit to invasive inspections, and grant the original operator veto power over who crosses.

## Why Half-Measures Fail

The fundamental problem is that any system where Apple retains oversight creates inherent conflicts of interest. Apple has every economic incentive to make alternative distribution channels less appealing, less functional, and more burdensome than its own App Store. For example, Apple arbitrarily requires that an aspiring app marketplace – including a non-profit open-source app store like the App Fair Project – present a one million euro business letter of credit as a prerequisite to be considered for the marketplace entitlement.

Additionally, the company's current strategy of charging "Core Technology Fees" for commercial apps distributed outside its store reveals its true intentions: to extract revenue regardless of how apps reach users. This undermines the very competition the DMA seeks to enable.

Apple's implementation preserves its ability to:

- Control which competing marketplaces can exist
- Monitor all software being distributed to iOS devices
- Apply inconsistent standards to different market participants
- Impose financial burdens on alternative distribution channels
- Remove software from devices remotely and non-consensually, even when not distributed through their store

## The Dangers of Centralized Control by a Single U.S. Corporation

A critical yet often overlooked hazard of the current system is the concentration of global software distribution power in the hands of a single U.S.-based corporate entity. This arrangement creates significant geopolitical and governance risks:

### Political Vulnerability and Regulatory Capture

Apple, like any corporation, is subject to the political pressures and regulatory environment of its home country. This creates multiple layers of risk:

- **Government Pressure**: The U.S. government can and has pressured technology companies to remove certain apps from global distribution, sometimes for legitimate security concerns but other times for political or economic advantage.

- **Legislative Volatility**: U.S. political priorities can shift dramatically between administrations or congressional majorities, creating an unpredictable environment for global software distribution. Laws passed with political motivations could force Apple to block legitimate apps worldwide.

- **Extraterritorial Application of U.S. Law**: When a single U.S. company controls global app distribution, U.S. regulations effectively become global regulations—creating a form of digital imperialism where U.S. priorities override local values and needs.

### Digital Sovereignty Concerns

For the EU and other regions, having critical digital infrastructure controlled by a foreign corporation raises legitimate sovereignty concerns:

- The ability of citizens to access information, communicate, and conduct business should not be contingent on decisions made in corporate boardrooms thousands of miles away.

- Economic security is compromised when a foreign entity can unilaterally determine which businesses succeed in the digital economy.

- National security may be undermined when a foreign company controls which security and communication tools are available to citizens and government officials.

## The Only Viable Solution: Total Disintermediation

For the DMA to achieve its intended effect, Apple must be completely removed from the app distribution equation. This means:

1. **No App Review or Notarization**: Developers should be able to distribute software without Apple's approval, just as they can on other computing platforms. Security should be enforced through technical means like sandboxing, not human gatekeeping.

2. **No Required Developer Accounts**: Building and distributing iOS apps should not require an Apple-sanctioned relationship or ongoing fees. The tools necessary to build iOS software should be freely available without restrictive terms.

3. **No Marketplace Approval Process**: Third-party app stores should operate independently without needing Apple's blessing through special entitlements or other approval mechanisms.

4. **No Blocking Authority**: Apple should not have the power to remotely disable sideloaded apps or those obtained from third-party stores. Users, not Apple, should decide what software runs on their devices.

## Benefits of True Disintermediation

Complete disintermediation would create genuine competition in app distribution, resulting in:

- **Innovation in Distribution Models**: New marketplaces could emerge with different curation philosophies, payment systems, and developer terms. Specialty stores focusing on games, creative tools, or professional applications could provide better discovery than Apple's one-size-fits-all approach. And stores like the App Fair Project can realize the security benefits of reproducible builds of the free and open-source software that makes up its catalog.

- **Reduced Costs for Developers**: Competition would drive down the exorbitant 15-30% commission rates currently imposed by Apple. Lower distribution costs mean more sustainable businesses and potentially lower prices for consumers.

- **Consumer Choice**: Users could select distribution channels that align with their priorities, whether security, pricing, or content variety. Those who value Apple's curation could continue using the App Store exclusively.

- **True Platform Openness**: iOS would join other computing platforms where software distribution isn't controlled by the hardware manufacturer. Developers could reach users directly, just as they can on the web, Windows, and traditional macOS.

- **New Business Models**: Distribution channels currently forbidden by Apple—such as game streaming services, mini-app platforms, and alternative payment processors—could flourish, expanding the iOS ecosystem.

- **Digital Sovereignty**: Regions and countries could develop their own app distribution ecosystems aligned with local values and regulations without requiring Apple's permission or compliance.

## Addressing Security Concerns

Apple frequently cites security as justification for its control. However, modern operating systems have multiple security layers that don't depend on centralized app review:

- **Sandboxing**: iOS already isolates apps from one another and from system resources. This architectural protection remains effective regardless of how an app is distributed.

- **Runtime Permissions**: Users explicitly grant permissions for sensitive features like location or camera access. These permission dialogs function independently of app distribution channels.

- **Security Updates**: OS-level vulnerabilities can be patched independently of app distribution channels. Apple would retain control over iOS itself, just not over which apps users can install.

- **User Choice**: Consumers who prioritize Apple's curation can still exclusively use the App Store. Nothing about disintermediation forces users to obtain software from alternative sources. ~~Prisoners~~ Users who are happy with the locked "walled garden" approach are free to remain inside.

- **Reputation Systems**: Alternative marketplaces would develop their own quality and security standards, competing on safety just as they would on other features.

Many of these protections already exist on macOS, where users can install software from anywhere while maintaining a strong security record. The notion that centralized review is the only path to security is contradicted by Apple's own practices on its own desktop platform.

## Lessons from Other Platforms

The personal computer ecosystem has thrived for decades without a central gatekeeper. Microsoft Windows, Apple's macOS, and Google's Android all allow software installation from multiple sources. The web itself—the most successful software platform in history—has no central authority approving websites before they can be accessed.

These examples demonstrate that vibrant, secure computing ecosystems can exist without monopolistic control over software distribution. The same principles can and should apply to iOS.

## Conclusion

The DMA represents an important step toward limiting the power of digital gatekeepers. However, its effectiveness depends entirely on implementation. As long as Apple maintains control over app distribution—directly or indirectly—the DMA's goals of open markets and fair competition cannot be realized.

European regulators must recognize that half-measures won't suffice. Total disintermediation of app distribution is the only path to meaningful reform of the iOS ecosystem. True competition doesn't exist when the dominant player makes and enforces the rules.

It's time for the DMA to fulfill its promise of a more open digital economy. Beyond competition, disintermediation is essential for digital sovereignty and resilience against the unpredictable political and corporate influences that emanate from any single nation or company.

