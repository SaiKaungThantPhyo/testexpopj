import { Stack } from "expo-router";
import GameProvider from "./GameContext";
export default function RootLayout() {
  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Shop" options={{ presentation: "modal" }} />
      </Stack>
    </GameProvider>
  );
}
