import { GetPokemonWithNameDTO } from "./pokemon";

export interface GetPokemonSpeciesDTO {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: GetPokemonWithNameDTO;
  pokedex_numbers: PokemonSpeciesDexEntry[];
  egg_groups: GetPokemonWithNameDTO[];
  color: GetPokemonWithNameDTO;
  shape: GetPokemonWithNameDTO;
  evolves_from_species: GetPokemonWithNameDTO;
  evolution_chain: EvolutionChain;
  habitat: GetPokemonWithNameDTO;
  generation: GetPokemonWithNameDTO;
  names: Name[];
  pal_park_encounters: PalParkEncounterArea[];
  flavor_text_entries: FlavorText[];
  form_descriptions: Description[];
  genera: Genus[];
  varieties: PokemonSpeciesVariety[];
}

export interface Name {
  name: string;
  language: GetPokemonWithNameDTO;
}

interface PokemonSpeciesDexEntry {
  entry_number: number;
  pokedex: GetPokemonWithNameDTO;
}

interface PalParkEncounterArea {
  base_score: number;
  rate: number;
  area: GetPokemonWithNameDTO;
}

interface FlavorText {
  flavor_text: string;
  language: GetPokemonWithNameDTO;
  version: GetPokemonWithNameDTO;
}

interface Description {
  description: string;
  language: GetPokemonWithNameDTO;
}

interface Genus {
  genus: string;
  language: GetPokemonWithNameDTO;
}

interface PokemonSpeciesVariety {
  is_default: boolean;
  pokemon: GetPokemonWithNameDTO;
}

interface EvolutionChain {
    url:string;
}
