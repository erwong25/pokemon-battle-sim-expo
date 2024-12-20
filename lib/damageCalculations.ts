// @flow

import type { Type } from "./types";
import type { Move } from "../constants/moves";
import type { Pokemon } from "../constants/pokemon";
import { TypeEffectiveness, TYPE_EFFECTIVENESS_MAP } from "./typeEffectiveness";

export type CombatOutcome = "Miss" | "No effect" | number;

function computeTypeEffectiveness(
  moveType: Type,
  defenderType: Array<Type>
): number {
  if (defenderType.length == 1) {
    return (
      TYPE_EFFECTIVENESS_MAP.get(moveType)?.get(defenderType[0]) ??
      TypeEffectiveness.DEFAULT
    );
  } else if (defenderType.length == 2) {
    const map = TYPE_EFFECTIVENESS_MAP.get(moveType);
    const effectiveness1 =
      map?.get(defenderType[0]) ?? TypeEffectiveness.DEFAULT;
    const effectiveness2 =
      map?.get(defenderType[1]) ?? TypeEffectiveness.DEFAULT;
    return effectiveness1 * effectiveness2;
  }
  return TypeEffectiveness.DEFAULT;
}

export default function computeDamage(
  move: Move,
  attacker: Pokemon,
  defender: Pokemon
): CombatOutcome {
  // does it hit?
  const hitRoll = Math.random();
  if (hitRoll > move.accuracy) {
    return "Miss";
  }

  var STAB = 1;
  if (attacker.types.includes(move.type)) {
    STAB = 1.5;
  }
  const typeEffectiveness = computeTypeEffectiveness(move.type, defender.types);
  if (typeEffectiveness == 0) {
    return "No effect";
  }
  // (power + atk - def) * typeEffectiveness
  var atkStat = 0;
  var defStat = 0;
  if (move.damageCategory === "Physical") {
    atkStat = attacker.stats.atk * 2 + 5;
    defStat = defender.stats.def * 2 + 5;
  } else if (move.damageCategory === "Special") {
    atkStat = attacker.stats.spAtk * 2 + 5;
    defStat = defender.stats.spDef * 2 + 5;
  }
  const level = 100;
  const damage =
    ((((2 * level) / 5 + 2) * move.power * atkStat) / defStat / 50 + 2) *
    typeEffectiveness *
    STAB;
  if (damage <= 0) {
    return 1;
  }
  return Math.round(damage);
}