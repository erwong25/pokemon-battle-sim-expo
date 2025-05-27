import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Pressable,
} from "react-native";
import { BULBASAUR, POKEMONS } from "@/constants/pokemon";
import { Link, useRouter } from "expo-router";
import { staticSpriteList } from "@/constants/spritesList";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";
import { Image } from "expo-image";
import { Image as ReactImage } from "react-native";
import calculateMaxHP from "@/lib/calculateMaxHP";
import StandardButton from "@/components/StandardButton";
import RosterWindow from "@/components/indexUI/rosterWindow";

export default function App() {
  const pokemonList = Object.keys(POKEMONS);
  const [roster, setRoster] = useState<Array<string>>([]);
  const router = useRouter();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <RosterWindow roster={roster} />
        <ScrollView>
          <StandardButton
            title="Start Battle"
            handlePress={
              () =>
                router.push({
                  pathname: "/battle",
                  params: { user: "john_doe", age: 30 },
                })
              // () => router.push("/battle/" + roster.join(","));
            }
          />
          {/* <StandardButton
            title="Test"
            handlePress={
              () =>
                router.push({
                  pathname: "/test",
                  params: { user: "john_doe", age: 30 },
                })
            }
          /> */}
          {roster.length == 0 ? (
            <Text>Choose your starting pokemon</Text>
          ) : roster.length < 6 ? (
            <Text>Choose your next pokemon</Text>
          ) : null}
          <View className="flex flex-row flex-wrap justify-center">
            {roster.length < 6 &&
              pokemonList
                .filter((pokemon) => !roster.includes(pokemon))
                .map((item) => (
                  <View key={item} className="m-1">
                    <Image
                      source={POKEMONS[item].staticSprite}
                      style={{ width: 130, height: 84 }}
                      contentFit="contain"
                    />

                    <StandardButton
                      title={POKEMONS[item].name}
                      handlePress={() => {
                        setRoster([...roster, item]);
                      }}
                      textStyles={""}
                    />
                  </View>
                ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
