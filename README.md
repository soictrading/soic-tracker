# SOIC Tracker

Interaction tracker for SOIC Global Trading at `tracker.soictrading.online`, a Cloudflare Worker deployed by
Workers Builds (`npx wrangler deploy`) on every push to `main`.

- `public/index.html` — the whole app.
- `src/worker.js` — serves the page, and the data API at `/api/*`, which it forwards to the data Worker
  `patient-lake-be1f` (D1 database) through the **TRACKER_API** service binding (`wrangler.jsonc`).
- `archive/` — earlier copies of the page, not served.

Cloudflare Access protects `tracker.soictrading.online`, so the page and its API both need a sign-in.
`wrangler.jsonc` turns off this Worker's workers.dev and preview addresses. The data Worker's workers.dev
address must be off too (Workers & Pages → patient-lake-be1f → Settings → Domains & Routes); the service
binding keeps working without it.
