# Design System Specification: The Kinetic Control Surface

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **"The Kinetic Control Surface."**

This system moves away from the static, boxy templates of traditional SaaS and instead embraces a high-tech, tactile interface that feels like a precision instrument. By utilizing intentional asymmetry—inspired by the diagonal tension in the logo—and a philosophy of "Light through Glass," we create a UI that feels both authoritative and ethereal.

The design breaks traditional grids by using overlapping layers, extreme typographic scale shifts, and a "No-Line" architecture. Every element is designed to feel as though it is part of a singular, monolithic piece of hardware where function is dictated by depth and luminescence rather than outlines.

---

## 2. Colors: Tonal Architecture
Our palette is anchored in a deep, cosmic foundation (`#14052b`) to allow the primary purple (`#7C5CFF`) to act as a light source.

### The "No-Line" Rule
**Explicit Instruction:** Use of 1px solid borders for sectioning or containment is strictly prohibited.
Structure is defined through **Tonal Shifts**. To separate a sidebar from a main content area, use `surface-container-low` for the base and `surface-container-high` for the secondary area. The eye should perceive change through color value, not a stroke.

### Surface Hierarchy & Nesting
Treat the interface as a physical object with carved-out or extruded sections.
* **Base Layer:** `surface` (#14052b)
* **Sub-sections:** `surface-container-low` (#1a0934)
* **Active/Floating Modules:** `surface-container-highest` (#2f1a50)

### The "Glass & Gradient" Rule
To elevate the "Control Surface" feel, interactive elements should utilize Glassmorphism. Use semi-transparent `surface-tint` with a `backdrop-filter: blur(12px)`.
* **Signature Textures:** For primary CTAs, apply a linear gradient from `primary` (#b1a1ff) to `primary-dim` (#7757fa) at a 135° angle. This mimics the "glow" of a high-end OLED control.

---

## 3. Typography: The Editorial Tech-Stack
We utilize a high-contrast pairing of **Space Grotesk** for brand-forward messaging and **JetBrains Mono** (or equivalent) for technical data.

* **Display Scale (The Hero):** Use `display-lg` (3.5rem) with `-0.04em` letter spacing. This should be used sparingly for high-impact metrics or section headers to create an editorial feel.
* **Headline Scale (The Command):** `headline-md` (1.75rem) provides the primary hierarchy for page actions.
* **The Technical Core:** All log data, system status, or "blocked/allowed" reports must use Monospace typography at `body-sm` (0.75rem). This reinforces the "high-tech" identity.
* **Label Utility:** `label-md` uses **Inter** at 0.75rem with all-caps and `0.05em` tracking to denote system states and small UI metadata.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are replaced by **Ambient Luminance**.

* **The Layering Principle:** Depth is achieved by stacking surface tiers. A `surface-container-lowest` card placed atop a `surface-container-low` section creates a recessed "wells" effect, characteristic of machined control panels.
* **Ambient Shadows:** For floating modals, use a shadow with a 40px blur at 6% opacity, tinted with `primary` (#7c5cff). This makes the element appear to emit light rather than just cast a shadow.
* **The "Ghost Border" Fallback:** If accessibility requires a container edge, use `outline-variant` (#504169) at **15% opacity**. It should be felt, not seen.
* **Corner Radii:** Following the logo's soft-yet-precise geometry, use the **XL (0.75rem)** radius for large containers and **SM (0.125rem)** for internal micro-components like input fields or tags.

---

## 5. Components

### Buttons & Interaction
* **Primary Action:** Gradient fill (`primary` to `primary-dim`). Use `round-md` (0.375rem). On hover, add a `primary` glow (8px blur).
* **Tertiary/Ghost:** No container. Use `on-surface-variant` text with a `primary` underline that expands from the center on hover.

### High-Tech Logs & Lists
* **Forbid Dividers:** Never use horizontal lines. Use a `4px` vertical margin between list items and alternate background shades between `surface-container` and `surface-container-low`.
* **Status Indicators:** Use `tertiary` (#ff9ac2) for semantic "Blocked" states and a vibrant green (Semantic) for "Allowed." These should be styled as "Glow-chips" with a subtle background pulse.

### Inputs & Control Surfaces
* **Input Fields:** Use `surface-container-highest` with a `0px` border. When focused, the bottom edge should illuminate with a `primary` 2px line (the only exception to the No-Line rule).
* **Technical Monitor (Custom Component):** A dedicated section for logs using `surface-container-lowest` (#000000) with a `0.5rem` padding and Monospace typography. This simulates a terminal embedded into the dashboard.

---

## 6. Do's and Don'ts

### Do
* **DO** use whitespace as a structural tool. Let the typography breathe.
* **DO** use the logo's diagonal angles (approx 15 degrees) for background decorative elements or masks.
* **DO** prioritize "Primary Purple" for active states only. If everything is purple, nothing is.

### Don't
* **DON'T** use pure grey. Every neutral must be tinted with a purple or blue hue to maintain the "Cosmic" depth.
* **DON'T** use 1px borders to separate content. Use background tonal shifts or spacing.
* **DON'T** use standard "drop shadows." Only use ambient, tinted blurs that feel like light emission.
* **DON'T** mix the Monospace font with Display headings. Keep "Tech" and "Editorial" hierarchies distinct.