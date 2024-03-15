export interface GetPokemonListDTO {
  count: number;
  next: string;
  previous: string;
  results: GetPokemonWithNameDTO[];
}

export interface GetPokemonWithNameDTO {
  name: string;
  url: string;
}

export interface GetPokemonDTO {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: GetPokemonWithNameDTO[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  sprites: PokemonSprites;
  cries: PokemonCries;
  species: GetPokemonWithNameDTO;
  stats: PokemonStat[];
  types: PokemonType[];
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: GetPokemonWithNameDTO;
}

interface VersionGameIndex {
  game_index: number;
  version: GetPokemonWithNameDTO;
}

interface PokemonHeldItem {
  item: GetPokemonWithNameDTO;

  version_details: PokemonHeldItemVersion[];
}

interface PokemonHeldItemVersion {
  version: GetPokemonWithNameDTO;
  rarity: number;
}

interface PokemonMove {
  move: GetPokemonWithNameDTO;
  version_group_details: PokemonMoveVersion[];
}

interface PokemonMoveVersion {
  move_learn_method: GetPokemonWithNameDTO;
  version_group: GetPokemonWithNameDTO;
  level_learned_at: number;
}

interface PokemonTypePast {
  generation: GetPokemonWithNameDTO;
  types: PokemonType;
}

interface PokemonType {
  slot: number;
  type: GetPokemonWithNameDTO;
}

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
  other: PokemonSpritesOther;
}

interface PokemonSpritesOther {
  dream_world: PokemonSprites;
  official_artwork: PokemonSprites;
  showdow: PokemonSprites;
  home: PokemonSprites;
}

interface PokemonCries {
  latest: string;
  legacy: string;
}

interface PokemonStat {
  stat: GetPokemonWithNameDTO;
  effort: number;
  base_stat: number;
}
