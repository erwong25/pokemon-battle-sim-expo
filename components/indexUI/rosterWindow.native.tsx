import calculateMaxHP from "@/lib/calculateMaxHP";
import React from "react";
import { View, Text } from "react-native";
import { POKEMONS } from "@/constants/pokemon";
import { Image } from "expo-image";
import { Image as ReactImage } from "react-native";

const RosterWindow = ({ roster }: { roster: string[] }) => {
  return (
    <View className="h-fit max-width-screen flex flex-row flex-wrap p-4 gap-2 justify-center">
      {roster.map((item) => {
        const animatedSprite = POKEMONS[item].animatedSprite;
        const width = ReactImage.resolveAssetSource(animatedSprite).width;
        const height = ReactImage.resolveAssetSource(animatedSprite).height;
        return (
          <View
            key={`${item}`}
            id={item}
            className="flex flex-row w-[194px] bg-green-600 h-28 rounded-md rounded-tl-3xl border-8 border-solid border-green-400"
          >
            <View className="flex items-center justify-center place-content-center w-[90px]">
              <Image
                source={animatedSprite}
                style={{
                  width: width,
                  height: height,
                  minWidth: 10,
                  minHeight: 10,
                  // display: "flex",
                  flex: 1,
                  // flexGrow: 1,
                }}
                contentFit="contain"
              />
            </View>
            <View className="w-[80px] content-center">
              <View className="flex justify-end grow">
                <Text>{POKEMONS[item].name}</Text>
              </View>
              {/* <View className="bg-gray-200 w[190px] rounded-full h-2.5 dark:bg-gray-700 mx-2">
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
              </View> */}
              <View className="flex flex-row grow">
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
