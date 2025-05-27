// @flow
import { Pokemon, POKEMONS } from "../../constants/pokemon";
import calculateMaxHP from "../../lib/calculateMaxHP";

export type RosterEntry = {
  pokemon: Pokemon;
  currentHP: number;
};

export default function generatePlayerRoster(
  roster: Array<keyof POKEMON_LIST>
): Map<string, RosterEntry> {
  const playerRoster = new Map();
  for (let i = 0; i < roster.length; i++) {
    playerRoster.set(POKEMONS[roster[i]].name, {
      pokemon: POKEMONS[roster[i]],
      currentHP: calculateMaxHP(POKEMONS[roster[i]]),
    });
  }
  return playerRoster;
}
