---
title: App Index Schema
---

# App Index Schema

The **App Index** is a JSON document format for describing application metadata across platforms and distribution channels. It provides a structured, machine-readable catalog of an application's localized descriptions, permissions, icons, screenshots, distribution links, and source repository information.

**Schema URI:** `https://appfair.org/schemas/appindex/v1.json`

**Specification version:** `1.0`

## Overview

An App Index document is a single JSON file (conventionally named `appindex.json`) that contains all user-facing metadata for one or more applications. The format is platform-agnostic: the same schema supports mobile, desktop, and web applications across any operating system and distribution channel.

```json
{
  "$schema": "https://appfair.org/schemas/appindex/v1.json",
  "specVersion": "1.0",
  "generated": "2026-05-01T18:00:00Z",
  "generator": "skip/1.8.11",
  "apps": [
    {
      "name": "MyApp",
      "title": { "en": "My App" },
      "description": { "en": "A great app." },
      "keywords": { "en": ["app", "great"] },
      "links": { ... },
      "source": { ... },
      "platforms": {
        "ios": { "version": "1.0.0", ... },
        "android": { "version": "1.0.0", ... }
      }
    }
  ]
}
```

## Document Structure

### Top-Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | yes | Must be `"https://appfair.org/schemas/appindex/v1.json"` |
| `specVersion` | string | yes | Must be `"1.0"` |
| `generated` | string | no | ISO 8601 timestamp of when the document was generated |
| `generator` | string | no | Identifier of the tool that produced the document |
| `apps` | array | yes | One or more application entries |

### App Entry

Each element of the `apps` array describes a single application. Localized fields at the app level are shared defaults across all platforms.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Canonical machine-readable name |
| `title` | localized string | no | Display name (shared across platforms) |
| `subtitle` | localized string | no | Short promotional text |
| `description` | localized string | no | Full description |
| `keywords` | localized string array | no | Search keywords as arrays |
| `releaseNotes` | localized string | no | What's new in this version |
| `platforms` | object | yes | Per-platform metadata (keys are platform identifiers) |
| `links` | object | no | Cross-platform URLs (privacy, support, etc.) |
| `source` | object | no | Source code repository information |

### Field Promotion and Resolution

When a localized field (`title`, `subtitle`, `description`, `keywords`, `releaseNotes`) is identical across all platforms, the generator promotes it to the app level to avoid duplication. When it differs between platforms, each platform carries its own version.

**Resolution rule for consumers:** When a promotable field exists at both the app level and a platform level, the **platform-level value takes precedence** for that platform. Consumers SHOULD resolve each locale by checking the platform first, then falling back to the app level.

When all locales of a localized string have the same value (e.g. a brand name that doesn't change across languages), the value is collapsed to a single `"en"` key.

### Platform Entry

Each key in `platforms` is a platform identifier (e.g. `"ios"`, `"android"`, `"macos"`, `"windows"`, `"linux"`). The platform identifier is the key in the parent object, not a field within the platform entry.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | yes | Human-readable version string |
| `buildNumber` | string | no | Internal build number |
| `bundleIdentifier` | string | no | Apple bundle identifier (Apple platforms) |
| `applicationId` | string | no | Android application ID (Android platforms) |
| `title` | localized string | no | Platform-specific display name override |
| `subtitle` | localized string | no | Platform-specific promotional text override |
| `description` | localized string | no | Platform-specific description override |
| `keywords` | localized string array | no | Platform-specific keywords override |
| `releaseNotes` | localized string | no | Platform-specific release notes override |
| `permissions` | array | no | Permission declarations |
| `channels` | object | no | Distribution channel entries |
| `assets` | object | no | Image assets (icon, screenshots, etc.) |
| `metadata` | object | no | Platform-specific configuration (opaque) |
| `sbom` | object | no | SPDX 2.3 Software Bill of Materials |

## Localized Strings

All user-facing text is represented as a **localized string**: an object mapping [BCP 47](https://www.rfc-editor.org/rfc/rfc5646) locale codes to translated values. The `"en"` key represents the default English locale.

```json
{ "en": "A fast web browser", "fr": "Un navigateur web rapide" }
```

When all locales have the same value, the dictionary is collapsed to a single `"en"` key.

**Keywords** use a **localized string array** format:

```json
{ "keywords": { "en": ["web", "browser"], "fr": ["web", "navigateur"] } }
```

## Links

Cross-platform URLs. Each value is a localized URL map:

```json
{ "links": { "privacy": { "en": "https://example.com/privacy" } } }
```

## Source Repository

```json
{
  "source": {
    "url": "https://github.com/Org/App.git",
    "release": "https://github.com/Org/App/releases/tag/1.0.0/",
    "assets": "https://raw.githubusercontent.com/Org/App/refs/tags/1.0.0/",
    "license": "GPL-2.0-only"
  }
}
```

| Field | Description |
|-------|-------------|
| `url` | Repository clone URL (may be HTTPS or SSH; intentionally not URI-constrained) |
| `release` | URL to the release page for the current version |
| `assets` | Base URL for resolving image `location` paths: `assets + location` = full URL |
| `license` | SPDX license identifier |

## Distribution Channels

Each platform declares distribution channels in the `channels` object. Keys are channel identifiers. Well-known keys include `appleappstore`, `googleplaystore`, `fdroid`, `altstore`, `testflight`, `amazonappstore`, `homebrew`, `flatpak`, and `microsoftstore`.

```json
{ "channels": { "appleappstore": { "id": "1640618584", "url": "https://apps.apple.com/app/id1640618584" } } }
```

## Assets

Image assets grouped in an `assets` object:

```json
{
  "assets": {
    "icon": { "location": "icon-1024.png", "size": 442604, "digest": "sha256:bea1...", "width": 1024, "height": 1024 },
    "screenshots": { "en": [{ "location": "screenshots/1.png", ... }] },
    "featureGraphic": { "en": { "location": "images/featureGraphic.png", ... } }
  }
}
```

Image `location` paths combined with `source.assets` form resolvable URLs.

## Permissions

Platform-specific declarations with a `key` and an optional localized `description`:

```json
{ "permissions": [{ "key": "NSCameraUsageDescription", "description": { "en": "Camera access for video calls" } }] }
```

## Platform Metadata

Opaque platform-specific configuration in the `metadata` object:

```json
{ "metadata": { "entitlements": { ... }, "infoPlist": { ... }, "manifest": { ... } } }
```

## Generation

```bash
skip meta index                          # stdout
skip meta index -O appindex.json         # file
skip export --appindex -d output/        # export with resource linking
```

## Schema

[`https://appfair.org/schemas/appindex/v1.json`](https://appfair.org/schemas/appindex/v1.json)
