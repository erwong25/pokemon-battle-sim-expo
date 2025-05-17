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

export default function App() {
  const pokemonList = Object.keys(POKEMONS);
  const [roster, setRoster] = useState<Array<string>>([]);
  const router = useRouter();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        // edges={["bottom", "left", "right"]}
        className="bg-white h-full"
      >
        <ScrollView>
          <View className="h-fit w-[800px] flex grid grid-cols-2 gap-4 p-4 mx-auto">
            {roster.map((item) => {
              const animatedSprite = POKEMONS[item].animatedSprite;
              const width =
                Platform.OS === "web"
                  ? animatedSprite.width
                  : ReactImage.resolveAssetSource(animatedSprite).width;
              const height =
                Platform.OS === "web"
                  ? animatedSprite.height
                  : ReactImage.resolveAssetSource(animatedSprite).height;
              console.log(
                "width:",
                animatedSprite.width,
                "height:",
                animatedSprite.height
              );
              return (
                <View
                  key={`${item}`}
                  id={item}
                  className="flex flex-row w-[360px] bg-green-600 h-28 rounded-md rounded-tl-3xl border-8 border-solid border-green-400"
                >
                  <View className="flex items-center justify-center place-content-center w-[160px]">
                    <Image
                      source={animatedSprite}
                      style={{
                        width, // same as width: width
                        height,
                        minWidth: 10,
                        minHeight: 10,
                        // display: "flex",
                        flex: 1,
                        // flexGrow: 1,
                      }}
                      contentFit="contain"
                    />
                  </View>
                  <View className="w-[210px] content-center pr-16">
                    <View className="flex justify-end grow px-4">
                      <Text>{POKEMONS[item].name}</Text>
                    </View>
                    <View className="bg-gray-200 w[190px] rounded-full h-2.5 dark:bg-gray-700 mx-2">
                      <View
                        style={{
                          width: `${
                            (calculateMaxHP(POKEMONS[item]) /
                              calculateMaxHP(POKEMONS[item])) *
                            100
                          }%`,
                        }}
                        className={`bg-orange-600 h-2.5 rounded-full border-2`}
                      ></View>
                    </View>
                    <View className="flex flex-row justify-end grow text-center px-4">
                      <Text>HP: {calculateMaxHP(POKEMONS[item])}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

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
