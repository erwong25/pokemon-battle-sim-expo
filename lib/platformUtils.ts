import { Platform } from "react-native";

export default function isMobile(): boolean {
  return Platform.OS === "ios" || Platform.OS === "android";
}
