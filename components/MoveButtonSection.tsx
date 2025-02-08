import { Move } from "@/constants/moves";
import { RosterEntry } from "./generatePlayerRoster";
import { View } from "react-native";
import MoveButton from "./MoveButton";

const MoveButtonSection = ({
  activePokemon,
  onMouseOver,
  onClick,
  remainingOpponentPokemon,
}: {
  activePokemon: RosterEntry | undefined;
  onMouseOver: (item: Move) => void;
  onClick: (item: Move) => void;
  remainingOpponentPokemon: number;
}) => {
  if (activePokemon == undefined) {
    return;
  }
  const placeholderMoves = [];
  for (let i = 0; i < 4 - activePokemon.pokemon.moves.length; i++) {
    placeholderMoves.push(
      <View
        key={`placeholderMoves${i}`}
        className="bg-gray-600 py-2 w-[130px] border border-gray-400 rounded shadow mx-auto my-2 h-[2.6rem]"
      ></View>
    );
  }
  return (
    <View className="bg-gray-200 flex grid grid-cols-2 w-[300px] mx-auto my-2">
      {activePokemon.pokemon.moves.map((move) => (
        <MoveButton
          activePokemon={activePokemon}
          onMouseOver={onMouseOver}
          onClick={onClick}
          remainingOpponentPokemon={remainingOpponentPokemon}
          move={move}
        />
      ))}
      {placeholderMoves}
    </View>
  );
};

export default MoveButtonSection;
