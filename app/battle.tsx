import { Pressable, SafeAreaView, Text, View, Platform } from "react-native";
import {
  BULBASAUR,
  GENGAR,
  POKEMONS,
  POKEMON_LIST,
  Pokemon,
} from "@/constants/pokemon";
import { useEffect, useState } from "react";
import { RosterEntry } from "@/components/generatePlayerRoster";
import generatePlayerRoster from "@/components/generatePlayerRoster";
import { CombatOutcome } from "@/lib/damageCalculations";
import { DisplayContent } from "@/components/generateDisplayArea";
import { combatContent } from "@/components/generateCombatText";
import { Move } from "@/constants/moves";
import computeDamage from "@/lib/damageCalculations";
import randomTeamMember from "@/lib/randomTeamMember";
import moveSelector from "@/lib/moveSelector";
import generateCombatText from "@/components/generateCombatText";
import generateVictoryText from "@/components/generateVictoryText";
import generatePartyButtons from "@/components/PartyButton";
import generateDisplayArea from "@/components/generateDisplayArea";
import MainWindow from "@/components/ui/MainWindow";
import { Link } from "expo-router";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import MoveButtonSection from "@/components/MoveButtonSection";
import PartyButtonSection from "@/components/ui/PartyButtonSection";

export default function BattlePage({
  searchParams,
}: {
  searchParams: { roster: string };
}) {
  // const rawRoster = searchParams.roster.split(",");
  const rawRoster = ["BULBASAUR", "IVYSAUR"];
  const roster = rawRoster.filter((pokemon) =>
    Object.keys(POKEMONS).includes(pokemon)
  ) as Array<keyof POKEMON_LIST>;
  const startingPlayerPokemon = roster[0];
  const clone = JSON.parse(JSON.stringify(POKEMONS));
  const randomRoster = [] as Array<keyof POKEMON_LIST>;
  for (let i = 0; i < roster.length; i++) {
    const randomPokemon = Object.keys(clone)[
      Math.floor(Math.random() * Object.keys(clone).length)
    ] as keyof POKEMON_LIST;
    randomRoster.push(randomPokemon);
    delete clone[randomPokemon];
  }
  const startingOpponentPokemon = randomRoster[0];
  // const startingOpponentPokemon = Object.keys(POKEMONS)[
  //   Math.floor(Math.random() * Object.keys(POKEMONS).length)
  // ] as keyof POKEMON_LIST;
  const [activePlayerRosterIdentifier, setActivePlayerRosterIdentifier] =
    useState(POKEMONS[startingPlayerPokemon].name);
  const [activeOpponentRosterIdentifier, setActiveOpponentRosterIdentifier] =
    useState(POKEMONS[startingOpponentPokemon].name);
  const [damageDealt, setDamageDealt] = useState<CombatOutcome>(0);
  const [damageReceived, setDamageReceived] = useState<CombatOutcome>(0);
  const [activePlayerMove, setActivePlayerMove] = useState("");
  const [activeOpponentMove, setActiveOpponentMove] = useState("");
  const [playerRoster, setPlayerRoster] = useState(
    generatePlayerRoster(roster)
  );
  const [opponentRoster, setOpponentRoster] = useState(
    generatePlayerRoster(randomRoster)
  );
  const [displayArea, setDisplayArea] = useState<DisplayContent | null>(null);
  const [combatInfo, setCombatInfo] = useState(
    new Map<number, combatContent>()
  );
  const [remainingPlayerPokemon, setRemainingPlayerPokemon] = useState(
    playerRoster.size
  );
  const [remainingOpponentPokemon, setRemainingOpponentPokemon] = useState(
    opponentRoster.size
  );
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (startingPlayerPokemon == null) {
    console.log("startingPlayerPokemon is null");
    return;
  }

  const activePlayerPokemon = playerRoster.get(
    activePlayerRosterIdentifier
  )?.pokemon;
  const activeOpponentPokemon = opponentRoster.get(
    activeOpponentRosterIdentifier
  )?.pokemon;
  if (activePlayerPokemon == undefined || activeOpponentPokemon == undefined) {
    console.log("activePlayerPokemon is undefined");
    return;
  }
  const theActivePlayerHP = playerRoster.get(
    activePlayerPokemon.name
  )?.currentHP;
  const theActiveOpponentHP = opponentRoster.get(
    activeOpponentPokemon.name
  )?.currentHP;
  if (theActivePlayerHP == undefined || theActiveOpponentHP == undefined) {
    console.log("theActiveHP is undefined");
    return;
  }

  function handlePartyOnClick(item: string) {
    const switchTarget = playerRoster.get(item)?.pokemon;
    if (switchTarget == undefined) {
      return;
    }
    if (playerRoster.get(activePlayerRosterIdentifier)?.currentHP == 0) {
      setActivePlayerRosterIdentifier(item);
      setCombatInfo(new Map());
      setCombatInfo((combatInfo) =>
        combatInfo.set(1, {
          attacker: switchTarget,
          defender: BULBASAUR,
          outcome: "Fainted",
        })
      );
    } else {
      setActivePlayerRosterIdentifier(item);
      setCombatInfo(new Map());
      setCombatInfo((combatInfo) =>
        combatInfo.set(1, {
          attacker: switchTarget,
          defender: BULBASAUR,
          outcome: "Switching",
        })
      );
      activeOpponentAction(2, switchTarget);
    }
  }

  function activePlayerAction(selectedMove: Move, order: number) {
    if (
      activePlayerPokemon == undefined ||
      activeOpponentPokemon == undefined ||
      theActivePlayerHP == undefined ||
      theActiveOpponentHP == undefined
    ) {
      console.log("activePlayerAction log");
      return;
    }
    setActivePlayerMove(selectedMove.name);
    const attackDamage = computeDamage(
      selectedMove,
      activePlayerPokemon,
      activeOpponentPokemon
    );
    setDamageDealt(attackDamage);
    if (typeof attackDamage == "number") {
      if (theActiveOpponentHP - attackDamage <= 0) {
        setOpponentRoster(
          opponentRoster.set(activeOpponentPokemon.name, {
            pokemon: activeOpponentPokemon,
            currentHP: 0,
          })
        );
        const opponentFaintSwitch = randomTeamMember(opponentRoster);
        console.log("setting Combat Info after opponent faints");
        setCombatInfo((combatInfo) =>
          combatInfo.set(order, {
            attacker: activePlayerPokemon,
            defender: activeOpponentPokemon,
            move: selectedMove.name,
            fainting: "opponent",
            opponentFaintSwitch: opponentFaintSwitch,
            outcome: attackDamage,
          })
        );
        // setOpponentRoster(
        //   opponentRoster.set(activeOpponentPokemon.name, {
        //     pokemon: activeOpponentPokemon,
        //     currentHP: 0,
        //   })
        // );
        if (remainingOpponentPokemon - 1 == 0) {
          setRemainingOpponentPokemon(0);
        } else {
          setRemainingOpponentPokemon(remainingOpponentPokemon - 1);
          setActiveOpponentRosterIdentifier(opponentFaintSwitch);
        }
      } else {
        setCombatInfo((combatInfo) =>
          combatInfo.set(order, {
            attacker: activePlayerPokemon,
            defender: activeOpponentPokemon,
            move: selectedMove.name,
            outcome: attackDamage,
          })
        );
        {
          setOpponentRoster(
            opponentRoster.set(activeOpponentPokemon.name, {
              pokemon: activeOpponentPokemon,
              currentHP: theActiveOpponentHP - attackDamage,
            })
          );
        }
      }
    } else {
      setCombatInfo((combatInfo) =>
        combatInfo.set(order, {
          attacker: activePlayerPokemon,
          defender: activeOpponentPokemon,
          move: selectedMove.name,
          outcome: attackDamage,
        })
      );
    }
  }

  function activeOpponentAction(order: number, opponentTarget: Pokemon) {
    if (
      activePlayerPokemon == undefined ||
      activeOpponentPokemon == undefined ||
      theActivePlayerHP == undefined ||
      theActiveOpponentHP == undefined
    ) {
      console.log("activeOpponentAction log");
      return;
    }
    const opponentTargetHP = playerRoster.get(opponentTarget.name)?.currentHP;
    if (opponentTargetHP == undefined) {
      return;
    }
    const opponentMove =
      activeOpponentPokemon.moves[moveSelector(activeOpponentPokemon)];
    setActiveOpponentMove(opponentMove.name);
    const opponentDamage = computeDamage(
      opponentMove,
      activeOpponentPokemon,
      opponentTarget
    );
    setDamageReceived(opponentDamage);
    if (typeof opponentDamage == "number") {
      if (opponentTargetHP - opponentDamage <= 0) {
        setPlayerRoster(
          playerRoster.set(opponentTarget.name, {
            pokemon: opponentTarget,
            currentHP: 0,
          })
        );
        setCombatInfo((combatInfo) =>
          combatInfo.set(order, {
            attacker: activeOpponentPokemon,
            defender: opponentTarget,
            move: opponentMove.name,
            fainting: "player",
            outcome: opponentDamage,
          })
        );
        setRemainingPlayerPokemon(remainingPlayerPokemon - 1);
      } else {
        setCombatInfo((combatInfo) =>
          combatInfo.set(order, {
            attacker: activeOpponentPokemon,
            defender: opponentTarget,
            move: opponentMove.name,
            outcome: opponentDamage,
          })
        );
        setPlayerRoster(
          playerRoster.set(opponentTarget.name, {
            pokemon: opponentTarget,
            currentHP: opponentTargetHP - opponentDamage,
          })
        );
      }
    } else {
      setCombatInfo((combatInfo) =>
        combatInfo.set(order, {
          attacker: activeOpponentPokemon,
          defender: opponentTarget,
          move: opponentMove.name,
          outcome: opponentDamage,
        })
      );
    }
  }

  function handleMoveOnClick(selectedMove: Move) {
    if (
      activePlayerPokemon == undefined ||
      activeOpponentPokemon == undefined ||
      theActivePlayerHP == undefined ||
      theActiveOpponentHP == undefined
    ) {
      console.log("handleMoveOnClick log");
      return;
    }
    setCombatInfo(new Map());
    let speedTieBreak = -1;
    if (activePlayerPokemon.stats.sp == activeOpponentPokemon.stats.sp) {
      console.log("there is a speed tie");
      speedTieBreak = Math.floor(Math.random() * 2);
    }
    if (
      speedTieBreak == 0 ||
      activePlayerPokemon.stats.sp > activeOpponentPokemon.stats.sp
    ) {
      console.log("player went first");
      activePlayerAction(selectedMove, 1);
      if (opponentRoster.get(activeOpponentPokemon.name)?.currentHP != 0) {
        console.log(
          "current HP",
          opponentRoster.get(activeOpponentPokemon.name)?.currentHP
        );
        activeOpponentAction(2, activePlayerPokemon);
      } else {
        console.log("opponent fainted, nothing should have happend");
      }
    } else {
      console.log("opponent went first");
      activeOpponentAction(1, activePlayerPokemon);
      if (playerRoster.get(activePlayerPokemon.name)?.currentHP != 0) {
        activePlayerAction(selectedMove, 2);
      } else {
        console.log("player fainted, nothing should have happened");
        // setCombatInfo(combatInfo =>
        //   combatInfo.set(2, {
        //     attacker: activePlayerPokemon,
        //     defender: activeOpponentPokemon,
        //     outcome: "Player fainted",
        //   })
        // );
      }
    }
  }

  let textOption = generateCombatText(combatInfo);
  if (remainingPlayerPokemon == 0 || remainingOpponentPokemon == 0) {
    textOption = generateVictoryText(theActivePlayerHP);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
          <View className="flex flex-row bg-green-600 justify-center h-[450px]">
            <Pressable className="flex justify-end absolute right-0">
              <Link
                className="bg-gray-300 hover:bg-gray-500 text-gray-800 px-1 border border-gray-400 rounded shadow"
                href={"/"}
              >
                <Text>Reset</Text>
              </Link>
            </Pressable>
            <MainWindow
              theActivePlayerHP={theActivePlayerHP}
              theActiveOpponentHP={theActiveOpponentHP}
              activePlayerPokemon={activePlayerPokemon}
              activeOpponentPokemon={activeOpponentPokemon}
              textOption={textOption}
            />
          </View>
          <View className="flex flex-row bg-yellow-600 justify-center">
            <View className="bg-pink-600 w-[650px] mr-1">
              <Text className="absolute">Select Move:</Text>
              <MoveButtonSection
                activePokemon={playerRoster.get(activePlayerRosterIdentifier)}
                onMouseOver={(item: Move) => setDisplayArea({ move: item })}
                onClick={(item) => handleMoveOnClick(item)}
                remainingOpponentPokemon={remainingOpponentPokemon}
              />
              <View className="">
                <Text>Switch:</Text>
              </View>
              <PartyButtonSection
                playerRosterHP={playerRoster}
                onMouseOver={(partyPokemon: RosterEntry) =>
                  setDisplayArea({ rosterEntry: partyPokemon })
                }
                onClick={(item) => handlePartyOnClick(item)}
              />
            </View>
            {Platform.OS === "web" && (
              <View className="bg-gray-200 ml-1 my-2 w-[650px] rounded-xl py-4 px-6">
                {generateDisplayArea(displayArea)}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
