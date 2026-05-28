import { matchesAcceptedAnswer, normalizeText } from "../packages/core/utils/index.js";

const examples = {
  trim: normalizeText("  generous  "),
  caseInsensitive: matchesAcceptedAnswer("GENEROUS", "generous"),
  expectedString: matchesAcceptedAnswer("reliable", "reliable"),
  expectedVariants: matchesAcceptedAnswer("dependable", ["reliable", "dependable"]),
  nonMatch: matchesAcceptedAnswer("selfish", ["generous", "reliable"]),
  accentsAreNotRemoved: matchesAcceptedAnswer("serieuses", "sérieuses")
};

console.log(JSON.stringify(examples, null, 2));
