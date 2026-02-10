import { Stack } from "expo-router";
import GameProvider from "./GameContext"; // လမ်းကြောင်းမှန်ပါစေ

export default function RootLayout() {
  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="shop" options={{ presentation: "modal" }} />
      </Stack>
    </GameProvider>
  );
}
