// import calculateMaxHP from "@/app/lib/calculateMaxHP";
// import { RosterEntry } from "@/app/lib/generatePlayerRoster";
// import { POKEMON_LIST } from "@/app/lib/pokemon";
// import Image from "next/image";
import calculateMaxHP from "@/lib/calculateMaxHP";
import { RosterEntry } from "./generatePlayerRoster";
import { POKEMON_LIST } from "@/constants/pokemon";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

export default function generatePartyButtons(
  playerRosterHP: Map<string, RosterEntry>,
  onMouseOver: (partyPokemon: RosterEntry) => void,
  onClick: (item: string) => void
): React.ReactNode {
  const placeholderParty = [];
  for (let i = 0; i < 6 - playerRosterHP.size; i++) {
    placeholderParty.push(
      <View
        key={`placeholderParty${i}`}
        className="bg-gray-600 flex h-28 rounded-md rounded-tl-3xl w-[300px]"
      ></View>
    );
  }
  return (
    <View className="bg-red-600 w-fit flex grid grid-cols-2 gap-4 p-4 pt-0 mx-auto">
      {Array.from(playerRosterHP.keys()).map((item) => {
        const partyPokemon = playerRosterHP.get(item);
        if (partyPokemon == null) {
          return null;
        }
        const partyPokemonHP = playerRosterHP.get(item)?.currentHP;
        if (partyPokemonHP == null) {
          return null;
        }
        return (
          <Pressable
            key={`${item}`}
            onMouseOver={() => onMouseOver(partyPokemon)}
            onClick={() => onClick(item)}
            className="bg-blue-600 hover:bg-green-700 hover:shadow-xl transform hover:-translate-x-1 hover:-translate-y-1 hover:scale-[1.01] flex flex-row h-28 rounded-md rounded-tl-3xl w-[300px]"
          >
            <View className="bg-white flex items-center m-auto w-[100px]">
              <Image
                source={partyPokemon.pokemon.staticSprite}
                style={{ width: 130, height: 84 }}
                alt=""
              />
            </View>
            <View className="bg-green-600 flex justify-center w-[180px] p-[20px]">
              <Text className="flex justify-start">
                {partyPokemon.pokemon.name}
              </Text>
              <View className="w-[140px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <View
                  style={{
                    width: `${
                      (partyPokemonHP / calculateMaxHP(partyPokemon.pokemon)) *
                      100
                    }%`,
                  }}
                  className={`bg-orange-600 h-2.5 rounded-full`}
                ></View>
              </View>
              <Text className="flex justify-end">
                {partyPokemonHP}/{calculateMaxHP(partyPokemon.pokemon)}
              </Text>
            </View>
          </Pressable>
        );
      })}
      {placeholderParty}
    </View>
  );
}
