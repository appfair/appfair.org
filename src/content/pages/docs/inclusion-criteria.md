---
title: App inclusion criteria
description: Licensing, privacy, source, testing and publication requirements for apps submitted through the App Fair.
---

Apps distributed through the App Fair must meet a high standard of quality and trustworthiness. Each release is reviewed to verify that it is free, open source, and designed to serve the end user’s interests rather than advance the developer’s interests at the user’s expense.

> [!WARNING] These policies are evolving
> The App Fair’s submission rules are still being developed. Expect requirements to change over time. Check this page before each submission, including updates to an accepted app.

These requirements apply to every app and update submitted through the App Fair. The [app rules](/app-rules/) summarize the same expectations for users. Passing automated checks does not establish eligibility or replace review.

## Price and monetization

- Apps must be free to download and use, without paid feature unlocks, subscriptions to unlock app features, or in-app purchases.
- Advertising is prohibited. Do not include advertising SDKs, ad placements or ad-supported modes.

## Privacy and behavior

- Do not include analytics, tracking or telemetry SDKs, including disabled SDKs or dependencies that bring them in transitively.
- Do not collect or transmit usage data for analytics, tracking or telemetry through custom code either.
- Request only permissions needed for documented app features. Describe network services, data use and retention in the privacy information.
- Provide accurate store descriptions and working privacy and support links. The app’s behavior must match them.

## License and dependencies

The app’s primary license must be **AGPL-3.0-only with the App Fair Distribution Exception**, as supplied by the [day-appfair template](https://github.com/appfair/day-appfair). Preserve `LICENSE.txt`, `LICENSE-EXCEPTIONS.txt` and the required source notices. Do not replace the primary license with another license.

Every included library, including all transitive dependencies, must use a license that meets the [Debian Free Software Guidelines (DFSG)](https://www.debian.org/doc/debian-policy/ch-archive.html#the-debian-free-software-guidelines). Its terms must also permit inclusion and distribution with the app under the required app license. Meeting the DFSG alone does not establish compatibility between licenses.

- Do not bundle closed-source libraries, SDKs, plugins or other components. Publicly visible code without an appropriate free-software license is insufficient.
- Review the full dependency tree, including native libraries and code copied into the project. Retain dependency license texts and notices as required.
- Have the necessary rights to distribute included images, fonts, sounds and other assets; retain their licenses and attribution.

The component restriction concerns code included in the app. It does not require the host operating system or its native system frameworks to be open source.

## Project and publication setup

- Use a conventional Day project created from the day-appfair template, in a public GitHub organization and repository named for the app token.
- Keep the source, dependency lockfile, license notices and release history available for inspection and review.
- **Install the [App Fair Publisher](https://github.com/apps/app-fair-publisher/installations/select_target) in the organization and grant it access to the app repository. Keep that access enabled for distribution through the App Fair.** Installation is required for first submissions and updates; it lets the Publisher attach signed packages and promote approved pre-releases.
- Keep the template-generated GitHub Pages site published at its expected address. A custom domain is permitted; a separate landing page does not replace the required generated site.
- Keep the submitted mobile targets and `web-dom` in both `Day.toml` and `.github/workflows/ci.yml`. The template uses the web target to publish the required site. Preserve store IDs across updates.

## Before submitting

1. For a new app, [open a discussion](https://github.com/orgs/appfair/discussions) describing its purpose, users, maintainer and source repository. Link it from the first catalog pull request. Updates do not need a new introductory discussion.
2. Replace the template’s screens, icon and listing. Maintain a dayscript walkthrough that tests behavior and captures the screenshots used by the stores.
3. Run lint and tests, review CI screenshots, and commit the app changes. Use `day metadata --version-bump patch --git-push` to create the next version and tag.
4. Wait for CI to create the public pre-release and attach the required packages and screenshots. Leave it marked pre-release until publication through the App Fair succeeds.
5. Open a catalog pull request identifying the release tag, full source commit and requested stores. Respond to review comments and report publication failures in the existing submission.

Follow [Getting started](/docs/getting-started/) for the first submission and [Releases & updates](/docs/releases/) for subsequent versions. The [catalog reference](https://github.com/appfair/appfair-apps/blob/main/CONTRIBUTING.md) documents submission fields and checks. Approval by the App Fair and subsequent store review are required for new apps and updates.
