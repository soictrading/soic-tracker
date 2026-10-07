// Same-origin API for the tracker: /api/people, /api/interactions, /api/interactions/:id.
// Requests reach this function only after Cloudflare Access has signed the person in to
// tracker.soictrading.online, and it hands them to the data Worker through a service binding
// (TRACKER_API), so that Worker no longer needs a public workers.dev address.
export async function onRequest({ request, env }) {
  if (!env.TRACKER_API) {
    return Response.json(
      { error: "TRACKER_API service binding is not set on this Pages project (Settings > Bindings)." },
      { status: 500 },
    );
  }
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api(?=\/|$)/, "") || "/";
  const target = new URL(path + url.search, "https://tracker-api.internal");
  return env.TRACKER_API.fetch(new Request(target, request));
}
