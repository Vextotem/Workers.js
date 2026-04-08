export default {
  async fetch(request) {
    const targetUrl = "https://ppdd18.plaifrdcikf.shop/live.html?_pa=bWF0Y2hJZD03NDEyJm10VGV4dD1vdGhlcnMmc2l0ZUtleT1ncmdlJnNrcHROdW09Mm5k&_pb=4";

    const newHeaders = new Headers(request.headers);

    newHeaders.set("Referer", "https://plaifrdcikf.shop/");
    newHeaders.set("Origin", "https://plaifrdcikf.shop");
    newHeaders.set("User-Agent", request.headers.get("User-Agent") || "");

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
