import test from "node:test";
import assert from "node:assert/strict";
import { createCatFactsApiHandler } from "../src/server/catFactsApi.js";

function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: "",
    setHeader(name, value) {
      this.headers[name] = value;
    },
    end(payload) {
      this.body = payload;
    }
  };
}

test("API returns Italian response for Italian input", async (t) => {
  const originalFetch = global.fetch;
  global.fetch = async () => ({
    ok: true,
    async json() {
      return {
        data: [
          "Cats sleep many hours every day.",
          "Cats use whiskers to navigate narrow spaces."
        ]
      };
    }
  });

  t.after(() => {
    global.fetch = originalFetch;
  });

  const handler = createCatFactsApiHandler();
  const req = {
    method: "GET",
    url: "/api/cat-facts?q=gatti%20curiosi",
    headers: {},
    socket: { remoteAddress: "127.0.0.1" }
  };
  const res = createMockRes();

  await handler(req, res);

  assert.equal(res.statusCode, 200);
  const payload = JSON.parse(res.body);
  assert.equal(payload.lang, "it");
  assert.ok(Array.isArray(payload.data));
  assert.equal(typeof payload.data[0], "string");
});
