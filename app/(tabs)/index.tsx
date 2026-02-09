import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ၁။ Top Bar (Profile & Coins) */}
      <View style={styles.topBar}>
        <View style={styles.profileSection}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.playerName}>Trainer Ash</Text>
            <Text style={styles.playerLevel}>Lv. 5</Text>
          </View>
        </View>

        <View style={styles.coinContainer}>
          <Text style={styles.coinText}>💰 500</Text>
        </View>
      </View>

      {/* ၂။ Main Logo/Banner */}
      <View style={styles.mainContent}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.subtitle}>Battle Arena Edition</Text>
      </View>

      {/* ၃။ Menu Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.battleBtn}
          onPress={() => router.push("/Battle")}
        >
          <Ionicons
            name="flash"
            size={28}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.battleBtnText}>START BATTLE</Text>
        </TouchableOpacity>

        <View style={styles.secondaryButtons}>
          <TouchableOpacity style={styles.smallBtn}>
            <Ionicons name="cart" size={24} color="#333" />
            <Text style={styles.smallBtnText}>Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallBtn}>
            <Ionicons name="trophy" size={24} color="#333" />
            <Text style={styles.smallBtnText}>Rank</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#3B4CCA",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileSection: { flexDirection: "row", alignItems: "center" },
  avatarCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  playerName: { color: "white", fontWeight: "bold", fontSize: 16 },
  playerLevel: { color: "#FFCB05", fontSize: 12, fontWeight: "bold" },
  coinContainer: {
    backgroundColor: "#FFCB05",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  coinText: { fontWeight: "bold", color: "#333" },
  mainContent: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: 250, height: 100, resizeMode: "contain" },
  subtitle: { fontSize: 18, color: "#666", fontWeight: "500", marginTop: -10 },
  buttonContainer: { padding: 30, paddingBottom: 50 },
  battleBtn: {
    backgroundColor: "#CC0000",
    flexDirection: "row",
    height: 65,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 20,
  },
  battleBtnText: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1,
  },
  secondaryButtons: { flexDirection: "row", justifyContent: "space-around" },
  smallBtn: {
    backgroundColor: "white",
    width: 80,
    height: 80,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  smallBtnText: {
    fontSize: 12,
    marginTop: 5,
    color: "#333",
    fontWeight: "bold",
  },
});
