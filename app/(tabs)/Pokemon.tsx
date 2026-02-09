import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGame } from "../GameContext"; // context ကို ချိတ်မယ်

export default function PokemonScreen() {
  const { myBag } = useGame(); // Context ထဲက myBag (ဝယ်ထားတဲ့စာရင်း) ကို ယူသုံးမယ်

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg.jpeg")}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>🎒 My Bag</Text>

          {/* myBag ထဲမှာ ဘာမှမရှိသေးရင် စာသားပြမယ် */}
          {myBag.length === 0 ? (
            <Text
              style={{ color: "white", textAlign: "center", marginTop: 20 }}
            >
              အိတ်ထဲမှာ ဘာမှမရှိသေးဘူး။ ဆိုင်မှာ သွားဝယ်ပါ။
            </Text>
          ) : (
            <FlatList
              data={myBag} // ပေးထားတဲ့ data အသေအစား myBag ကို သုံးမယ်
              keyExtractor={(item, index) => item.id + index}
              renderItem={({ item }) => (
                <View style={styles.pokeCard}>
                  <Image source={{ uri: item.image }} style={styles.pokeImg} />
                  <View>
                    <Text style={styles.pokeName}>{item.name}</Text>
                    <Text style={styles.pokeLv}>Level {item.lv || 1}</Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
    paddingTop: 60,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "white", marginBottom: 20 },
  pokeCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  pokeImg: { width: 60, height: 60, marginRight: 15 },
  pokeName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  pokeLv: { color: "#666", fontWeight: "bold" },
});
