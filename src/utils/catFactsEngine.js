const EN_STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "have", "in", "is", "it", "its", "of", "on", "or", "that", "the", "to", "was", "were", "with", "you", "your"
]);

const IT_STOPWORDS = new Set([
  "a", "ad", "al", "alla", "allo", "anche", "con", "da", "dei", "del", "della", "delle", "di", "e", "gli", "ha", "i", "il", "in", "la", "le", "ma", "nei", "nel", "nella", "o", "per", "piu", "su", "tra", "un", "una"
]);

const IT_HINTS = ["zione", "zioni", "mente", "gli", "che", "non", "gatto", "gatti", "coda", "miagolio", "fusa"];

const MAX_QUERY_LEN = 140;
const MAX_CANDIDATES = 25;
const QUESTION_STARTERS = {
  it: [/^(chi|cosa|come|perche|quando|dove|quale|quali|quanto|quanti|quante)\b/u],
  en: [/^(who|what|how|why|when|where|which|can|do|does|are|is)\b/i]
};

const QUERY_TOPICS = [
  {
    key: "communication",
    queryPatterns: {
      it: [/\bparl\w*/u, /\bcomunic\w*/u, /\bmiagol\w*/u, /\bvoce\b/u],
      en: [/\btalk\w*/i, /\bspeak\w*/i, /\bcommunicat\w*/i, /\bmeow\w*/i, /\bvoice\b/i]
    },
    factPatterns: [/\bmiagol\w*/u, /\binterag\w*/u, /\bcommunicat\w*/i, /\bmeow\w*/i, /\bvocal\w*/i, /\bvoice\b/i],
    answerTemplates: {
      it: (factText) => `Non parlano come gli esseri umani, ma comunicano eccome: ${toSentenceFragment(factText)}`,
      en: (factText) => `Not in the human sense, but they do communicate: ${toSentenceFragment(factText)}`
    }
  },
  {
    key: "sleep",
    queryPatterns: {
      it: [/\bdorm\w*/u, /\bripos\w*/u, /\bsonn\w*/u],
      en: [/\bsleep\w*/i, /\bnap\w*/i, /\brest\w*/i]
    },
    factPatterns: [/\bdorm\w*/u, /\bsleep\w*/i, /\bnap\w*/i, /\brest\w*/i, /\benergy\b/i, /\benergia\b/u],
    answerTemplates: {
      it: (factText) => `Si, di solito dormono molto: ${toSentenceFragment(factText)}`,
      en: (factText) => `Yes, they usually sleep a lot: ${toSentenceFragment(factText)}`
    }
  },
  {
    key: "tail",
    queryPatterns: {
      it: [/\bcod\w*/u, /\bequilibri\w*/u],
      en: [/\btail\w*/i, /\bbalance\w*/i]
    },
    factPatterns: [/\bcod\w*/u, /\btail\w*/i, /\bbalance\b/i, /\bsicurezza\b/u, /\bconfidence\b/i],
    answerTemplates: {
      it: (factText) => `Si, e la coda puo dire molto del loro stato d'animo: ${toSentenceFragment(factText)}`,
      en: (factText) => `Yes, and their tail can say a lot about how they feel: ${toSentenceFragment(factText)}`
    }
  },
  {
    key: "whiskers",
    queryPatterns: {
      it: [/\bvibriss\w*/u, /\bbaff\w*/u, /\bspaz\w*/u],
      en: [/\bwhisker\w*/i, /\bspace\w*/i, /\bnarrow\b/i]
    },
    factPatterns: [/\bvibriss\w*/u, /\bwhisker\w*/i, /\bspaz\w*/u, /\bspace\w*/i, /\bnarrow\b/i],
    answerTemplates: {
      it: (factText) => `Le vibrisse non sono solo baffi: ${toSentenceFragment(factText)}`,
      en: (factText) => `Whiskers are more than just cat moustaches: ${toSentenceFragment(factText)}`
    }
  },
  {
    key: "purr",
    queryPatterns: {
      it: [/\bfus\w*/u, /\bcalm\w*/u, /\btranquill\w*/u],
      en: [/\bpurr\w*/i, /\bcalm\w*/i, /\brelax\w*/i]
    },
    factPatterns: [/\bfus\w*/u, /\bpurr\w*/i, /\bcalm\w*/i, /\btranquill\w*/u],
    answerTemplates: {
      it: (factText) => `Spesso si, soprattutto quando si sentono tranquilli: ${toSentenceFragment(factText)}`,
      en: (factText) => `Often yes, especially when they feel safe or relaxed: ${toSentenceFragment(factText)}`
    }
  },
  {
    key: "water",
    queryPatterns: {
      it: [/\bacqua\b/u, /\bciotol\w*/u, /\bbev\w*/u],
      en: [/\bwater\b/i, /\bbowl\w*/i, /\bdrink\w*/i]
    },
    factPatterns: [/\bacqua\b/u, /\bwater\b/i, /\bciotol\w*/u, /\bbowl\w*/i, /\bcibo\b/u, /\bfood\b/i],
    answerTemplates: {
      it: (factText) => `Molti gatti sono abbastanza selettivi con l'acqua: ${toSentenceFragment(factText)}`,
      en: (factText) => `Many cats are surprisingly picky about water: ${toSentenceFragment(factText)}`
    }
  }
];

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

function toSentenceFragment(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) return trimmed;
  return `${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}`;
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

function isQuestionLike(query, lang) {
  const raw = query || "";
  const normalized = normalizeText(raw);
  if (!normalized) return false;
  if (raw.includes("?")) return true;

  return (QUESTION_STARTERS[lang] || QUESTION_STARTERS.en).some((pattern) => pattern.test(normalized));
}

function detectTopic(query, lang) {
  const normalized = normalizeText(query);
  if (!normalized) return null;

  return (
    QUERY_TOPICS.find((topic) => (topic.queryPatterns[lang] || topic.queryPatterns.en).some((pattern) => pattern.test(normalized))) ||
    null
  );
}

function factMatchesTopic(fact, topic) {
  const normalizedFact = normalizeText(fact?.text || "");
  return topic.factPatterns.some((pattern) => pattern.test(normalizedFact));
}

function selectTopicAwareMatch(ranked, topic) {
  if (!topic) return ranked[0] || null;
  return ranked.find(({ fact }) => factMatchesTopic(fact, topic)) || ranked[0] || null;
}

function composeAnswer({ query, factText, answerLang, topic, finalScore }) {
  const questionLike = isQuestionLike(query, answerLang);

  if (topic && questionLike) {
    const template = topic.answerTemplates[answerLang] || topic.answerTemplates.en;
    if (template) {
      return {
        text: template(factText),
        reason: `topic-${topic.key}`
      };
    }
  }

  if (questionLike) {
    if (finalScore < 0.08) {
      return {
        text:
          answerLang === "it"
            ? `Non ho una risposta precisa su questo, ma un fatto collegato e questo: ${factText}`
            : `I do not have an exact answer for that, but a related cat fact is this: ${factText}`,
        reason: "question-low-confidence"
      };
    }

    return {
      text: answerLang === "it" ? `Da quello che so, ${toSentenceFragment(factText)}` : `From what I know, ${toSentenceFragment(factText)}`,
      reason: "question-answer"
    };
  }

  return null;
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
  const topic = detectTopic(query, queryLang);
  const selectedMatch = selectTopicAwareMatch(ranked, topic);
  const best = selectedMatch?.fact;

  if (!best) {
    return {
      text: preferredLang === "it" ? "Nessuna corrispondenza trovata." : "No matching fact found.",
      lang: preferredLang,
      reason: "no-candidate"
    };
  }

  const translatedText = preferredLang === "it" && best.lang !== "it" ? lightweightTranslateEnToIt(best.text) : best.text;
  const answerLang = preferredLang === "it" || best.lang === preferredLang ? preferredLang : best.lang;
  const composed = composeAnswer({
    query,
    factText: translatedText,
    answerLang,
    topic,
    finalScore: selectedMatch?.finalScore || 0
  });

  if (composed) {
    return {
      text: composed.text,
      lang: answerLang,
      reason: composed.reason
    };
  }

  if (preferredLang === "it" && best.lang !== "it") {
    return {
      // For Italian input, keep language guarantee even when only EN data matches.
      text: translatedText,
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
