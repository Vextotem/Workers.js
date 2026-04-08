export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("Missing ?url= parameter", { status: 400 });
    }

    const targetOrigin = new URL(targetUrl).origin;

    const newHeaders = new Headers();
    newHeaders.set("Referer", targetOrigin + "/");
    newHeaders.set("Origin", targetOrigin);
    newHeaders.set("User-Agent", request.headers.get("User-Agent") || "Mozilla/5.0");

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: newHeaders
    });

    const modifiedResponse = new Response(response.body, response);
    modifiedResponse.headers.delete("X-Frame-Options");
    modifiedResponse.headers.delete("Content-Security-Policy");

    return modifiedResponse;
  }
};
