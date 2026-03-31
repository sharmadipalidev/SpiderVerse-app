import { COLORS, ColorKey } from './colors';

export const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'steel', 'fairy'
] as const;

export type PokemonType = typeof POKEMON_TYPES[number];

export const getTypeColor = (type: string): string => {
  const normalizedType = type.toLowerCase();

  if (normalizedType in COLORS) {
    return COLORS[normalizedType as ColorKey];
  }

  return COLORS.subtext;
};
