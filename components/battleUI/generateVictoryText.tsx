import { Text, View } from "react-native";

export default function generateVictoryText(theActivePlayerHP: number) {
  if (theActivePlayerHP == 0) {
    return (
      <View className="absolute text-black bottom-0 h-[5rem] w-fit">
        <Text>You lose...</Text>
      </View>
    );
  } else {
    return (
      <View className="absolute text-black bottom-0 h-[5rem] w-fit">
        <Text>You win!!</Text>
      </View>
    );
  }
}
