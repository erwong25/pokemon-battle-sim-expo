import React from "react";
import type { CombatOutcome } from "@/lib/damageCalculations";
import { combatContent } from "./generateCombatText";
import { Text, View } from "react-native";

export default function combatText(
  combatContent: combatContent
): React.ReactNode {
  let faintText = null;
  if (combatContent.fainting == "player") {
    faintText = (
      <Text>
        {combatContent.defender.name} fainted. Send out your next pokemon.{" "}
      </Text>
    );
  }
  if (combatContent.fainting == "opponent") {
    faintText = (
      <Text>
        {combatContent.defender.name} fainted. Opponent switched to{" "}
        {combatContent.opponentFaintSwitch}.
      </Text>
    );
  }
  if (combatContent.outcome === "Switching") {
    return <Text>Switching to {combatContent.attacker.name}.</Text>;
  }
  if (combatContent.outcome === "Fainted") {
    return <Text>You sent out {combatContent.attacker.name}!</Text>;
  }
  if (combatContent.outcome === "Miss") {
    return (
      <Text>
        {combatContent.attacker.name} used {combatContent.move}...but it missed.
      </Text>
    );
  } else if (combatContent.outcome === "No effect") {
    return (
      <Text>
        {combatContent.attacker.name} used {combatContent.move}! It had no
        effect.
      </Text>
    );
  } else {
    return (
      <View>
        <Text>
          {combatContent.attacker.name} used {combatContent.move}!{" "}
          {combatContent.defender.name} took {combatContent.outcome} damage.
        </Text>
        {faintText}
      </View>
    );
  }
}
