import type { SpiderHero } from "../types/types";
import { fetchSpiderVerseData } from "./data/SpiderVerse";

export const getSpiderHeroes = async (): Promise<SpiderHero[]> => {
  const spiderVerseData = await fetchSpiderVerseData();
  return spiderVerseData.characters.map((character, index) => ({
    ...character,
    id: `${character.earth || character.universe || "unknown"}-${character.name}-${index}`
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-"),
  }));
};
