import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { GameProvider } from "../GameContext"; // GameContext ကို import လုပ်ပါ

export default function TabLayout() {
  return (
    // ဒီမှာ GameProvider နဲ့ တစ်ခုလုံးကို အုပ်လိုက်တာပါ
    <GameProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#1e272e",
            height: 65,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "#FFCB05",
          tabBarInactiveTintColor: "#808e9b",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Lobby",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Pokemon"
          options={{
            title: "My Bag",
            tabBarIcon: ({ color }) => (
              <Ionicons name="briefcase" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </GameProvider>
  );
}
