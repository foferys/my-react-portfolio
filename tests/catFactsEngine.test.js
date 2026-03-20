import test from "node:test";
import assert from "node:assert/strict";
import { detectLanguage, findBestFact, rankCandidates, retrieveCandidates, buildFactsIndex } from "../src/utils/catFactsEngine.js";

test("detectLanguage returns it for Italian query", () => {
  const lang = detectLanguage("i gatti fanno le fusa quando sono tranquilli");
  assert.equal(lang, "it");
});

test("detectLanguage returns en for English query", () => {
  const lang = detectLanguage("cats use whiskers to measure spaces");
  assert.equal(lang, "en");
});

test("ranking prioritizes semantically close candidate", () => {
  const facts = [
    { id: "f1", lang: "en", text: "Cats use their tails to keep balance while jumping." },
    { id: "f2", lang: "en", text: "Some cats have polydactyl paws with extra toes." },
    { id: "f3", lang: "en", text: "Cats sleep many hours during the day." }
  ];

  const { factsMeta, stats } = buildFactsIndex(facts, "en");
  const retrieval = retrieveCandidates("tail balance jump", factsMeta, "en", "en");
  const ranked = rankCandidates("tail balance jump", retrieval, stats, "en");

  assert.equal(ranked[0].fact.id, "f1");
});

test("Italian fallback translates English best match when no Italian facts exist", () => {
  const onlyEnglishFacts = [
    { id: "e1", lang: "en", text: "Cats purr when they feel calm and safe." },
    { id: "e2", lang: "en", text: "A cat tail can signal confidence." }
  ];

  const result = findBestFact("fusa gatto tranquillo", onlyEnglishFacts);

  assert.equal(result.lang, "it");
  assert.equal(result.reason, "it-fallback-translation");
  assert.match(result.text, /^Fatto sui gatti:/);
});

test("question about cats talking returns a sensible communication answer", () => {
  const facts = [
    { id: "it-1", lang: "it", text: "I gatti comunicano anche con la posizione della coda: alta indica sicurezza." },
    { id: "it-2", lang: "it", text: "I gatti usano miagolii diversi per interagire con gli esseri umani." },
    { id: "it-3", lang: "it", text: "I gatti dormono molte ore per conservare energia." }
  ];

  const result = findBestFact("i gatti parlano?", facts);

  assert.equal(result.lang, "it");
  assert.equal(result.reason, "topic-communication");
  assert.match(result.text, /non parlano/i);
  assert.match(result.text, /comunicano|miagolii/i);
});

test("question about sleeping gets a natural answer instead of a raw fact dump", () => {
  const facts = [
    { id: "it-1", lang: "it", text: "I gatti dormono molte ore per conservare energia da predatori naturali." },
    { id: "it-2", lang: "it", text: "I gatti usano miagolii diversi per interagire con gli esseri umani." }
  ];

  const result = findBestFact("i gatti dormono tanto?", facts);

  assert.equal(result.lang, "it");
  assert.equal(result.reason, "topic-sleep");
  assert.match(result.text, /^Si, di solito dormono molto:/);
});
