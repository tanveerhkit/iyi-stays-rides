# IYI Stays + Rides

A responsive, pink-and-white IYI booking prototype that combines room discovery, ride add-ons, checkout, post-booking management, a direct ride editor, and a simple hardcoded admin console.

## Local development

```bash
pnpm install
pnpm dev
```

Run the type check and production build with:

```bash
pnpm check
pnpm build
```

The guest app is available at `/`; the demo admin console is available at `/admin`.

## Demo scope

This repository contains frontend-only demo state. Booking, payment, authentication, live fare, inventory, notifications, and admin persistence are not connected to production services.

## GitHub Pages

The included GitHub Actions workflow builds the Vite frontend and publishes `dist/public` to GitHub Pages. In the repository settings, set **Pages → Source** to **GitHub Actions**. The Pages site is suitable for this static demo; production authentication, APIs, payments, maps, and protected admin access should be connected before launch.

## Security

No credentials or API keys are stored in the repository. Add production secrets through the hosting provider's secret manager rather than committing them to source control.
