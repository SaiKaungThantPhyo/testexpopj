import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGame } from "./GameContext";

export default function BattleScreen() {
  const router = useRouter();
  const gameContext = useGame();

  // Safeguard: Check if context is available
  if (!gameContext) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: Game Context not found</Text>
      </View>
    );
  }

  // Extract variables and functions from GameContext
  const { myBag, addCoins, removeCoins, incrementBattle, battleCount } =
    gameContext;

  // Battle UI and Selection States
  const [selectedMyPoke, setSelectedMyPoke] = useState<any>(null);
  const [showPicker, setShowPicker] = useState(true);
  const [enemyID, setEnemyID] = useState<number | null>(null);
  const [isImgLoading, setIsImgLoading] = useState(true);

  // HP and Animation States
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [enemyOpacity, setEnemyOpacity] = useState(1);
  const [playerOpacity, setPlayerOpacity] = useState(1);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing",
  );

  // Initialize random enemy ID on mount
  useEffect(() => {
    const randomID = Math.floor(Math.random() * 151) + 1;
    setEnemyID(randomID);
  }, []);

  const handleAttack = () => {
    if (gameState !== "playing" || !selectedMyPoke) return;

    // --- PHASE 1: Player's Attack ---
    setEnemyOpacity(0.2); // Trigger hit animation
    setTimeout(() => setEnemyOpacity(1), 100);

    const dmgToEnemy = Math.floor(Math.random() * 40) + 20;
    const newEHP = Math.max(0, enemyHP - dmgToEnemy);
    setEnemyHP(newEHP);

    // Victory Condition
    if (newEHP <= 0) {
      setGameState("won");
      addCoins(50);
      incrementBattle(); // Count this battle to the history
      return;
    }

    // --- PHASE 2: Enemy's Attack (Delayed) ---
    setTimeout(() => {
      if (newEHP <= 0) return;

      setPlayerOpacity(0.2); // Trigger hit animation
      setTimeout(() => setPlayerOpacity(1), 100);

      // --- THE LOSING ALGORITHM ---
      // If it's the 3rd, 6th, or 9th match, force a loss
      let dmgToPlayer;
      if ((battleCount + 1) % 3 === 0) {
        dmgToPlayer = 100; // Scripted critical hit (Instant Loss)
      } else {
        dmgToPlayer = Math.floor(Math.random() * 20) + 10; // Normal damage
      }

      const newPHP = Math.max(0, playerHP - dmgToPlayer);
      setPlayerHP(newPHP);

      // Defeat Condition
      if (newPHP <= 0) {
        setGameState("lost");
        removeCoins(10);
        incrementBattle(); // Count this battle to the history
      }
    }, 600);
  };

  return (
    <View style={styles.container}>
      {/* Pokemon Selection Modal */}
      <Modal visible={showPicker} animationType="slide">
        <View style={styles.pickerContainer}>
          <TouchableOpacity
            style={{ alignSelf: "flex-start", marginBottom: 10 }}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={30} color="#333" />
          </TouchableOpacity>

          <Text style={styles.pickerTitle}>Select Your Pokémon</Text>

          <FlatList
            data={myBag}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.pickerItem}
                onPress={() => {
                  setSelectedMyPoke(item);
                  setShowPicker(false);
                }}
              >
                <Image source={{ uri: item.image }} style={styles.pickerImg} />
                <Text style={styles.pickerName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Enemy Health and Sprite */}
      <View style={styles.side}>
        <View style={styles.hpBarContainer}>
          <View
            style={[
              styles.hpBar,
              { width: `${enemyHP}%`, backgroundColor: "#e74c3c" },
            ]}
          />
        </View>
        <View style={styles.imgBox}>
          {isImgLoading && <ActivityIndicator size="large" color="#3B4CCA" />}
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${enemyID}.png`,
            }}
            style={[
              styles.pokemon,
              {
                opacity: enemyOpacity,
                position: isImgLoading ? "absolute" : "relative",
              },
            ]}
            onLoadEnd={() => setIsImgLoading(false)}
          />
        </View>
        <Text style={styles.hpLabel}>Wild Pokémon: {enemyHP}%</Text>
      </View>

      <Text style={styles.vs}>VS</Text>

      {/* Player Health and Sprite */}
      <View style={styles.side}>
        {selectedMyPoke && (
          <>
            <Image
              source={{ uri: selectedMyPoke.image }}
              style={[styles.pokemon, { opacity: playerOpacity }]}
            />
            <View style={styles.hpBarContainer}>
              <View
                style={[
                  styles.hpBar,
                  { width: `${playerHP}%`, backgroundColor: "#2ecc71" },
                ]}
              />
            </View>
            <Text style={styles.hpLabel}>
              {selectedMyPoke.name}: {playerHP}%
            </Text>
          </>
        )}
      </View>

      {/* Main Attack Button */}
      <TouchableOpacity
        style={[
          styles.attackBtn,
          (gameState !== "playing" || isImgLoading) && {
            backgroundColor: "#95a5a6",
          },
        ]}
        onPress={handleAttack}
        disabled={gameState !== "playing" || isImgLoading}
      >
        <Text style={styles.btnText}>
          {gameState === "playing" ? "ATTACK!" : "GAME OVER"}
        </Text>
      </TouchableOpacity>

      {/* Result Modal (Win/Loss Message) */}
      <Modal
        visible={gameState !== "playing" && !showPicker}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.resultTitle}>
              {gameState === "won"
                ? "VICTORY! 🎉 \nEarned 50 Coins."
                : "DEFEAT 💀 \nLost 10 Coins for medical fees!"}
            </Text>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.backBtnText}>BACK TO LOBBY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  side: { alignItems: "center", marginVertical: 10 },
  imgBox: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  pokemon: { width: 150, height: 150, resizeMode: "contain" },
  hpBarContainer: {
    width: "80%",
    height: 12,
    backgroundColor: "#eee",
    borderRadius: 6,
    overflow: "hidden",
  },
  hpBar: { height: "100%" },
  hpLabel: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  vs: { textAlign: "center", fontSize: 24, fontWeight: "bold", color: "#ccc" },
  attackBtn: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  pickerContainer: { flex: 1, padding: 40, backgroundColor: "#f5f6fa" },
  pickerTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  subTitle: { textAlign: "center", marginBottom: 20, color: "#666" },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
  },
  pickerImg: { width: 50, height: 50, marginRight: 15 },
  pickerName: { fontSize: 18, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    width: "80%",
  },
  resultTitle: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  backBtn: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  backBtnText: { color: "#fff", fontWeight: "bold" },
});
