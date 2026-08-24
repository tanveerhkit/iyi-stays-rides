# OYO Rides — Visual Direction

## Three possible directions

### Theme Name: Monsoon Transit
**Very Brief Intro:** A warm, editorial travel interface with deep ink, saffron, cream, and oxidized teal. It treats mobility as part of the story of a stay: confident, human, and rooted in Indian city movement.

**Probability:** 0.07

### Theme Name: Night Route
**Very Brief Intro:** A dark, cinematic route-planning experience with electric lime and cobalt signals. It emphasizes live movement and operational confidence.

**Probability:** 0.03

### Theme Name: Fresh Arrival
**Very Brief Intro:** A bright, airy hospitality system with mineral blue, citrus, and generous white space. It feels optimistic and frictionless, like stepping into a well-run lobby.

**Probability:** 0.09

## Selected Direction: Monsoon Transit

### Design Movement
Contemporary Indian editorial design blended with wayfinding graphics and boutique hospitality. The visual language should feel like a beautifully printed city guide translated into a modern booking interface.

### Core Principles
1. **Arrival before acceleration:** The experience begins with reassurance and orientation, not speed or noise.
2. **Editorial hierarchy:** Large, characterful headlines create a magazine-like rhythm; supporting details remain crisp and practical.
3. **Signal and softness:** Use strong route markers, pill-shaped status tags, and map-like linework alongside warm paper surfaces and soft shadows.
4. **Human-scale utility:** Every flourish must help a traveler decide, locate, or feel looked after.

### Color Philosophy
The foundation is warm parchment rather than sterile white, creating a hospitality feel. Ink navy provides confidence and legibility. OYO red is reserved for primary actions and meaningful alerts, while marigold and oxidized teal act as route signals. The emotional intent is “a trusted local handoff”: warm enough to welcome, structured enough to rely on.

**Palette:**
- Parchment: `#F7F2E9`
- Ink: `#16232D`
- OYO Red: `#E5472E`
- Marigold: `#E7A83B`
- Oxidized Teal: `#4C7F78`
- Mist: `#E4ECE8`
- Terracotta: `#C96D4E`

### Layout Paradigm
Use an asymmetric editorial composition. The hero pairs a tall route illustration on the right with a booking module that overlaps the fold on the left. Subsequent sections alternate between narrow narrative columns, offset cards, and long horizontal route bands. Avoid a repetitive centered stack; let a vertical red route rail and offset section markers lead the eye down the page.

### Signature Elements
1. A **vertical route rail** with numbered stops that anchors the page and visually connects the guest journey.
2. **Ticket-stub cards** with perforation-style edges for ride options, receipts, and reassurance content.
3. **Monsoon contour lines** and grain textures used sparingly behind hero and transition sections.

### Interaction Philosophy
Interactions should feel like confirming a journey with a thoughtful concierge. Inputs reveal context, ride cards lift subtly on hover, and booking confirmation uses a brief route-progress state. Avoid gratuitous motion; use feedback to reduce uncertainty.

### Animation
Use 180–260ms ease-out transitions for hover, focus, and dropdown states. On initial load, the route rail draws in first, then hero copy and booking module rise in with 40ms stagger intervals. Ride cards use a 2px translateY lift and shadow change. The route preview line can pulse once on confirmation. Respect `prefers-reduced-motion` and keep all essential state changes instant.

### Typography System
Use **DM Serif Display** for hero headlines and high-impact section titles, paired with **Manrope** for body copy, labels, buttons, and operational data. Headlines should be 56–76px on desktop with tight line-height; body text should be 15–17px with generous line-height; labels should use 11–12px uppercase tracking with strong contrast.

### Brand Essence
**Positioning:** OYO Rides is the dependable mobility layer for people whose journey starts or ends at an OYO stay.  
**Personality:** Grounded, observant, reassuring.

### Brand Voice
Headlines should be direct, vivid, and place-aware. CTAs should sound like a useful next step rather than a sales push. Microcopy should remove ambiguity around pickup, price, and support.

Example headlines:
- “The room is booked. The way there is too.”
- “Arrive with one less thing to figure out.”

Example CTA and microcopy:
- “Plan my pickup”
- “Your fare is shown before you confirm.”

### Wordmark & Logo
Use a compact **route-pin monogram**: a rounded square pin containing a two-segment road bend that subtly echoes the OYO circular mark without reproducing the wordmark. Pair it with a custom all-caps “OYO RIDES” lockup using Manrope ExtraBold and slightly compressed tracking. The icon should be used as the favicon and as a visible header mark.

### Signature Brand Color
**Oxidized Teal `#4C7F78`** is the ownable supporting color. It differentiates the mobility layer from generic transport blue while harmonizing with OYO’s warm red and the editorial parchment background.

## Style Decisions

- Use a light, warm hospitality canvas; do not default to a dark interface.
- Keep OYO red focused on actions and route moments, not as a full-page background.
- Use real visual texture through generated hero art and CSS grain, not stock-photo collage.
- Keep booking controls dense and practical, while narrative sections can breathe.
- Never use fake reviews, ratings, or testimonials. Trust is communicated through transparent service details, not invented social proof.
