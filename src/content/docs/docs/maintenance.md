---
title: Maintaining Your App
description: Updates, translations, and project handoff.
---

The first release is the start of the project, not the end of it. App Fair apps remain in the catalog for years, and require an active maintainer to keep current with platform changes, address user-reported issues, and incorporate community contributions. This section describes the ongoing maintenance workflow.

## Releasing updates {#updates}

Updates follow the same workflow as the initial release. Once the `appfair/` fork exists, each new version is another tag:

1. Develop and test on `main`, following the workflow described in [Building Your App](/docs/building/#dev-loop).
2. Update the version in `Skip.env`: increment `MARKETING_VERSION` semantically, and increment `CURRENT_PROJECT_VERSION` by one.
3. Update release notes for each locale in `Darwin/fastlane/metadata/<locale>/release_notes.txt` and `Android/fastlane/metadata/android/<locale>/changelogs/` (or `version_whats_new.txt`, depending on the project configuration).
4. Tag and push: `git tag 1.0.1 && git push origin 1.0.1`.
5. Wait for the App Fair to sync the tag to the fork, which triggers the signed build and store submission.

Apple and Google review times vary, but most updates appear within a few days. The [appfair.net](https://appfair.net) catalog picks up the new version automatically on its next hourly run.

### Semantic versioning {#semver}

Use [semantic versioning](https://semver.org/):

- **Patch** (`1.0.0` to `1.0.1`): bug fixes that do not introduce user-visible behaviour changes.
- **Minor** (`1.0.1` to `1.1.0`): new features that do not break existing workflows.
- **Major** (`1.1.0` to `2.0.0`): significant rework, redesign, or removal of features.

Major version bumps are an appropriate time to refresh screenshots, review marketing copy, and verify that locale strings are still accurate.

## Localization and translations {#localization}

Because **Global** is one of the [four cornerstones](/docs/philosophy/#cornerstone-global), keeping translations current is part of ongoing maintenance. If the app was set up with a [`Localizable.xcstrings` String Catalog](https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog) as recommended in [Building Your App](/docs/building/#l10n), community translators can contribute new locales by opening pull requests against the source repository. A translation consists of two parts:

- **In-app strings** in `Localizable.xcstrings` (or, in older projects, `<locale>.lproj/Localizable.strings`). These are bridged to Android's `strings.xml` automatically.
- **Store metadata** in `Darwin/fastlane/metadata/<locale>/` and `Android/fastlane/metadata/android/<locale>/`.

Both parts are equally important. An app translated into Spanish whose Play Store listing remains English-only is effectively invisible to most Spanish-speaking users.

After feature additions, `Localizable.xcstrings` should be opened in Xcode to identify strings marked **stale** or **needs review**. These are the strings that require new translation work. Flagging them in a release note or discussion thread allows the translation community to address them.

If you are not a developer but would like to contribute translations, see the [FAQ entry on translating](/docs/faq/#translators).

## Accessibility regressions {#a11y-regressions}

Accessibility is the easiest cornerstone to regress on without detection, because the changes that break it tend to be visual ones that pass a sighted-user review. When a screen is redesigned, a new control is added, or a view hierarchy is refactored, the following checks should be performed:

- Audit the new SwiftUI [accessibility modifiers](https://developer.apple.com/documentation/swiftui/view-accessibility). Every icon-only button, every custom drawing, and every gesture requires an `.accessibilityLabel`.
- Walk through the change with VoiceOver enabled. Five minutes of muscle memory here prevents hours of frustration for blind users.
- Test Dynamic Type at the largest accessibility sizes. New layouts typically break first at these sizes.
- Verify on Android with TalkBack. SwiftUI's accessibility modifiers are translated to [Jetpack Compose accessibility semantics](https://developer.android.com/develop/ui/compose/accessibility), but the result should still be confirmed.

A patch release that addresses an accessibility regression is at least as valuable as one that addresses a functional bug.

## User feedback {#feedback}

Users will report bugs and request features. There are a few channels through which this feedback may arrive:

- **GitHub Issues** on the source repository is the canonical channel. The README, the app's About screen, and the store description should all encourage users to file issues here.
- **App Store reviews and Play Store reviews** are visible to all users and are worth responding to. The App Fair maintains the store accounts and surfaces review notifications, but the maintainer typically has the context required to respond substantively.
- **The [App Fair discussion forums](https://github.com/orgs/appfair/discussions)** are appropriate for project-wide questions or anything related to the App Fair process rather than a specific app.

A reasonable response time on issues materially affects the long-term health of an app. Not every report requires action, but acknowledgement (e.g. "thanks, we will look at this") is appropriate.

## Project handoff {#handoff}

Maintainers may need to step away. The App Fair is designed so that an app outliving its original maintainer is not a problem.

Because each app lives in its own GitHub organization, ownership of an app can be transferred cleanly to a new individual or group without entangling personal accounts. The available options:

1. **Post a Call for Maintenance (CFM)** on the [App Fair discussion forums](https://github.com/orgs/appfair/discussions). The CFM should describe the project, the current state, and the expectations on a successor. If a successor steps forward, they can be added to the GitHub organization and ownership transferred incrementally.
2. **Add a co-maintainer early.** Inviting collaborators into the organization while still active is the smoothest path. Waiting until burnout is not required.
3. **Pause the project.** If no successor is available and the application still functions, it can remain in the catalog without active development for some time. As long as the app still works for users, this is acceptable. If platform changes begin to break the app, the App Fair may archive it from the catalog, but a temporary lull is not in itself a problem.
4. **Withdraw entirely.** A request can be filed with the App Fair to archive or remove the fork, after which the app will eventually drop out of the catalog. The source remains under GPL-2.0-or-later, so the community is free to fork and continue the project independently.

The organization-per-app convention exists precisely to make these transitions possible.

## Maintainer commitment {#commitment}

Distributing through the App Fair is free for the developer, but it is not free for the project: every signed release consumes build time, store fees, and reviewer attention. In exchange, the App Fair expects a good-faith commitment from each maintainer to:

- Respond to bug reports within a reasonable window.
- Keep the app building on current Xcode and Skip versions.
- Ship occasional patch releases, including releases whose purpose is simply to keep the app current.
- Treat users and contributors respectfully.

If circumstances change and the commitment can no longer be honoured, the appropriate response is to say so rather than allow the app to deteriorate. There is no penalty for handing off a project. Leaving users with a broken app and no path forward is the failure mode the project is designed to prevent.

For further questions, see the [FAQ](/docs/faq/) or the [discussion forums](https://github.com/orgs/appfair/discussions).
