import { COLORS } from "../constant/const";
import { ChainLink } from "../types/pokemonEvolution";

export const convertId = (id: number = 0): string => {
  let newId;
  if (id < 10) {
    newId = `#00${id}`;
    return newId;
  } else if (id < 100) {
    newId = `#0${id}`;
    return newId;
  } else {
    newId = `#${id}`;
    return newId;
  }
};

export const convertToNumber = (target: string | undefined): number => {
  if (!target) {
    return 1;
  } else {
    return Number(target);
  }
};

export const findColorByType = (typeName: string): string => {
  return COLORS[typeName];
};

export const splitString = (
  targetString: string,
  separator: string
): string[] => {
  return targetString.split(separator);
};

export const getEvolutionChainWidthId = (evolutionTo: ChainLink): number[] => {
  const evolutionIds = [];
  let nextEvolution: ChainLink = evolutionTo;
  do {
    const pokemonId = splitString(nextEvolution.species.url, "/").at(-2);
    evolutionIds.push(convertToNumber(pokemonId));
    nextEvolution = nextEvolution["evolves_to"][0];
  } while (!!nextEvolution && nextEvolution.hasOwnProperty("evolves_to"));
  return evolutionIds;
};
