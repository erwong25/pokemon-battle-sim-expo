import type { Pokemon } from "@/constants/pokemon";

export default function moveSelector(activeOpponentPokemon: Pokemon): number {
  return Math.floor(Math.random() * activeOpponentPokemon.moves.length);
}
