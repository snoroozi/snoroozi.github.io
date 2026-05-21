---
name: project-redesign-2026
description: Major website redesign — sidebar + scrollable main layout, carousel, bookshelf, timeline, globe
metadata:
  type: project
---

Complete redesign of snoroozi.github.io delivered May 2026. Three files added:
- `assets/css/redesign.css` (947 lines) — all new styles
- `assets/js/redesign.js` (835 lines) — data + carousel, bookshelf, timeline, globe, modal
- `index.html` rewritten (448 lines)

**Why:** User requested Yubo-style interactive academic site (yubol-bobo.github.io interaction patterns).

**Key design decisions:**
- 290px navy sidebar (sticky) + scrollable ivory main content
- CSS 3D carousel (perspective: 1100px, data-pos="active/prev/next/prev-2/next-2/hidden")
- Bookshelf sidebar: CSS book spines with translateX slide-out on active/hover
- Timeline: horizontal, scroll-triggered IntersectionObserver stagger animation
- Globe: D3 v7 + TopoJSON (world-atlas@2), antique parchment color palette, canvas-drawn
- Modal: single shared overlay, ESC + backdrop close
- All CDNs: D3 v7, TopoJSON v3, world-atlas v2 from jsDelivr

**How to apply:** When user asks about the site or wants to extend it, these are the data arrays to modify:
- `PUBS_DATA`, `PROJECTS_DATA`, `TIMELINE_DATA`, `NEWS_DATA`, `GLOBE_PINS` in redesign.js
