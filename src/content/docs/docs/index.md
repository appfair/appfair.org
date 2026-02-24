---
# name: AppFair
title: Creator Guide
#layout: default
---

# App Fair Creator Guide

<div class="diagram-vector">
<img style="width: 100%;" alt="App Fair Project Diagram" src="/assets/images/appfair-project.svg" />
</div>

## Introduction {#introduction}

Welcome, Developer! This guide will provide an overview of the App Fair development, release, and maintenance process. If you are already a mobile app developer, some of these sections will be review – but we encourage to read thoroughly regardless. The App Fair is a unique method of app development, and even if you have already shipped apps for the iPhone or Android (or both), many of the concepts presented here will be novel.

The document is currently a **draft** of the creator guide. Many sections are still works in progress. Please post questions and feedback on the [App Fair discussion forums](https://github.com/orgs/appfair/discussions).
{: class="callout error"}

### About the App Fair Project {#about-app-fair}

The App Fair is a nexus for mobile app developers to bring their creations into the hands billions of mobile device users around the world: all devices, all languages, all abilities. Apps developed for the App Fair are trustworthy because they are 100% free and open-source. This guarantees that there is no native advertising, hidden surveillance, surreptitious tracking, or privacy-violating analytics technologies embedded within the applications. The App Fair build and release process acts as a "seal of approval" for apps to indicate that they are honest and trustworthy.

#### Why develop an app for the App Fair? {#why-app-fair}

Creating an app for the App Fair is an opportunity to get your creation in the hands of billions of people around the world, regardless of their device, language, or ability level.

#### Who can create an app for the App Fair? {#who-app-fair}

Anyone with the ability and desire to build an app can be an App Fair Creator. You do not need any paid developer account with Apple or Google, only a free GitHub account. If you have a macOS development machine and the ability (or desire) to build an app in SwiftUI, you can create an app and – through the App Fair process – distribute your creation to the world.

#### What sorts of apps can I build for the App Fair? {#what-app-fair}

The App Fair is looking for _generally useful_ applications. This means that your app should be interesting and useful to a wide swath of humanity, irrespective of language or location. They should also be timeless: apps should not have any specific cutoff for their utility.

A central tenant of the App Fair catalog is that apps do not seek to monetize the attention of the user. This means that they can contains no native advertising or tracking SDKs. They must also be _transparent_, and so they must be built from 100% free and open source software. This is the guarantee that users (and external auditors) will have that they know exactly what went into the creation of the app.

### About distribution channels {#app-fair-channels}

The App Fair aims to distribute apps *worldwide*, so all of the mobile-device-using population (90% of the adult population, by most estimates) can benefit from your creation.

#### The App Fair {#app-fair-channel-app-fair}

The App Fair app is a dual-platform iOS/Android app that can browse, download, install, and update apps from the App Fair catalog. It is available worldwide for Android, and (soon) will be available in the European Union for iOS. The App Fair app is the primary channel for distributing app fair apps.

#### The Apple App Store {#app-fair-channel-app-store}

The Apple App Store (AAS) is the primary 1st-party app store for Apple devices such as the iPhone and iPad. The AAS is pre-installed on all Apple devices sort worldwide, and is generally the first place that most users will go to discover and download applications for their phone or table.

#### The Google Play Store {#app-fair-channel-play-store}

The Google Play Store (GPS) is the primary 1st-party app store for most Android devices, such as the Google Pixel and Samsung Galaxy phones. The GPS is available and pre-installed in most devices worldwide (barring China), and is typically one of the first places that Android users will go to install apps on their Android devices.

<!-- 
    
#### AltStore {#app-fair-channel-altstore}

#### F-Droid {#app-fair-channel-fdroid}

 -->
 
## Getting Started {#getting-started}

### Before you start {#before-starting}

Before you dive into developing your app, you should first check whether the app idea already exists as an App Fair project. The App Fair generally discourages apps with identical intent. Unlike commercial app catalogs that aim to build quantity, the App Fair aims to feature a few best-in-class applications in their categories. You can browse the list of app projects at [appfair/repositories](https://github.com/orgs/appfair/repositories) to see if an app already exists that closely resembles your idea for a contribution. If so, you may with to instead contribute toward the improvement of that app project rather than duplicating effort.

### System Requirements {#sysreq}

In order to develop an app for the App Fair, you need to have a macOS development machine capable of running the latest Xcode IDE. App Fair apps are developed with [Skip](https://skip.dev), which enables the development of iOS and Android apps from a single SwiftUI codebase, and Skip requires Xcode.

#### Choose a unique name {#naming}

Your app needs to have a distinctive and unique name that is not the name of any other app in the App Fair, Apple App Store, or Google Play Store.

It can be difficult to conclusively verify ahead of time that a name is available because there are many "name-squatters" on the commercial app stores. Don't get too attached to your original idea, unless you are somehow quite certain that it is totally unique. It is easy to change the name of an app before publication, so our advice is to not spend too much time picking a name up front, since you might need to change it later anyway.
{: class="callout error"}

### Make a proposal {#proposal}

When you have an idea for an app, you may want to propose it on the [App Fair discussion forums](https://github.com/orgs/appfair/discussions). This will give the community the opportunity to provide feedback on the idea, as well as make an assessment about whether the app will be suitable for distribution through the Ap Fair.

Creating a proposal is optional, but it is a good way to get community feedback on your idea before you invest effort in building something that might not fit well with the App Fair's mission or needs.
{: class="callout warning"}

### Creating an organization and repository {#new-org-repo}

Every App Fair app must be represented by a unique GitHub organization. An organization can be created for free by going to [https://github.com/account/organizations/new?plan=free](https://github.com/account/organizations/new?plan=free). It can be created an managed by an individual, or many people can be invited to participate in the app's development.

The organization's name should be the application ID, which will typically be the app's name. For example, for the "App Name" app, and organization named "App-Name" should be created.

Once the organization is made, the app's repository should be created by going to [https://github.com/new](https://github.com/new). The repository name must exactly match the organization name (e.g., "https://github.com/App-Name/App-Name"). The repository should be public and empty (no README, .gitignore, or license files). The contents will be added in the next steps.

### Initializing the app {#init-app}

App Fair apps are developed using [Skip](https://skip.dev), which is the technology that enables the creation of a dual-platform iOS+Android app from a single Swift codebase. Follow the [Getting Started](https://skip.dev/docs/gettingstarted/) instructions for setting up Skip on your machine, except then it comes to the creation of the app, the following command should be used instead (substituting "App-Name" with the name of the repository you just created):

```
skip init --open-xcode --appfair App-Name
```

This will initialize a new Skip application with the correct parameters for the App Fair. You should then add the newly created project to the repository and make an initial commit:

```
cd App-Name
git init
git remote add origin https://github.com/App-Name/App-Name.git
git branch -M main
git add .
git commit -m "initial commit"
git push -u origin main
```

Your repository is now created and initialized with a new, valid (albeit vanilla and uninteresting) App Fair app.

In addition to creating the repository, the app is also set up with a GitHub continuous integration workflow that will build your app every time you push a commit or create a Pull Request. This action is a critical part of the App Fair process, and should not be disabled.
{: class="callout warning"}


## Developing {#developing}

### App development guidelines {#app-guidelines}

By now you already know the fundamental requirements of an App Fair app: they must consist of 100% free and open-source software, and they must respect the privacy of the user by not embedding any tracking, surveillance, or advertising tech.

There are a number of other guidelines that App Fair apps should also strive to follow:

#### Respect offline mode {#guideline-offline}

Apps should work in a variety of network conditions: fast wi-fi as well as slow and metered cellular. It should generally be possible to continue to use the app in an "offline" mode.

#### Be fast to launch and efficient with memory and battery {#guideline-fast}

App Fair apps should launch quickly and be mindful of the device's resources. Avoid unnecessary background processing, large memory allocations, and operations that drain the battery. Users on older devices and slower connections should still have a good experience.

#### Provide in-app guidance {#guideline-guidance}

Apps should be intuitive to use without requiring external documentation. Include onboarding screens or contextual hints where appropriate, so that users of all experience levels can understand the app's functionality without searching for help.

#### Facilitate easy translation {#guideline-translations}

All user-facing strings should be externalized using the platform's standard localization mechanisms. In SwiftUI, this means using `LocalizedStringKey` and `.strings`/`.xcstrings` files. Skip automatically bridges these to Android's string resource system. Avoid hardcoded strings in your views so that community translators can contribute localizations without modifying code.

### The app development cycle {#appdev}

The day-to-day development workflow for an App Fair app follows standard Xcode practices:

1. **Open your project in Xcode** and develop using Swift and SwiftUI as you normally would. Skip's Xcode plugin automatically generates the corresponding Android project in the background.
2. **Test on iOS** using the iOS Simulator directly from Xcode.
3. **Test on Android** by running the Android target from Xcode, which launches the Android emulator via Gradle. You can also open the generated Android project in Android Studio for platform-specific debugging.
4. **Commit and push** your changes to your repository. Each push triggers the CI workflow, which builds both the iOS and Android targets to verify that your app compiles correctly on both platforms.
5. **Iterate** on your app by repeating the above steps. Use Pull Requests for larger changes to take advantage of CI build verification before merging.

For more details on Skip's development workflow, see the [Skip documentation](https://skip.tools/docs/).

## Releasing {#releasing}

The App Fair release process is designed so that you, the creator, maintain full ownership of your source code in your own GitHub organization, while the App Fair handles the building, signing, and distribution of your app to the Apple App Store and Google Play Store.

The process works through a fork-based model:

1. You develop and tag releases in your own repository (e.g., `github.com/Tune-Out/Tune-Out`).
2. The App Fair maintains a fork of your repository (e.g., `github.com/appfair/Tune-Out`).
3. When release tags are synchronized to the App Fair fork, GitHub Actions workflows automatically build, sign, and deploy your app to the distribution channels.

This separation ensures that you always retain control of your source code while the App Fair manages the signing credentials and store submission process.

### About the App Fair release process {#app-fair-releases}

The release pipeline is powered by GitHub Actions and the [skiptools/actions](https://github.com/skiptools/actions) reusable workflows. Every App Fair app repository includes a CI workflow file (e.g., `.github/workflows/app-name.yml`) that was created during `skip init --appfair`. This workflow is configured to:

- **Build on every push to `main`** — ensures the app compiles on both platforms after every commit.
- **Build on Pull Requests** — validates changes before they are merged.
- **Build and release on version tags** — when a tag matching the pattern `X.Y.Z` (e.g., `1.1.6`) is pushed, the workflow builds release binaries for both iOS and Android.
- **Run daily scheduled builds** — catches issues caused by upstream dependency changes.

The workflow calls the shared `skiptools/actions` build pipeline, which handles compiling the Swift/SwiftUI code for iOS and transpiling it to Kotlin/Jetpack Compose for Android via Skip. When the appropriate signing credentials are configured (in the App Fair fork), the workflow also handles code signing and submission to the Apple App Store and Google Play Store.

**Example:** The [Tune-Out](https://github.com/Tune-Out/Tune-Out) app uses this exact process. Its CI workflow triggers on every push and on version tags. The App Fair fork at [appfair/Tune-Out](https://github.com/appfair/Tune-Out) has the signing secrets configured, so when a release tag is synchronized to the fork, the app is automatically built, signed, and submitted to both stores.

### Managing metadata {#metadata}

App store metadata — including your app's description, keywords, screenshots, and promotional text — is managed through [Fastlane](https://fastlane.tools/) metadata files that live in your repository. This keeps all of your app's metadata version-controlled alongside the code, and allows the automated release pipeline to submit metadata updates to the stores.

#### About Fastlane {#metadata-fastlane}

Fastlane is an open-source tool for automating mobile app deployment. The App Fair uses Fastlane's metadata directory structure to organize app store listings for both iOS and Android. When you initialize your app with `skip init --appfair`, a Fastlane metadata directory structure is created in your repository.

#### Android metadata {#metadata-fastlane-android}

Android metadata is stored under `fastlane/metadata/android/` in your repository. This includes directories for each locale (e.g., `en-US/`, `fr-FR/`) containing files such as:

- `title.txt` — The app's display name on the Play Store.
- `short_description.txt` — A brief summary (up to 80 characters).
- `full_description.txt` — The full Play Store description (up to 4000 characters).

##### Android screenshots {#metadata-fastlane-android-screenshots}

Android screenshots are placed in the locale directories under `images/` subdirectories (e.g., `phoneScreenshots/`, `tabletScreenshots/`). Include screenshots that showcase your app's key features. Google Play requires at least two screenshots per device type.

#### iOS metadata {#metadata-fastlane-ios}

iOS metadata is stored under `fastlane/metadata/` and follows a similar per-locale directory structure. Key files include:

- `name.txt` — The app's display name on the App Store.
- `subtitle.txt` — A brief subtitle (up to 30 characters).
- `description.txt` — The full App Store description.
- `keywords.txt` — Comma-separated keywords for App Store search.
- `promotional_text.txt` — Text that can be updated without a new app version.

##### iOS screenshots {#metadata-fastlane-ios-screenshots}

iOS screenshots are placed under `screenshots/` in locale subdirectories. Apple requires screenshots for various device sizes (e.g., iPhone 6.7", iPhone 6.5", iPad 12.9"). Screenshots should highlight your app's primary functionality and be provided for each supported device class.

### Creating a tag {#release-tag}

When your app is ready for release, you create a release by tagging your repository with a [semantic version](https://semver.org/) number. The tag must match the pattern `X.Y.Z` (e.g., `1.0.0`, `1.1.6`):

```
git tag 1.0.0
git push origin 1.0.0
```

This tag push triggers the CI workflow in your repository, which will build unsigned binaries for both iOS and Android and attach them to a GitHub Release. These unsigned builds serve as verification that your app compiles correctly.

The version number in the tag must also match the version configured in your Xcode project. Follow semantic versioning conventions: increment the major version for breaking changes, the minor version for new features, and the patch version for bug fixes.

### Fork requests {#fork-request}

Once your app is ready for distribution through the App Fair, you need to request that the App Fair create a fork of your repository. This is done by submitting a fork request on the [App Fair discussion forums](https://github.com/orgs/appfair/discussions).

The App Fair team will review your app to ensure it meets the project's guidelines (open source, no tracking/advertising, generally useful), and if approved, will create a fork under the `appfair` GitHub organization (e.g., `github.com/appfair/App-Name`).

The App Fair fork is where the signing and deployment magic happens. The fork contains the same CI workflow as your source repository, but with additional secrets configured:

- **Android signing:** `KEYSTORE_JKS`, `KEYSTORE_PROPERTIES`, and `GOOGLE_PLAY_APIKEY` for signing and publishing to the Google Play Store.
- **iOS signing:** `APPLE_CERTIFICATES_P12`, `APPLE_CERTIFICATES_P12_PASSWORD`, and `APPLE_APPSTORE_APIKEY` for signing and publishing to the Apple App Store.

These secrets are managed by the App Fair and are never exposed to the app creator. This means the App Fair handles the entire signing and submission process on your behalf.

**Example:** The [Tune-Out](https://github.com/Tune-Out/Tune-Out) app is maintained by its creators in the `Tune-Out` organization. The App Fair fork at [appfair/Tune-Out](https://github.com/appfair/Tune-Out) is where release tags trigger the signed builds that are submitted to the Apple App Store and Google Play Store.

### Handling feedback {#handling-feedback}

After your app is published, users may report issues or request features. GitHub Issues on your source repository is the primary channel for this feedback. You should monitor your repository's issues and respond to user reports in a timely manner.

For issues reported through the app stores (App Store reviews, Play Store reviews), you can respond through the respective store's developer console. However, encouraging users to file GitHub Issues for bug reports ensures that feedback is tracked alongside your development workflow.

## Maintenance {#app-maintenance}

Maintaining an App Fair app is an ongoing commitment. Your app should continue to function correctly as operating systems are updated and user expectations evolve. The daily scheduled CI builds help catch issues caused by upstream changes in dependencies or platform SDKs.

### Releasing updates {#app-updates}

The update process follows the same workflow as the initial release:

1. **Develop and test** your changes in your source repository, pushing commits to `main`.
2. **Update the version number** in your Xcode project (incrementing the patch, minor, or major version as appropriate).
3. **Create and push a new tag** (e.g., `git tag 1.1.7 && git push origin 1.1.7`).
4. **Synchronize the tag** to the App Fair fork. The App Fair will sync the new tag from your source repository to the fork, which triggers the automated build and submission pipeline.

The new version will be built, signed, and submitted to the Apple App Store and Google Play Store through the App Fair fork's CI workflow. App store review times vary, but updates typically appear within a few days.

### Managing localization and translations {#app-localization}

App Fair apps should strive to be accessible to users worldwide. If you used `LocalizedStringKey` and standard localization files as recommended, community members can contribute translations by submitting Pull Requests to your repository with new or updated `.strings`/`.xcstrings` files.

You can also update the Fastlane metadata files for each locale to ensure that your app's store listing is translated alongside the app itself.


## FAQ

### What software licenses can be used with the App Fair {#faq-license}

The top-level app project must be made available under the GNU General Public License (GPL) version 3 in order to qualify to be distributed through the App Fair. The app can have dependencies on libraries that are available under any of the GPL-compatible OSI-approved licenses, such as the Apache, BSD, and MIT licenses.

### Why Skip instead of Flutter/React Native/Xamarin/MAUI/etc? {#faq-skip-xp}

Platform-native user interfaces provide a premium app experience, optimal performance and superior battery life. Skip facilitates the creation of apps using each platform's vendor-recommended design language: Swift and SwiftUI for iOS, and Kotlin and Jetpack Compose for Android.

### Can I develop an app that only supports Android or iOS? {#faq-xor}

No, distributing an app through the App Fair requires that it support both iOS and Android. There may be different features that are enabled for different platforms as a consequence of each platform's unique feature-set, but in general the app should aim to provide the same experience on both of the major mobile operating systems.

### Can I build an App Fair app for macOS/Windows/Linux? {#faq-desktop}

No. App Fair apps are squarely focused on native mobile devices.

### Can I build an App Fair app for the web? {#faq-web}

No. App Fair apps are squarely focused on native mobile devices.

### Can I develop an App Fair app on Linux or Windows? {#faq-dev-lin-win}

Not at this time. Even though Android apps can be developed on any of macOS, Linux, or Windows, building and testing iOS apps requires Xcode and the tools that come with it (i.e., the iOS Simulator), which requires macOS.

### What are the minimum system requirements for running App Fair apps {#faq-sysreq}

In order to install and run an App Fair App, a device must be running either iOS 17 or Android 10 (or higher). Individual apps may add higher system requirements, but it is generally not recommended in order to reach the widest possible audience.

### Can an app have different features for different distribution channels? {#faq-heterogeneous-features}

Yes. An app can check at runtime whether it has been installed from the App Fair versus one of the commercial app stores, and choose the enable or disable features accordingly.

### How can I remove my app from one of the the App Fair distribution channels? {#faq-leave-distribution-channel}

### Can I leave the App Fair completely and distribute my app independently? {#faq-leave-app-fair}

### Why does fairapps need write access to my project? {#faq-write-access}

The App Fair build process builds and signs your apps, but the actual binaries are still distributed through your own repository. As such, the App Fair needs the ability to add files to your app repository's releases, which requires write access to your repository.

### Can I build my own app binary instead of having the App Fair do it? {#faq-trusted-builds}

Yes. When you tag your repository with a semantic version, your app is automatically built and binaries for iOS (.ipa) and Android (.apk and .adb) are uploaded to the repository's releases page. These will be *unsigned* binaries, and so you will need to manage the signing process yourself if you aim to release the app through other channels.

### What if I can no longer maintain my app? {#faq-maintenance-exit}

You can post a Call for Maintenance (CFM) on the App Fair discussion forums, and then if there is interest, you will arrange to hand over future development to a new individual or group. This is one of the reasons why App Fair apps require that each app is hosted in its own dedicated organization: it facilitates the ability for app development and maintenance to be handed off to another party in the even that the original developer(s) can no longer maintain it.

### I am not a developer, but I would like to translate an app into another language. How can I help? {#faq-translators}

You can contribute translations by submitting a Pull Request to an app's GitHub repository with new or updated localization files. Most App Fair apps use standard `.strings` or `.xcstrings` files for user-facing text. Browse the [App Fair repositories](https://github.com/orgs/appfair/repositories) to find an app you'd like to help translate, and check its existing localization files to see which languages are already supported.

### I am not a developer. How else can I help the App Fair Project? {#faq-other-contributions}
The App Fair Project is run solely on donations from users like you. Please consider making a contribution to the ongoing development and hosting fees by going to [appfair.org/donate/](https://appfair.org/donate/).
