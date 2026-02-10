import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue", // ရောက်နေတဲ့ Tab ကို အပြာရောင်ပြမယ်
        headerShown: true, // Screen ခေါင်းစဉ်ကို အပေါ်မှာ ပြမယ်
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home Style",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ImageTest"
        options={{
          title: "Pokemon",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
