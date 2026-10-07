# SOIC Tracker

Interaction tracker for SOIC Global Trading, on Cloudflare Pages at `tracker.soictrading.online`.

- `index.html` — the whole app.
- `functions/api/[[path]].js` — the data API at `/api/*`. It forwards to the data Worker
  (`patient-lake-be1f`, D1 database) through the **TRACKER_API** service binding.

Cloudflare Access protects `tracker.soictrading.online` (and the `.pages.dev` addresses), so the page and
its API both need a sign-in. The data Worker must have its `workers.dev` address and preview URLs turned
off; the service binding keeps working without them.

Setup (once): Workers & Pages → soic-tracker → Settings → Bindings → Add → Service binding:
variable name `TRACKER_API`, service `patient-lake-be1f`, for both Production and Preview.
