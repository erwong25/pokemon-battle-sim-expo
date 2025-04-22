import { View, Text, Pressable, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import MoveButtonSection from "@/components/MoveButtonSection";
import PartyButtonSection from "@/components/PartyButtonSection";
import generatePlayerRoster from "@/components/generatePlayerRoster";
import { MEWTWO, POKEMONS, POKEMON_LIST } from "@/constants/pokemon";
import { RosterEntry } from "@/components/generatePlayerRoster";
import { Move } from "@/constants/moves";
import { DisplayContent } from "@/components/generateDisplayArea";
import calculateMaxHP from "@/lib/calculateMaxHP";

const infoPage = () => {
  const rawRoster = ["BULBASAUR", "IVYSAUR", "MOLTRES", "MEWTWO"];
  const roster = rawRoster.filter((pokemon) =>
    Object.keys(POKEMONS).includes(pokemon)
  ) as Array<keyof POKEMON_LIST>;
  const playerRoster = generatePlayerRoster(roster);
  const [activePlayerRosterIdentifier, setActivePlayerRosterIdentifier] =
    useState(POKEMONS[roster[0]].name);
  // const [displayType, setDisplayType] = useState('Party')
  const [displayMove, setDisplayMove] = useState<Move | null>(null);
  const [displayArea, setDisplayArea] = useState<DisplayContent | null>(null);

  const activePlayerPokemon = playerRoster.get(
    activePlayerRosterIdentifier
  )?.pokemon;

  function handleMoveOnClick(selectedMove: Move) {
    // setDisplayType('Move')
    setDisplayMove(selectedMove);
  }

  function handlePartyOnClick(item: string) {
    // setDisplayType('Party')
    setActivePlayerRosterIdentifier(item);
    setDisplayMove(null);
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
          <View>
            <Pressable className="bg-orange-600" onPress={() => router.back()}>
              <Text className="text-white">Back</Text>
            </Pressable>
          </View>
          <View className="flex flex-row bg-green-600 justify-center h-[300px] w-screen">
            <View className="flex-1 bg-red-600 w-fit h-fit m-2">
              <Image
                source={activePlayerPokemon?.staticSprite}
                style={{ width: 130, height: 100 }}
                alt=""
              />
              <Text>{activePlayerPokemon?.name}</Text>
              <View className="flex flex-row">
                <View
                  className={`bg-${activePlayerPokemon?.types[0]} flex flex-row w-20 justify-center`}
                >
                  <Text className="text-white">
                    {activePlayerPokemon?.types[0]}
                  </Text>
                </View>
                <View
                  className={`bg-${activePlayerPokemon?.types[1]} w-20 mx-4 flex flex-row justify-center`}
                >
                  <Text className="text-white">
                    {activePlayerPokemon?.types[1]}
                  </Text>
                </View>
              </View>
              <Text>Stats:</Text>
              <Text>HP: {calculateMaxHP(activePlayerPokemon)}</Text>
              <Text>Attack: {activePlayerPokemon?.stats.atk}</Text>
              <Text>Defense: {activePlayerPokemon?.stats.def}</Text>
              <Text>Sp. Attack: {activePlayerPokemon?.stats.spAtk}</Text>
              <Text>Sp. Defense: {activePlayerPokemon?.stats.spDef}</Text>
              <Text>Speed: {activePlayerPokemon?.stats.sp}</Text>
            </View>
            <View className="flex-1 bg-blue-600 w-fit h-fit m-2">
              {displayMove !== null && (
                <View>
                  <Text>{displayMove.name}</Text>
                  <View className="flex flex-row">
                    <Text
                      className={`bg-${displayMove.type} w-20 flex justify-center text-white`}
                    >
                      {displayMove.type}
                    </Text>
                    <Text className="bg-gray-500 w-20 flex justify-center mx-4 text-white">
                      {displayMove.damageCategory}
                    </Text>
                  </View>
                  <View className="flex flex-row">
                    <Text className="w-20">Power: {displayMove.power}</Text>
                    <Text className="mx-2">
                      Accuracy: {displayMove.accuracy * 100}%
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View className="flex flex-row bg-yellow-600 justify-center">
            <View className="bg-pink-600 w-[650px] mr-1">
              <Text className="absolute">Select Move:</Text>
              <MoveButtonSection
                activePokemon={playerRoster.get(activePlayerRosterIdentifier)}
                onMouseOver={(item: Move) => setDisplayArea({ move: item })}
                onClick={(item) => handleMoveOnClick(item)}
                remainingOpponentPokemon={1}
              />
              <View className="">
                <Text>Switch:</Text>
              </View>
              <PartyButtonSection
                playerRosterHP={playerRoster}
                onMouseOver={(partyPokemon: RosterEntry) =>
                  setDisplayArea({ rosterEntry: partyPokemon })
                }
                onClick={(item) => handlePartyOnClick(item)}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default infoPage;
