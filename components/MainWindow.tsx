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
      <View className="bg-white relative flex flex-row justify-center my-auto w-[800px] h-[400px]">
        <View className="bg-orange-600 justify-center">
          <Text className="flex justify-start">{activePlayerPokemon.name}</Text>
          <View className="w-[140px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <View
              style={{
                width: `${
                  (theActivePlayerHP / calculateMaxHP(activePlayerPokemon)) *
                  100
                }%`,
              }}
              className={`bg-green-600 h-2.5 rounded-full`}
            ></View>
          </View>
          <Text className="flex justify-end">
            {theActivePlayerHP}/{calculateMaxHP(activePlayerPokemon)}
          </Text>
        </View>
        <View className="bg-red-600 scale-x-[-2] scale-y-[2] m-auto">
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
        <View className="bg-blue-600 m-auto scale-[2]">
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
        <View className="bg-orange-600 justify-center">
          <Text className="flex justify-start">
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
              className={`bg-green-600 h-2.5 rounded-full`}
            ></View>
          </View>
          <Text className="flex justify-end">
            {theActiveOpponentHP}/{calculateMaxHP(activeOpponentPokemon)}
          </Text>
        </View>
        {textOption}
      </View>
    );
  }
};

export default MainWindow;
