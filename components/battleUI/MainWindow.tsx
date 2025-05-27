import isMobile from "@/lib/platformUtils";
import { Image } from "expo-image";
import { Image as ReactImage } from "react-native";
import { Platform, View, Text } from "react-native";
import { Pokemon } from "@/constants/pokemon";
import calculateMaxHP from "@/lib/calculateMaxHP";

const MainWindow = ({
  theActivePlayerHP,
  theActiveOpponentHP,
  activePlayerPokemon,
  activeOpponentPokemon,
  textOption,
}: {
  theActivePlayerHP: number;
  theActiveOpponentHP: number;
  activePlayerPokemon: Pokemon;
  activeOpponentPokemon: Pokemon;
  textOption: React.ReactNode;
}) => {
  if (Platform.OS === "web") {
    return (
      <View className="bg-gray-200 relative flex flex-row justify-center my-auto w-[820px] h-[400px] px-8 rounded-xl">
        <View className="justify-center">
          <Text className="flex justify-start mx-2">
            {activePlayerPokemon.name}
          </Text>
          <View className="w-[140px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <View
              style={{
                width: `${
                  (theActivePlayerHP / calculateMaxHP(activePlayerPokemon)) *
                  100
                }%`,
              }}
              className={`bg-green-600 h-2.5 rounded-full border-2 border-gray-700`}
            ></View>
          </View>
          <Text className="flex justify-end mx-2">
            {theActivePlayerHP}/{calculateMaxHP(activePlayerPokemon)}
          </Text>
        </View>
        <View className="scale-x-[-2] scale-y-[2] m-auto">
          <Image
            className=""
            style={{
              width: activePlayerPokemon.animatedSprite.width,
              height: activePlayerPokemon.animatedSprite.height,
              padding: 10,
            }}
            source={activePlayerPokemon.animatedSprite}
            contentFit="contain"
          />
        </View>
        <View className="m-auto scale-[2]">
          <Image
            className=""
            style={{
              width: activeOpponentPokemon.animatedSprite.width,
              height: activeOpponentPokemon.animatedSprite.height,
              padding: 10,
            }}
            source={activeOpponentPokemon.animatedSprite}
            contentFit="contain"
          />
        </View>
        <View className="bg-gray-400 h-[100px] w-[500px] absolute bottom-0 p-4 rounded-xl mb-2">
          {textOption}
        </View>
        <View className="justify-center">
          <Text className="flex justify-start mx-2">
            {activeOpponentPokemon.name}
          </Text>
          <View className="w-[140px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <View
              style={{
                width: `${
                  (theActiveOpponentHP /
                    calculateMaxHP(activeOpponentPokemon)) *
                  100
                }%`,
              }}
              className={`bg-green-600 h-2.5 rounded-full border-2 border-gray-700`}
            ></View>
          </View>
          <Text className="flex justify-end mx-2">
            {theActiveOpponentHP}/{calculateMaxHP(activeOpponentPokemon)}
          </Text>
        </View>
      </View>
    );
  }
};

export default MainWindow;
