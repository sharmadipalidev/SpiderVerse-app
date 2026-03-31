export const COLORS = {
  background: '#18181b', // zinc-900
  card: '#27272a',       // zinc-800
  text: '#fafafa',       // zinc-50
  subtext: '#a1a1aa',    // zinc-400
  border: '#3f3f46',     // zinc-700
  accentYellow: '#facc15', // yellow-400
  accentEmerald: '#34d399', // emerald-400

  // Type colors
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  steel: '#B7B7CE',
  fairy: '#D685AD',
} as const;

export type ColorPalette = typeof COLORS;
export type ColorKey = keyof ColorPalette;
