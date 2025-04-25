import React from "react";
import { Text, TouchableOpacity } from "react-native";

const StandardButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: {
  title: string;
  handlePress: () => void;
  containerStyles?: string | undefined;
  textStyles?: string | undefined;
  isLoading?: boolean | undefined;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`flex bg-gray-500 h-10 w-32 justify-center rounded-xl ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
      disabled={isLoading}
    >
      <Text className={`text-black text-lg text-center ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default StandardButton;
