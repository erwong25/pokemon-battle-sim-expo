import type { Move } from "@/constants/moves";
import type { Pokemon } from "@/constants/pokemon";
import calculateMaxHP from "@/lib/calculateMaxHP";
import { RosterEntry } from "./generatePlayerRoster";
import { View } from "react-native";

const colorVariants = {
  Normal: "bg-Normal",
  Fighting: "bg-Fighting",
  Flying: "bg-Flying",
  Poison: "bg-Poison",
  Ground: "bg-Ground",
  Rock: "bg-Rock",
  Bug: "bg-Bug",
  Ghost: "bg-Ghost",
  Steel: "bg-Steel",
  Water: "bg-Water",
  Fire: "bg-Fire",
  Grass: "bg-Grass",
  Electric: "bg-Electric",
  Psychic: "bg-Psychic",
  Ice: "bg-Ice",
  Dragon: "bg-Dragon",
  Dark: "bg-Dark",
  Fairy: "bg-Fairy",
};

export type DisplayContent = {
  move?: Move;
  rosterEntry?: RosterEntry;
};

export default function generateDisplayArea(
  displayArea?: DisplayContent | null
): React.ReactNode {
  if (displayArea == null) return;
  if (displayArea.move != null) {
    return (
      <View>
        <View>{displayArea.move.name}</View>
        <View className="flex">
          <View
            className={`bg-${displayArea.move.type} w-20 flex justify-center text-white`}
          >
            {displayArea.move.type}
          </View>
          <View className="bg-gray-500 w-20 flex justify-center mx-4 text-white">
            {displayArea.move.damageCategory}
          </View>
        </View>
        <View className="flex">
          <View>Power: {displayArea.move.power}</View>
          <View className="mx-4">
            Accuracy: {displayArea.move.accuracy * 100}%
          </View>
        </View>
      </View>
    );
  } else if (displayArea.rosterEntry != null) {
    return (
      <View>
        <View>{displayArea.rosterEntry.pokemon.name}</View>
        <View className="flex">
          <View
            className={`bg-${displayArea.rosterEntry.pokemon.types[0]} w-20 flex justify-center text-white`}
          >
            {displayArea.rosterEntry.pokemon.types[0]}
          </View>
          <View
            className={`bg-${displayArea.rosterEntry.pokemon.types[1]} w-20 mx-4 flex justify-center text-white`}
          >
            {displayArea.rosterEntry.pokemon.types[1]}
          </View>
        </View>
        <hr></hr>
        <View>Stats:</View>
        <View>
          HP: {displayArea.rosterEntry.currentHP}/
          {calculateMaxHP(displayArea.rosterEntry.pokemon)}
        </View>
        <View>Attack: {displayArea.rosterEntry.pokemon.stats.atk}</View>
        <View>Defense: {displayArea.rosterEntry.pokemon.stats.def}</View>
        <View>Sp. Attack: {displayArea.rosterEntry.pokemon.stats.spAtk}</View>
        <View>Sp. Defense: {displayArea.rosterEntry.pokemon.stats.spDef}</View>
        <View>Speed: {displayArea.rosterEntry.pokemon.stats.sp}</View>
        <hr></hr>
        <View>Moves:</View>
        <View>{displayArea.rosterEntry.pokemon.moves[0]?.name}</View>
        <View>{displayArea.rosterEntry.pokemon.moves[1]?.name}</View>
        <View>{displayArea.rosterEntry.pokemon.moves[2]?.name}</View>
        <View>{displayArea.rosterEntry.pokemon.moves[3]?.name}</View>
      </View>
    );
  }
}
