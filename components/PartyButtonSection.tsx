import { RosterEntry } from "./generatePlayerRoster";
import { View } from "react-native";
import PartyButton from "./PartyButton";

const PartyButtonSection = ({
  playerRosterHP,
  onMouseOver,
  onClick,
}: {
  playerRosterHP: Map<string, RosterEntry>;
  onMouseOver: (partyPokemon: RosterEntry) => void;
  onClick: (item: string) => void;
}) => {
  const placeholderParty = [];
  for (let i = 0; i < 6 - playerRosterHP.size; i++) {
    placeholderParty.push(
      <View
        key={`placeholderParty${i}`}
        className="bg-gray-600 flex h-28 rounded-md rounded-tl-3xl w-[300px]"
      ></View>
    );
  }
  return (
    <View className="bg-red-600 w-fit flex grid grid-cols-2 gap-4 p-4 pt-0 mx-auto">
      {Array.from(playerRosterHP.keys()).map((item) => {
        const partyPokemon = playerRosterHP.get(item);
        if (partyPokemon == null) {
          return null;
        }
        const partyPokemonHP = playerRosterHP.get(item)?.currentHP;
        if (partyPokemonHP == null) {
          return null;
        }
        return (
          <PartyButton
            pokemon={item}
            onMouseOver={onMouseOver}
            onClick={onClick}
            partyPokemon={partyPokemon}
            partyPokemonHP={partyPokemonHP}
          />
        );
      })}
      {placeholderParty}
    </View>
  );
};

export default PartyButtonSection;
