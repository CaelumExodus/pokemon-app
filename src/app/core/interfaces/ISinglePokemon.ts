import { IPokemonType } from "./IPokemonType";

export interface ISinglePokemon {
  name: string;
  id: number;
  types: IPokemonType[];
  sprites: {
    front_default: string;
  }
}