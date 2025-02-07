import type { Pokemon } from "@/constants/pokemon";
import { Move } from "@/constants/moves";
import { RosterEntry } from "./generatePlayerRoster";
import { Platform, Pressable, Text, View } from "react-native";
import isMobile from "@/lib/platformUtils";

const MoveButton = ({
  activePokemon,
  onMouseOver,
  onClick,
  remainingOpponentPokemon,
  move,
}: {
  activePokemon: RosterEntry | undefined;
  onMouseOver: (item: Move) => void;
  onClick: (item: Move) => void;
  remainingOpponentPokemon: number;
  move: Move;
}) => {
  return (
    <Pressable
      disabled={activePokemon.currentHP == 0 || remainingOpponentPokemon == 0}
      key={`${move.name}`}
      className="bg-gray-300 hover:bg-gray-500 flex items-center text-gray-800 py-2 w-[130px] border border-gray-400 rounded shadow mx-auto my-2 h-[2.6rem] disabled:bg-gray-600"
      onHoverIn={() => onMouseOver(move)}
      onPress={() => onClick(move)}
      // onLongPress= {() => { if(!isMobile()) {return}} onLongPress(move)}
    >
      <Text>{move.name}</Text>
    </Pressable>
  );
};

export default function generateMoveButtons(
  activePokemon: RosterEntry | undefined,
  onMouseOver: (item: Move) => void,
  onClick: (item: Move) => void,
  remainingOpponentPokemon: number
): React.ReactNode {
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
}
