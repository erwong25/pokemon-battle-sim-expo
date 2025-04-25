import combatText from "./combatText";
import { CombatOutcome } from "@/lib/damageCalculations";
import { Pokemon } from "@/constants/pokemon";
import { View } from "react-native";

export type combatContent = {
  attacker: Pokemon;
  defender: Pokemon;
  move?: string;
  fainting?: string;
  opponentFaintSwitch?: string;
  outcome: CombatOutcome;
};

export default function generateCombatText(
  combatInfo: Map<number, combatContent>
): React.ReactNode {
  const combatInfo1 = combatInfo.get(1);
  const combatInfo2 = combatInfo.get(2);
  // console.log(combatInfo);
  return (
    <View className="bg-red-600 absolute text-black bottom-0 h-[5rem] w-fit">
      {combatInfo1 != undefined && combatText(combatInfo1)}
      {combatInfo2 != undefined && combatText(combatInfo2)}
    </View>
  );
}
