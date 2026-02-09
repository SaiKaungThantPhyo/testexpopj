import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background ပုံ - မင်းရဲ့ assets ထဲမှာ bg.jpeg လို့ ရှိနေလို့ jpeg လို့ ရေးပေးထားပါတယ် */}
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
                <Text style={styles.levelText}>Lv. 5</Text>
              </View>
            </View>
            <View style={styles.coinBadge}>
              <Text style={styles.coinText}>💰 500</Text>
            </View>
          </View>

          {/* Center Content (Pokemon Logo) */}
          <View style={styles.centerArea}>
            <Image
              source={require("../../assets/images/Pokemon_logo.svg.png")}
              style={styles.mainLogo}
            />
            <Text style={styles.editionText}>Battle Arena Edition</Text>
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

            <View style={styles.menuRow}>
              <TouchableOpacity
                style={styles.menuBox}
                onPress={() => router.push("/Shop")} // ဒါလေး ထည့်လိုက်ပါ
              >
                <Ionicons name="cart" size={24} color="#333" />
                <Text style={styles.menuText}>Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuBox}>
                <Ionicons name="trophy" size={24} color="#333" />
                <Text style={styles.menuText}>Rank</Text>
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
  editionText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -10,
    textShadowColor: "black",
    textShadowRadius: 5,
    textShadowOffset: { width: 1, height: 1 },
  },
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
  menuRow: { flexDirection: "row", justifyContent: "center", gap: 20 },
  menuBox: {
    backgroundColor: "white",
    width: 85,
    height: 85,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  menuText: { marginTop: 5, fontWeight: "bold", color: "#333", fontSize: 12 },
});
