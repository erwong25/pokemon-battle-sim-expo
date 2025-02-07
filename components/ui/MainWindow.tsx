import isMobile from "@/lib/platformUtils";
import { Image } from "expo-image";
import { Image as ReactImage } from "react-native";
import { Platform, View } from "react-native";
import { Pokemon } from "@/constants/pokemon";

const MainWindow = ({
  activePlayerPokemon,
  activeOpponentPokemon,
  textOption,
}: {
  activePlayerPokemon: Pokemon;
  activeOpponentPokemon: Pokemon;
  textOption: React.ReactNode;
}) => {
  if (Platform.OS === "web") {
    return (
      <View className="bg-white relative flex flex-row justify-center my-auto w-[550px] h-[400px]">
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
        {textOption}
      </View>
    );
  }
  if (isMobile()) {
    return (
      <View className="bg-white relative flex flex-row justify-center my-auto w-[200px] h-[400px]">
        <View className="bg-red-600 scale-x-[-2] scale-y-[2] m-auto">
          <Image
            className=""
            style={{
              width:
                ReactImage.resolveAssetSource(
                  activePlayerPokemon.animatedSprite
                ).width * 0.7,
              height:
                ReactImage.resolveAssetSource(
                  activePlayerPokemon.animatedSprite
                ).height * 0.7,
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
              width:
                ReactImage.resolveAssetSource(
                  activeOpponentPokemon.animatedSprite
                ).width * 0.7,
              height:
                ReactImage.resolveAssetSource(
                  activeOpponentPokemon.animatedSprite
                ).height * 0.7,
              padding: 10,
            }}
            source={activeOpponentPokemon.animatedSprite}
            contentFit="contain"
          />
        </View>
        {textOption}
      </View>
    );
  }
};

export default MainWindow;
