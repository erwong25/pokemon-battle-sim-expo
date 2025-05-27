import calculateMaxHP from "@/lib/calculateMaxHP";
import React from "react";
import { View, Text } from "react-native";
import { POKEMONS } from "@/constants/pokemon";
import { Platform } from "react-native";
import { Image as ReactImage } from "react-native";
import { Image } from "expo-image";

const RosterWindow = ({ roster }: { roster: string[] }) => {
  return (
    <View className="h-fit w-[800px] flex grid grid-cols-2 gap-4 p-4 mx-auto">
      {roster.map((item) => {
        const animatedSprite = POKEMONS[item].animatedSprite;
        const width = animatedSprite.width;
        const height = animatedSprite.height;
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
  );
};

export default RosterWindow;
