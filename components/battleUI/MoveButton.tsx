import { Move } from "@/constants/moves";
import { RosterEntry } from "./generatePlayerRoster";
import { Pressable, Text } from "react-native";

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
      className="bg-gray-300 hover:bg-gray-500 flex items-center text-gray-800 py-2 w-[130px] border border-gray-400 rounded shadow mx-2 my-2 h-[2.6rem] disabled:bg-gray-600"
      onHoverIn={() => onMouseOver(move)}
      onPress={() => onClick(move)}
      // onLongPress= {() => { if(!isMobile()) {return}} onLongPress(move)}
    >
      <Text>{move.name}</Text>
    </Pressable>
  );
};

export default MoveButton;
