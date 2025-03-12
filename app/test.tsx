import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const test = () => {
  const { user, age } = useLocalSearchParams();
  return (
    <View>
      <Text className="text-white">{user}</Text>
      <Text className="text-white">{age}</Text>
    </View>
  );
};

export default test;
