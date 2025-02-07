import { Text, View } from "react-native";

export default function generateVictoryText(theActivePlayerHP: number) {
  if (theActivePlayerHP == 0) {
    return (
      <View>
        <Text className="bg-red-600 absolute text-black bottom-0 h-[4.5rem] w-[500px]">
          You lose...
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text className="bg-red-600 absolute text-black bottom-0 h-[4.5rem] w-[500px]">
          You win!!
        </Text>
      </View>
    );
  }
}
