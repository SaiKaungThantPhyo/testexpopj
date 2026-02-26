import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGame } from "../GameContext";

export default function HomeScreen() {
  const router = useRouter();
  // getContextcoins 
  const { coins } = useGame();


  const handleRateUs = () => {
    const GOOGLE_PACKAGE_NAME = "com.yourpokename.app";
    if (Platform.OS === "android") {
      Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg.jpeg")}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header Section */}
          <View style={styles.headerCard}>
            <View style={styles.profileInfo}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={24} color="#3B4CCA" />
              </View>
              <View>
                <Text style={styles.trainerName}>Trainer Ash</Text>
                {/* <Text style={styles.levelText}>Lv. 5</Text> // Level info is optional, can be added later when leveling system is implemented*/}
              </View>
            </View>

            <View style={styles.coinBadge}>
              {/* Context coins display*/}
              <Text style={styles.coinText}>💰 {coins}</Text>
            </View>
          </View>

          {/* Center Content */}
          <View style={styles.centerArea}>
            <Image
              source={require("../../assets/images/Pokemon_logo.svg.png")}
              style={styles.mainLogo}
            />
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => router.push("/Battle")}
            >
              <Ionicons name="flash" size={24} color="white" />
              <Text style={styles.startBtnText}>START BATTLE</Text>
            </TouchableOpacity>

            <View style={styles.menuGrid}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push("/Shop")}
              >
                <Ionicons name="cart" size={30} color="#333" />
                <Text style={styles.menuLabel}>Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleRateUs}>
                <Ionicons name="star" size={30} color="#f1c40f" />
                <Text style={styles.menuLabel}>Rate Us</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  safeArea: { flex: 1 },
  headerCard: {
    flexDirection: "row",
    backgroundColor: "rgba(59, 76, 202, 0.85)",
    margin: 15,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  profileInfo: { flexDirection: "row", alignItems: "center" },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  trainerName: { color: "white", fontSize: 16, fontWeight: "bold" },
  levelText: { color: "#FFCB05", fontSize: 12, fontWeight: "bold" },
  coinBadge: {
    backgroundColor: "#FFCB05",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  coinText: { fontWeight: "bold", fontSize: 13, color: "#333" },
  centerArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  mainLogo: { width: 280, height: 120, resizeMode: "contain" },
  footer: { padding: 20, paddingBottom: 40 },
  startBtn: {
    backgroundColor: "#CC0000",
    flexDirection: "row",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  startBtnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  menuGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "45%",
    height: 100,
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuLabel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
