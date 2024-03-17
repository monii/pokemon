interface TypeColor {
  [key: string]: string; //[Error] TypeScript : Element implicitly has an 'any' type because expression of type 'string' can't be used to index
}

interface PokemonTypes {
  [key: string]: string;
}

export const COLORS: TypeColor = {
  fire: "#ffa500",
  grass: "#90ee90",
  electric: "#ffff00",
  water: "#70ffea",
  ground: "#a9a9a9",
  rock: "#808080",
  fairy: "#ffc0cb",
  poison: "#adff2f",
  bug: "#94ecbe",
  dragon: "#ffa500",
  psychic: "#7c7db6",
  flying: "#fcca46",
  fighting: "#a9a9a9",
  normal: "#d3d3d3",
  ice: "#00f2f2",
  dark: "#4f7ecf",
  ghost: "#7685a7",
  steel: "#4682b4",
  default: "#fff",
};

export const POKEMON_TYPES: PokemonTypes = {
  normal: "노말",
  fighting: "격투",
  flying: "비행",
  poison: "독",
  ground: "땅",
  rock: "바위",
  bug: "벌레",
  ghost: "고스트",
  steel: "강철",
  fire: "불꽃",
  water: "물",
  grass: "풀",
  electric: "전기",
  psychic: "에스퍼",
  ice: "얼음",
  dragon: "드래곤",
  dark: "악",
  fairy: "페어리",
  shadow: "다크",
  unknown: "???",
};


export const LIST_LIMIT = 20;

export const DEFAULT_LANGUAGE = "ko"
