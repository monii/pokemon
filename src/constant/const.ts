interface TypeColor {
  [key: string]: string; //[Error] TypeScript : Element implicitly has an 'any' type because expression of type 'string' can't be used to index
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
