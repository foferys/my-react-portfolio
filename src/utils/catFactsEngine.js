const EN_STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "have", "in", "is", "it", "its", "of", "on", "or", "that", "the", "to", "was", "were", "with", "you", "your"
]);

const IT_STOPWORDS = new Set([
  "a", "ad", "al", "alla", "allo", "anche", "con", "da", "dei", "del", "della", "delle", "di", "e", "gli", "ha", "i", "il", "in", "la", "le", "ma", "nei", "nel", "nella", "o", "per", "piu", "su", "tra", "un", "una"
]);

const IT_HINTS = ["zione", "zioni", "mente", "gli", "che", "non", "gatto", "gatti", "coda", "miagolio", "fusa"];

const MAX_QUERY_LEN = 140;
const MAX_CANDIDATES = 25;

function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stemToken(token, lang) {
  if (token.length < 4) return token;

  if (lang === "it") {
    const itSuffixes = ["zioni", "zione", "mente", "are", "ere", "ire", "ato", "ito", "ita", "ita", "oso", "osa", "i", "e", "o", "a"];
    for (const suffix of itSuffixes) {
      if (token.endsWith(suffix) && token.length > suffix.length + 2) {
        return token.slice(0, -suffix.length);
      }
    }
    return token;
  }

  const enSuffixes = ["ingly", "edly", "ing", "edly", "ed", "ies", "es", "s"];
  for (const suffix of enSuffixes) {
    if (token.endsWith(suffix) && token.length > suffix.length + 2) {
      if (suffix === "ies") return `${token.slice(0, -3)}y`;
      return token.slice(0, -suffix.length);
    }
  }

  return token;
}

function tokenize(text, lang) {
  const normalized = normalizeText(text);
  if (!normalized) return [];

  const stopwords = lang === "it" ? IT_STOPWORDS : EN_STOPWORDS;
  return normalized
    .split(" ")
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => !stopwords.has(token) || token.length > 4)
    .map((token) => stemToken(token, lang));
}

function charTrigrams(text) {
  const compact = normalizeText(text).replace(/\s+/g, "_");
  if (compact.length < 3) return new Map();

  const trigrams = new Map();
  for (let i = 0; i <= compact.length - 3; i += 1) {
    const tri = compact.slice(i, i + 3);
    trigrams.set(tri, (trigrams.get(tri) || 0) + 1);
  }
  return trigrams;
}

function cosineSimilarity(mapA, mapB) {
  if (!mapA.size || !mapB.size) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const value of mapA.values()) {
    normA += value * value;
  }

  for (const value of mapB.values()) {
    normB += value * value;
  }

  for (const [key, valueA] of mapA.entries()) {
    const valueB = mapB.get(key);
    if (valueB) dot += valueA * valueB;
  }

  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function jaccardSimilarity(tokensA, tokensB) {
  if (!tokensA.length || !tokensB.length) return 0;

  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  let intersection = 0;

  for (const token of setA) {
    if (setB.has(token)) intersection += 1;
  }

  const union = setA.size + setB.size - intersection;
  return union ? intersection / union : 0;
}

function limitedLevenshtein(a, b, maxDistance = 2) {
  if (Math.abs(a.length - b.length) > maxDistance) return maxDistance + 1;
  if (a === b) return 0;

  const prev = new Array(b.length + 1);
  const curr = new Array(b.length + 1);

  for (let j = 0; j <= b.length; j += 1) prev[j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    curr[0] = i;
    let rowMin = curr[0];

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      rowMin = Math.min(rowMin, curr[j]);
    }

    if (rowMin > maxDistance) return maxDistance + 1;

    for (let j = 0; j <= b.length; j += 1) prev[j] = curr[j];
  }

  return prev[b.length];
}

export function detectLanguage(input) {
  const text = normalizeText(input);
  if (!text) return "en";

  const words = text.split(" ").filter(Boolean);
  let itScore = 0;
  let enScore = 0;

  for (const word of words) {
    if (IT_STOPWORDS.has(word)) itScore += 1;
    if (EN_STOPWORDS.has(word)) enScore += 1;
    if (IT_HINTS.some((hint) => word.includes(hint))) itScore += 1;
    if (/[àèéìòù]/.test(word)) itScore += 2;
  }

  // Default to English on ties to preserve previous API behavior.
  return itScore > enScore ? "it" : "en";
}

function buildDocMeta(fact, index, langForTokens) {
  const tokens = tokenize(fact.text, langForTokens);
  const tf = new Map();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }

  return {
    ...fact,
    index,
    normalized: normalizeText(fact.text),
    tokens,
    tokenSet: new Set(tokens),
    tf,
    trigrams: charTrigrams(fact.text),
    docLength: Math.max(tokens.length, 1)
  };
}

function buildCorpusStats(factsMeta) {
  const docFreq = new Map();
  let totalLength = 0;

  for (const fact of factsMeta) {
    totalLength += fact.docLength;
    for (const token of fact.tokenSet) {
      docFreq.set(token, (docFreq.get(token) || 0) + 1);
    }
  }

  return {
    docFreq,
    totalDocs: Math.max(factsMeta.length, 1),
    avgDocLength: factsMeta.length ? totalLength / factsMeta.length : 1
  };
}

function bm25Score(queryTokens, fact, stats) {
  const k1 = 1.2;
  const b = 0.75;
  let score = 0;

  for (const term of queryTokens) {
    const tf = fact.tf.get(term) || 0;
    if (!tf) continue;

    const df = stats.docFreq.get(term) || 0;
    const idf = Math.log(1 + (stats.totalDocs - df + 0.5) / (df + 0.5));
    const numerator = tf * (k1 + 1);
    const denominator = tf + k1 * (1 - b + b * (fact.docLength / stats.avgDocLength));
    score += idf * (numerator / denominator);
  }

  return score;
}

function typoSoftMatchScore(queryTokens, factTokens) {
  if (!queryTokens.length || !factTokens.length) return 0;

  let matches = 0;
  for (const queryToken of queryTokens) {
    const hit = factTokens.some((factToken) => {
      if (factToken === queryToken) return true;
      return limitedLevenshtein(queryToken, factToken, 1) <= 1;
    });

    if (hit) matches += 1;
  }

  return matches / queryTokens.length;
}

function lightweightTranslateEnToIt(text) {
  const dictionary = {
    cat: "gatto",
    cats: "gatti",
    kitten: "gattino",
    kittens: "gattini",
    tail: "coda",
    tails: "code",
    whisker: "vibrissa",
    whiskers: "vibrisse",
    sleep: "dormire",
    sleeps: "dorme",
    purr: "fusa",
    paws: "zampe",
    ear: "orecchio",
    ears: "orecchie",
    eyes: "occhi",
    water: "acqua",
    food: "cibo",
    hunt: "caccia"
  };

  // Fallback translation is intentionally lightweight to avoid external API latency/cost.
  const translated = text
    .split(/(\s+)/)
    .map((part) => {
      const normalized = normalizeText(part);
      return dictionary[normalized] || part;
    })
    .join("")
    .trim();

  return `Fatto sui gatti: ${translated}`;
}

export function buildFactsIndex(rawFacts, queryLang) {
  const facts = rawFacts
    .filter((item) => item && typeof item.text === "string" && item.text.trim())
    .map((item, index) => ({
      id: item.id || `fact-${index}`,
      lang: item.lang || "en",
      text: item.text.trim(),
      source: item.source || "unknown"
    }));

  const factsMeta = facts.map((fact, index) => buildDocMeta(fact, index, queryLang));
  const stats = buildCorpusStats(factsMeta);

  return { factsMeta, stats };
}

export function retrieveCandidates(query, indexedFacts, queryLang, preferredLang) {
  const queryTokens = tokenize(query, queryLang);
  const langFiltered = indexedFacts.filter((fact) => fact.lang === preferredLang);
  const corpus = langFiltered.length >= 3 ? langFiltered : indexedFacts;

  if (!queryTokens.length) {
    return {
      queryTokens,
      candidates: corpus.slice(0, Math.min(MAX_CANDIDATES, corpus.length)),
      usedLangPool: langFiltered.length >= 3 ? preferredLang : "mixed"
    };
  }

  const scored = corpus
    .map((fact) => {
      const overlap = queryTokens.filter((token) => fact.tokenSet.has(token)).length;
      const typoScore = typoSoftMatchScore(queryTokens, fact.tokens);
      const lexicalScore = overlap + typoScore * 0.6;
      return { fact, lexicalScore, typoScore };
    })
    .filter((item) => item.lexicalScore > 0)
    .sort((a, b) => b.lexicalScore - a.lexicalScore)
    .slice(0, MAX_CANDIDATES);

  const fallbackCandidates = scored.length
    ? scored
    : corpus
        .map((fact) => ({ fact, lexicalScore: 0, typoScore: 0 }))
        .slice(0, Math.min(MAX_CANDIDATES, corpus.length));

  return {
    queryTokens,
    candidates: fallbackCandidates,
    usedLangPool: langFiltered.length >= 3 ? preferredLang : "mixed"
  };
}

export function rankCandidates(query, retrievalResult, stats, queryLang) {
  const { queryTokens, candidates } = retrievalResult;
  const queryTrigrams = charTrigrams(query);

  const ranked = candidates
    .map(({ fact, lexicalScore, typoScore }) => {
      const bm25 = bm25Score(queryTokens, fact, stats);
      const semantic = cosineSimilarity(queryTrigrams, fact.trigrams);
      const jaccard = jaccardSimilarity(queryTokens, fact.tokens);
      // Weighted final score keeps lexical precision while adding semantic signal.
      const finalScore = bm25 * 0.6 + semantic * 0.3 + jaccard * 0.2 + lexicalScore * 0.1 + typoScore * 0.1;
      return { fact, finalScore, bm25, semantic, queryLang };
    })
    .sort((a, b) => b.finalScore - a.finalScore);

  return ranked;
}

export function sanitizeQuery(rawQuery) {
  const clean = (rawQuery || "").trim();
  const short = clean.slice(0, MAX_QUERY_LEN);
  return short;
}

export function findBestFact(rawQuery, rawFacts) {
  const query = sanitizeQuery(rawQuery);
  const queryLang = detectLanguage(query);
  const preferredLang = queryLang === "it" ? "it" : "en";
  const { factsMeta, stats } = buildFactsIndex(rawFacts, queryLang);

  if (!factsMeta.length) {
    return {
      text: preferredLang === "it" ? "Nessun fatto disponibile al momento." : "No fact available right now.",
      lang: preferredLang,
      reason: "empty-dataset"
    };
  }

  const retrieval = retrieveCandidates(query, factsMeta, queryLang, preferredLang);
  const ranked = rankCandidates(query, retrieval, stats, queryLang);
  const best = ranked[0]?.fact;

  if (!best) {
    return {
      text: preferredLang === "it" ? "Nessuna corrispondenza trovata." : "No matching fact found.",
      lang: preferredLang,
      reason: "no-candidate"
    };
  }

  if (preferredLang === "it" && best.lang !== "it") {
    return {
      // For Italian input, keep language guarantee even when only EN data matches.
      text: lightweightTranslateEnToIt(best.text),
      lang: "it",
      reason: "it-fallback-translation"
    };
  }

  return {
    text: best.text,
    lang: best.lang,
    reason: "ranked-match"
  };
}
