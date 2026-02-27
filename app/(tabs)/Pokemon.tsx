import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGame } from "../GameContext";

export default function PokemonScreen() {
  const { myBag } = useGame();
  const [selectedPoke, setSelectedPoke] = useState(null); //selected Pokemon to saved

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg.jpeg")}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>🎒 My Bag</Text>

          <FlatList
            data={myBag}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.pokeCard}
                onPress={() => setSelectedPoke(item)} // Detail
              >
                <Image source={{ uri: item.image }} style={styles.pokeImg} />
                <View>
                  <Text style={styles.pokeName}>{item.name}</Text>
                  {/* <Text style={styles.pokeLv}>Level {item.lv || 1}</Text> // Level info is optional, can be added later when leveling system is implemented*/}
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#ccc"
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            )}
          />

          {/* --- Detail Modal --- */}
          <Modal
            visible={selectedPoke !== null}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedPoke && (
                  <>
                    <TouchableOpacity
                      style={styles.closeBtn}
                      onPress={() => setSelectedPoke(null)}
                    >
                      <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>

                    <Image
                      source={{ uri: selectedPoke.image }}
                      style={styles.detailImg}
                    />
                    <Text style={styles.detailName}>{selectedPoke.name}</Text>

                    <View style={styles.statsBox}>
                      <StatBar label="HP" value={80} color="#ff7675" />
                      <StatBar label="Attack" value={65} color="#fab1a0" />
                      <StatBar label="Defense" value={50} color="#ffeaa7" />
                      <StatBar label="Speed" value={90} color="#81ecec" />
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
}

// Stat Bar Component for Pokemon details
const StatBar = ({ label, value, color }) => (
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>{label}</Text>
    <View style={styles.barBg}>
      <View
        style={[styles.barFill, { width: `${value}%`, backgroundColor: color }]}
      />
    </View>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

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
    backgroundColor: "rgba(255,255,255,0.95)",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  pokeImg: { width: 60, height: 60, marginRight: 15 },
  pokeName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  pokeLv: { color: "#666", fontWeight: "bold" },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    alignItems: "center",
  },
  closeBtn: { alignSelf: "flex-end" },
  detailImg: { width: 150, height: 150 },
  detailName: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  detailLv: { fontSize: 16, color: "#888", marginBottom: 20 },
  statsBox: { width: "100%", marginTop: 10 },
  statRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  statLabel: { width: 60, fontWeight: "bold" },
  barBg: {
    flex: 1,
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  barFill: { height: "100%", borderRadius: 5 },
  statValue: { width: 30, textAlign: "right", fontWeight: "bold" },
});
