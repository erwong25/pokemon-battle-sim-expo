import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { BULBASAUR, POKEMONS } from "@/constants/pokemon";
import { router } from "expo-router";
import { staticSpriteList } from "@/constants/spritesList";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";

export default function App() {
  const pokemonList = Object.keys(POKEMONS);
  const [roster, setRoster] = useState<Array<string>>([]);
  console.log(roster);
  roster.forEach((item) => {
    console.log(typeof item);
    console.log(POKEMONS[item].staticSprite);
  });

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View>
            {roster.map((item) => (
              <View key={item}>
                <Image source={POKEMONS[item].staticSprite} />
              </View>
            ))}
            <TouchableOpacity
              onPress={() => {
                () => router.push("/about/" + roster.join(","));
              }}
            >
              <Text>Start Battle</Text>
            </TouchableOpacity>
            {roster.length == 0 ? (
              <Text>Choose your starting pokemon</Text>
            ) : roster.length < 6 ? (
              <Text>Choose your next pokemon</Text>
            ) : null}
            {roster.length < 6 &&
              pokemonList
                .filter((pokemon) => !roster.includes(pokemon))
                .map((item) => (
                  <View key={item}>
                    <Image source={POKEMONS[item].staticSprite} />
                    <TouchableOpacity
                      className="bg-white opacity-50"
                      onPress={() => {
                        setRoster([...roster, item]);
                      }}
                    >
                      <Text className="text-red-500 text-lg">
                        {POKEMONS[item].name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
