import type { Move } from "@/constants/moves";
import calculateMaxHP from "@/lib/calculateMaxHP";
import { RosterEntry } from "./generatePlayerRoster";
import { Text, View } from "react-native";

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
        <Text>{displayArea.move.name}</Text>
        <View className="flex flex-row">
          <Text
            className={`bg-${displayArea.move.type} w-20 flex justify-center text-white`}
          >
            {displayArea.move.type}
          </Text>
          <Text className="bg-gray-500 w-20 flex justify-center mx-4 text-white">
            {displayArea.move.damageCategory}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="w-20">Power: {displayArea.move.power}</Text>
          <Text className="mx-2">
            Accuracy: {displayArea.move.accuracy * 100}%
          </Text>
        </View>
      </View>
    );
  } else if (displayArea.rosterEntry != null) {
    return (
      <View>
        <Text>{displayArea.rosterEntry.pokemon.name}</Text>
        <View className="flex flex-row">
          <Text
            className={`bg-${displayArea.rosterEntry.pokemon.types[0]} w-20 flex justify-center text-white`}
          >
            {displayArea.rosterEntry.pokemon.types[0]}
          </Text>
          <Text
            className={`bg-${displayArea.rosterEntry.pokemon.types[1]} w-20 mx-4 flex justify-center text-white`}
          >
            {displayArea.rosterEntry.pokemon.types[1]}
          </Text>
        </View>
        <hr></hr>
        <Text>Stats:</Text>
        <Text>
          HP: {displayArea.rosterEntry.currentHP}/
          {calculateMaxHP(displayArea.rosterEntry.pokemon)}
        </Text>
        <Text>Attack: {displayArea.rosterEntry.pokemon.stats.atk}</Text>
        <Text>Defense: {displayArea.rosterEntry.pokemon.stats.def}</Text>
        <Text>Sp. Attack: {displayArea.rosterEntry.pokemon.stats.spAtk}</Text>
        <Text>Sp. Defense: {displayArea.rosterEntry.pokemon.stats.spDef}</Text>
        <Text>Speed: {displayArea.rosterEntry.pokemon.stats.sp}</Text>
        <hr></hr>
        <Text>Moves:</Text>
        <Text>{displayArea.rosterEntry.pokemon.moves[0]?.name}</Text>
        <Text>{displayArea.rosterEntry.pokemon.moves[1]?.name}</Text>
        <Text>{displayArea.rosterEntry.pokemon.moves[2]?.name}</Text>
        <Text>{displayArea.rosterEntry.pokemon.moves[3]?.name}</Text>
      </View>
    );
  }
}
