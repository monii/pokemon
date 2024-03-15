import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      fire: string;
      grass: string;
      electric: string;
      water: string;
      ground: string;
      rock: string;
      fairy: string;
      poison: string;
      bug: string;
      dragon: string;
      psychic: string;
      flying: string;
      fighting: string;
      normal: string;
      ice: string;
      dark: string;
      ghost: string;
      steel: string;
    },
    default: {
      white: string;
    }
  }
}
