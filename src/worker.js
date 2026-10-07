// SOIC Tracker: serves the page (public/) and, at /api/*, the data API.
// Cloudflare Access signs people in before any request reaches this Worker on
// tracker.soictrading.online. /api/* is handed to the data Worker (patient-lake-be1f, D1)
// through the TRACKER_API service binding, so that Worker needs no public address.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      const path = url.pathname.slice("/api".length) || "/";
      return env.TRACKER_API.fetch(new Request(new URL(path + url.search, "https://tracker-api.internal"), request));
    }
    return env.ASSETS.fetch(request);
  },
};
