import { View, Text, Pressable, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import MoveButtonSection from "@/components/MoveButtonSection";
import PartyButtonSection from "@/components/PartyButtonSection";
import generatePlayerRoster from "@/components/generatePlayerRoster";
import { POKEMONS, POKEMON_LIST } from "@/constants/pokemon";
import { RosterEntry } from "@/components/generatePlayerRoster";
import { Move } from "@/constants/moves";
import { DisplayContent } from "@/components/generateDisplayArea";
import StandardButton from "@/components/StandardButton";

const infoPage = () => {
  const rawRoster = ["BULBASAUR", "IVYSAUR"];
  const roster = rawRoster.filter((pokemon) =>
    Object.keys(POKEMONS).includes(pokemon)
  ) as Array<keyof POKEMON_LIST>;
  const playerRoster = generatePlayerRoster(roster);
  const [activePlayerRosterIdentifier, setActivePlayerRosterIdentifier] =
    useState(POKEMONS[roster[0]].name);
  const [displayArea, setDisplayArea] = useState<DisplayContent | null>(null);

  function handleMoveOnClick(selectedMove: Move) {}

  function handlePartyOnClick(item: string) {}
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
          <View>
            <Pressable className="bg-orange-600" onPress={() => router.back()}>
              <Text className="text-white">Back</Text>
            </Pressable>
          </View>
          <View className="flex flex-row bg-green-600 justify-center h-[300px]"></View>
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
