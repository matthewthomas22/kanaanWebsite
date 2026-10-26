---
name: GKIm Kanaan
description: Sacred, modern, welcoming church identity in purple, ivory, and gold.
colors:
  purple: "#1e1b3a"
  mid: "#2e2a5e"
  ivory: "#e8e4d4"
  gold: "#c9ab4c"
  white: "#f5f3ee"
  muted: "#655f77"
  preview-muted: "#c5bfd4"
  blank-detail: "#dedacd"
  light-divider: "#e8e4d433"
  dark-divider: "#1e1b3a26"
typography:
  display:
    fontFamily: "Cormorant, Georgia, serif"
    fontSize: "clamp(64px, 8.4vw, 96px)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Cormorant, Georgia, serif"
    fontSize: "clamp(64px, 7.5vw, 96px)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  statement:
    fontFamily: "Cormorant, Georgia, serif"
    fontSize: "clamp(36px, 4.5vw, 64px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  text-link:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  surface: "4px"
  indicator: "50%"
spacing:
  gutter: "32px"
  gutter-tablet: "20px"
  gutter-phone: "14px"
  gutter-wide: "48px"
  compact-gap: "12px"
  link-gap: "20px"
  grid-gap: "24px"
components:
  text-link:
    textColor: "{colors.purple}"
    typography: "{typography.text-link}"
    padding: "10px 0"
  church-action:
    textColor: "{colors.gold}"
    typography: "{typography.text-link}"
    padding: "10px 0"
  navigation:
    backgroundColor: "{colors.white}"
    textColor: "{colors.purple}"
    typography: "{typography.label}"
  church-banner:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.surface}"
    padding: "36px 48px 28px"
  event-poster:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.muted}"
    rounded: "{rounded.surface}"
    padding: "12px"
  rail-indicator:
    backgroundColor: "{colors.muted}"
    rounded: "{rounded.indicator}"
    width: "5px"
    height: "5px"
---

# Design System: GKIm Kanaan

## Overview

**Creative North Star: "Sacred, modern, welcoming"**

The confirmed moodboard supplies the visual language: deep purple fields, warm light surfaces, expressive Cormorant headings, clear Inter navigation, and restrained gold details. Large type and generous open space give the church and its commissions room to be recognized.

This document records the Vue 3 component system composed in `src/App.vue`, with shared styles in `assets/css/styles.css`. Vite builds the site for static hosting from `dist/`; referenced images and local fonts are bundled, while original editable artwork and unused image archives remain source materials. Frontmatter tokens are normative. Homepage composition and chapter order remain in `.impeccable/surfaces/index-html.md`; they are not requirements for every future surface. Local Cormorant and Inter files are shipped; the moodboard's optional Lora is not currently implemented.

**Key Characteristics:**
- Deep purple and warm white surface contrast.
- Cormorant display type paired with Inter supporting text.
- Gold navigation cues and fine rules.
- Small-radius framing and flat tonal depth.
- Native scrolling with visible section navigation.

## Colors

### Primary

Deep purple (`purple`) is the dark church field and main text on light surfaces. Mid purple (`mid`) distinguishes the youth field and selected heading emphasis.

### Secondary

Gold (`gold`) marks directional cues, the cross, selected rail rings, and keyboard focus. It is a detail color rather than the default small text color on light surfaces.

### Neutral

Warm white (`white`) forms the page and sticky header. Ivory (`ivory`) carries text on purple and the event-poster placeholder surface. Muted purple (`muted`) supports captions and placeholder labels on light fields; pale preview text (`preview-muted`) supports labels on deep purple. The blank-detail tone forms the empty event bars. Light and dark divider tokens separate content on their corresponding surfaces.

**The Surface Pairing Rule.** Pair ivory text with purple fields and purple text with warm white; preserve the observed supporting-text pairings.

## Typography

Cormorant, with Georgia and serif fallbacks, supplies headings, the wordmark, and expressive statements. Inter, with Arial and sans-serif fallbacks, supplies body, navigation, captions, and links. The scale is fluid and role-specific rather than a single mathematical ratio.

The frontmatter display and headline roles record desktop defaults. The church display becomes `clamp(52px, 12vw, 72px)` on phones; the commission headline becomes 64px, while KYC remains 96px. Event headings use `clamp(48px, 5vw, 70px)` and 54px on phones. The youth statement becomes 44px at tablet widths and 42px on phones. Italic emphasis uses weight 400. Supporting copy resolves to 12px throughout the final stylesheet, including phone navigation, captions, footer copy, and wordmark subtitle.

**The Type Roles Rule.** Use Cormorant for expressive hierarchy and Inter for navigation and supporting information.

## Layout

The implemented homepage uses viewport-height chapters with a sticky header and a reserved right navigation rail. Chapter minimum height subtracts the header from `100svh`; content can grow. The base header is 88px, the rail 60px, and the outer gutter follows the frontmatter gutter token. Inset dark fields retain visible light page chrome.

At 1600px and above the rail grows to 76px and the outer gutter uses its wide variant. At 900px and below, header/rail become 80px/44px and the tablet gutter applies. At 600px and below, header/rail become 92px/28px, the phone gutter applies, and navigation wraps beneath the wordmark. Two-column commission layouts stack. Event cards change from three columns with 24px gaps to vertical rows with an 84px poster column. Children-section and event footers join document flow on phones.

Desktop scroll snapping is mandatory at chapter starts with header-aware scroll padding. Phones and short desktop viewports (height at most 650px, width at least 601px) use proximity snapping. Short desktop viewports use a 70px header. Reduced-motion preference disables smooth scrolling, snapping, transitions, and animation.

## Elevation & Depth

Depth comes from tonal fields, inset framing, and fine dividers. There are no surface drop shadows. The rail's concentric selection ring uses box-shadow as an indicator, not elevation. Sticky header and fixed rail sit above content without adding raised-card treatments.

**The Flat Surface Rule.** Preserve tonal separation and thin rules for the existing surfaces; keep the rail ring an interaction indicator.

## Shapes

Large banners and poster placeholders share the small surface radius. Rail markers are circles. Text links use a thin baseline rather than a filled button enclosure. Inline SVG arrows, the cross, and calendar illustration use thin, rounded strokes; default icons are 20px with a 1.4 stroke width, adjusted for their context. The children's supplied image is contained at its natural aspect ratio rather than cropped into a generic card.

## Components

- **Navigation:** warm white sticky header, Cormorant wordmark, Inter links. A thin underline grows on hover and stays visible for `aria-current="location"`. Phone navigation remains visible in a second row.
- **Text links:** compact inline labels with a 20px gap, thin baseline, and directional SVG. Arrows travel 4px on hover; the church action uses gold without the baseline. Keyboard focus uses a 2px gold outline with a 6px offset.
- **Section rail:** persistent vertical links with hover/focus labels. The current marker has a purple center and concentric warm white/gold rings. The Vue active-section composable synchronizes the rail and header using the visible chapter and `aria-current`. Both components share navigation records and retain native section anchors.
- **Dark banner:** a flat purple field with ivory display type and a small corner radius. Desktop church padding is recorded in the component token; it compresses on phones and expands on wide screens.
- **Event template:** a shared Vue event card renders each of three stable placeholder records: an ivory poster area with a calendar SVG, followed by neutral blank bars and an availability note. Actual titles, dates, and event details remain blank until verified content is supplied. These are static placeholders, not loading animation.

The current page has no form inputs, chips, dialogs, or filled buttons; this record does not invent their variants.

## Do's and Don'ts

### Do:
- Do use the confirmed purple, ivory, gold, and warm white palette with the documented surface pairings.
- Do pair Cormorant headings with Inter navigation and supporting text.
- Do preserve visible keyboard focus, current-section state, and reduced-motion behavior.
- Do keep provided imagery proportionate and event details blank until verified.

### Don't:
- Don't replace the confirmed palette or heading family with a generic church-site preset.
- Don't turn the optional Lora moodboard reference into an implemented font dependency without adding it deliberately.
- Don't treat the homepage chapter composition as the required layout for every future page.
- Don't fabricate event content or youth imagery to fill the template.
