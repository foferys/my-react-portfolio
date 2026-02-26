import { readFile } from "node:fs/promises";
import { findBestFact, sanitizeQuery } from "../utils/catFactsEngine.js";

const REMOTE_FACTS_URL = "https://meowfacts.herokuapp.com/?count=120";
const FACTS_TTL_MS = 1000 * 60 * 10;
const RATE_LIMIT_WINDOW_MS = 1000 * 60;
const RATE_LIMIT_MAX_REQ = 30;

const factsCache = {
  expiresAt: 0,
  facts: []
};
let localFactsCache = null;

const rateLimitStore = new Map();

function jsonResponse(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function getClientKey(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "anonymous";
}

function isRateLimited(req) {
  const key = getClientKey(req);
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  existing.count += 1;
  if (existing.count > RATE_LIMIT_MAX_REQ) {
    return true;
  }

  return false;
}

async function loadRemoteFacts() {
  const now = Date.now();
  if (factsCache.expiresAt > now && factsCache.facts.length) {
    return factsCache.facts;
  }

  const response = await fetch(REMOTE_FACTS_URL);
  if (!response.ok) {
    throw new Error(`Remote facts request failed: ${response.status}`);
  }

  const payload = await response.json();
  const remoteFacts = (payload?.data || [])
    .filter((text) => typeof text === "string" && text.trim())
    .map((text, index) => ({
      id: `remote-${index}`,
      lang: "en",
      text: text.trim(),
      source: "meowfacts"
    }));

  factsCache.facts = remoteFacts;
  factsCache.expiresAt = now + FACTS_TTL_MS;
  return remoteFacts;
}

async function loadLocalFacts() {
  if (localFactsCache) return localFactsCache;

  const fileUrl = new URL("../data/localCatFacts.json", import.meta.url);
  const raw = await readFile(fileUrl, "utf-8");
  const parsed = JSON.parse(raw);

  localFactsCache = Array.isArray(parsed) ? parsed : [];
  return localFactsCache;
}

export function createCatFactsApiHandler() {
  return async function catFactsApiHandler(req, res) {
    if (req.method !== "GET") {
      return jsonResponse(res, 405, { error: "Method not allowed", data: [] });
    }

    if (isRateLimited(req)) {
      return jsonResponse(res, 429, { error: "Too many requests", data: [] });
    }

    const requestUrl = new URL(req.url, "http://localhost");
    const query = sanitizeQuery(requestUrl.searchParams.get("q") || "");

    if (!query) {
      return jsonResponse(res, 400, { error: "Query is required", data: [] });
    }

    try {
      const remoteFacts = await loadRemoteFacts();
      const localFacts = await loadLocalFacts();
      const allFacts = [...localFacts, ...remoteFacts];
      const best = findBestFact(query, allFacts);

      // Minimal logging helps debugging relevance decisions without noisy payload dumps.
      console.info("[cat-facts] request", {
        query,
        responseLang: best.lang,
        reason: best.reason,
        totalFacts: allFacts.length
      });

      return jsonResponse(res, 200, {
        data: [best.text],
        lang: best.lang,
        meta: { reason: best.reason }
      });
    } catch (error) {
      console.error("[cat-facts] error", error);
      return jsonResponse(res, 500, {
        error: "Unable to fetch cat facts",
        data: ["Service unavailable"],
        lang: "en"
      });
    }
  };
}
