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
      disabled={partyPokemonHP == 0}
      className="bg-green-600 border-8 border-solid border-green-400 p-2 hover:bg-green-700 hover:shadow-xl transform hover:-translate-x-1 hover:-translate-y-1 hover:scale-[1.01] flex flex-row h-32 rounded-md rounded-tl-3xl w-[320px]"
    >
      <View className="flex items-center m-auto w-[100px]">
        <Image
          source={partyPokemon.pokemon.staticSprite}
          style={{ width: 130, height: 100 }}
          alt=""
        />
      </View>
      <View className="flex justify-center w-[180px] p-[20px]">
        <Text className="flex justify-start">{partyPokemon.pokemon.name}</Text>
        <View className="w-[140px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <View
            style={{
              width: `${
                (partyPokemonHP / calculateMaxHP(partyPokemon.pokemon)) * 100
              }%`,
            }}
            className={`bg-orange-600 h-2.5 rounded-full border-2`}
          ></View>
        </View>
        <Text className="flex justify-end">
          {partyPokemonHP}/{calculateMaxHP(partyPokemon.pokemon)}
        </Text>
      </View>
    </Pressable>
  );
};

export default PartyButton;
