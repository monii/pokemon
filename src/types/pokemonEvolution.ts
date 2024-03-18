import { GetPokemonWithNameDTO } from "./pokemon";

export interface GetEvolutionChainsDTO {
  id: number;
  baby_trigger_item: GetPokemonWithNameDTO;
  chain: ChainLink;
}

export interface ChainLink {
  is_baby: boolean;
  species: GetPokemonWithNameDTO;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

interface EvolutionDetail {
  item: GetPokemonWithNameDTO;
  trigger: GetPokemonWithNameDTO;
  gender: number;
  held_item: GetPokemonWithNameDTO;
  known_move: GetPokemonWithNameDTO;
  known_move_type: GetPokemonWithNameDTO;
  location: GetPokemonWithNameDTO;
  min_level: number;
  min_happiness: number;
  min_beauty: number;
  min_affection: number;
  needs_overworld_rain: boolean;
  party_species: GetPokemonWithNameDTO;
  party_type: GetPokemonWithNameDTO;
  relative_physical_stats: number;
  time_of_day: string;
  trade_species: GetPokemonWithNameDTO;
  turn_upside_down: boolean;
}
