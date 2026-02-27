import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GameProvider from "./GameContext";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="Shop" options={{ presentation: "modal" }} />
        </Stack>
      </GameProvider>
    </SafeAreaProvider>
  );
}
