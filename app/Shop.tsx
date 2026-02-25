import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGame } from "./GameContext"; // Context ကို ချိတ်မယ်

const POKEMON_ITEMS = [
  {
    id: "4",
    name: "Charmander",
    price: 100,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  },
  {
    id: "7",
    name: "Squirtle",
    price: 150,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  },
  {
    id: "1",
    name: "Bulbasaur",
    price: 120,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    id: "6",
    name: "Charizard",
    price: 500,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
  },
];

export default function ShopScreen() {
  const router = useRouter();
  const { coins, buyPokemon } = useGame(); // Context ထဲက data နဲ့ function ကို ယူသုံးမယ်

  const handleBuy = async (item) => {
    const success = await buyPokemon(item);
    if (success === "owned") {
      Alert.alert(
        "ရှိပြီးသားဖြစ်သည်!",
        `${item.name} က သင့်အိတ်ထဲမှာ ရှိနေပြီးသားပါ။`,
      );
    } else if (success) {
      Alert.alert("အောင်မြင်ပါသည်!", `${item.name} ကို ဝယ်ယူပြီးပါပြီ။`);
    } else {
      Alert.alert(
        "ပိုက်ဆံမလောက်ပါ!",
        "တိုက်ပွဲများများတိုက်ပြီး Coins အရင်ရှာပါ။",
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Poke Shop</Text>
        <View style={styles.coinBadge}>
          <Text style={styles.coinText}>💰 {coins}</Text>
        </View>
      </View>

      <FlatList
        data={POKEMON_ITEMS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listPadding}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.pokeImage} />
            <Text style={styles.pokeName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.buyBtn}
              onPress={() => handleBuy(item)}
            >
              <Text style={styles.buyBtnText}>💰 {item.price}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },
  header: {
    backgroundColor: "#3B4CCA",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  coinBadge: {
    backgroundColor: "#FFCB05",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  coinText: { fontWeight: "bold", color: "#333" },
  listPadding: { padding: 10 },
  card: {
    flex: 1,
    backgroundColor: "white",
    margin: 8,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },
  pokeImage: { width: 100, height: 100, resizeMode: "contain" },
  pokeName: { fontSize: 16, fontWeight: "bold", marginVertical: 8 },
  buyBtn: {
    backgroundColor: "#2ecc71",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buyBtnText: { color: "white", fontWeight: "bold" },
});
