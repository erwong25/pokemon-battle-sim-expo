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
          <View className="bg-red-600 h-fit w-[800px] flex grid grid-cols-2 gap-4 p-4 mx-auto">
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
                  className="flex flex-row w-[360px] bg-green-600 h-28 rounded-md rounded-tl-3xl"
                >
                  <View className="bg-white flex items-center justify-center place-content-center w-[160px]">
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
                  <View className="bg-blue-600 w-[220px] content-center">
                    <View className="bg-yellow-600 flex grow">
                      <Text>{POKEMONS[item].name}</Text>
                    </View>
                    <View className="flex grow content-center">
                      <Text>HP Bar</Text>
                    </View>
                    <View className="bg-purple-600 flex grow text-center">
                      <Text>HP: {calculateMaxHP(POKEMONS[item])}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          <Link
            href={{
              pathname: "/battle/",
              // pathname: "/battle/[id]",
              // params: { id: roster.join(",") },
            }}
            className="bg-blue-600 w-[220px] h-[100px] flex justify-center"
          >
            <Pressable>
              <Text>Start Battle</Text>
            </Pressable>
          </Link>
          <StandardButton
            title="Start Battle"
            handlePress={() => {
              () => router.push("/battle/");
              // () => router.push("/battle/" + roster.join(","));
            }}
          />
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
                    textStyles={"text-black text-lg text-center"}
                  />
                </View>
              ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
