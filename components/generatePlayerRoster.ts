// @flow
import { Pokemon, POKEMONS } from "../constants/pokemon";
import calculateMaxHP from "./calculateMaxHP";

export type RosterEntry = {
  pokemon: Pokemon;
  currentHP: number;
};

export default function generatePlayerRoster(
  roster: Array<string>
): Map<string, RosterEntry> {
  const playerRoster = new Map();
  for (let i = 0; i < roster.length; i++) {
    playerRoster.set("pokemon" + (i + 1), {
      pokemon: POKEMONS[roster[i]],
      currentHP: calculateMaxHP(POKEMONS[roster[i]]),
    });
  }
  return playerRoster;
}
