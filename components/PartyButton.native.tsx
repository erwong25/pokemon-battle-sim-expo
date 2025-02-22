import calculateMaxHP from "@/lib/calculateMaxHP";
import { RosterEntry } from "./generatePlayerRoster";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

const PartyButton = ({
  pokemon,
  onMouseOver,
  onClick,
  partyPokemon,
  partyPokemonHP,
}: {
  pokemon: string;
  onMouseOver: (partyPokemon: RosterEntry) => void;
  onClick: (item: string) => void;
  partyPokemon: RosterEntry;
  partyPokemonHP: number;
}) => {
  return (
    <Pressable
      key={`${pokemon}`}
      onHoverIn={() => onMouseOver(partyPokemon)}
      onPress={() => onClick(pokemon)}
      // onLongPress= {() => { if(!isMobile()) {return}} onLongPress(pokemon)}
      className="bg-blue-600 hover:bg-green-700 hover:shadow-xl transform hover:-translate-x-1 hover:-translate-y-1 hover:scale-[1.01] flex flex-row h-20 rounded-md rounded-tl-3xl w-[180px] mx-auto my-1"
    >
      <View className="bg-white flex items-center m-auto w-[50px]">
        <Image
          source={partyPokemon.pokemon.staticSprite}
          style={{ width: 130, height: 84, maxHeight: 70, maxWidth: 70 }}
          alt=""
        />
      </View>
      <View className="bg-green-600 flex justify-center w-[100px] pr-2">
        <Text className="flex justify-start">{partyPokemon.pokemon.name}</Text>
        <View className="w-[90px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <View
            style={{
              width: `${
                (partyPokemonHP / calculateMaxHP(partyPokemon.pokemon)) * 100
              }%`,
            }}
            className={`bg-orange-600 h-2.5 rounded-full`}
          ></View>
        </View>
        <View className="flex flex-row justify-end w-[90px]">
          <Text>
            {partyPokemonHP}/{calculateMaxHP(partyPokemon.pokemon)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PartyButton;
