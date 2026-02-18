import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// ၁။ GameContext ကို import လုပ်ပါ
import { useGame } from "./GameContext";

export default function BattleScreen() {
  const router = useRouter();

  // ၂။ addCoins function ကို context ထဲကနေ ယူသုံးမယ်
  const { addCoins } = useGame();

  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [enemyOpacity, setEnemyOpacity] = useState(1);
  const [playerOpacity, setPlayerOpacity] = useState(1);
  const [enemyID, setEnemyID] = useState(1);
  const [coins, setCoins] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing",
  );

  useEffect(() => {
    const randomID = Math.floor(Math.random() * 151) + 1;
    setEnemyID(randomID);
  }, []);

  const handleAttack = () => {
    if (gameState !== "playing") return;

    setEnemyOpacity(0.2);
    setTimeout(() => setEnemyOpacity(1), 100);

    const damageToEnemy = Math.floor(Math.random() * 25) + 15;
    const newEnemyHP = Math.max(0, enemyHP - damageToEnemy);
    setEnemyHP(newEnemyHP);

    if (newEnemyHP <= 0) {
      setGameState("won");

      // ၃။ ဒီနေရာမှာ addCoins ကို ခေါ်လိုက်တာပါ
      addCoins(50);
      return;
    }

    setTimeout(() => {
      setPlayerOpacity(0.2);
      setTimeout(() => setPlayerOpacity(1), 100);

      const damageToPlayer = Math.floor(Math.random() * 20) + 10;
      const newPlayerHP = Math.max(0, playerHP - damageToPlayer);
      setPlayerHP(newPlayerHP);

      if (newPlayerHP <= 0) {
        setGameState("lost");
      }
    }, 600);
  };

  return (
    <View style={styles.container}>
      {/* UI ပိုင်းက အရင်အတိုင်းပဲ ထားလို့ရပါတယ် */}
      <View style={styles.coinBadge}>
        <Text style={styles.coinText}>💰 Coins: {coins}</Text>
      </View>

      {/* Enemy Section */}
      <View style={styles.side}>
        <Text style={styles.hpLabel}>Enemy HP: {enemyHP}%</Text>
        <View style={styles.hpBarContainer}>
          <View
            style={[
              styles.hpBar,
              { width: `${enemyHP}%`, backgroundColor: "#e74c3c" },
            ]}
          />
        </View>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${enemyID}.png`,
          }}
          style={[styles.pokemon, { opacity: enemyOpacity }]}
        />
      </View>

      <Text style={styles.vs}>VS</Text>

      {/* Player Section */}
      <View style={styles.side}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
          }}
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
        <Text style={styles.hpLabel}>Pikachu (You): {playerHP}%</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.attackBtn,
          gameState !== "playing" && { backgroundColor: "#95a5a6" },
        ]}
        onPress={handleAttack}
        disabled={gameState !== "playing"}
      >
        <Text style={styles.btnText}>
          {gameState === "playing" ? "ATTACK!" : "GAME OVER"}
        </Text>
      </TouchableOpacity>

      <Modal visible={gameState !== "playing"} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.resultTitle}>
              {gameState === "won" ? "VICTORY! 🎉" : "DEFEAT 💀"}
            </Text>
            <Text style={styles.resultMessage}>
              {gameState === "won"
                ? `ရန်သူကို နိုင်လိုက်ပြီ! \n +50 Coins ကို သိမ်းဆည်းလိုက်ပါပြီ။`
                : "Pikachu မေ့လဲသွားပါပြီ။"}
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

// Styles ကတော့ မင်းရဲ့ မူရင်းအတိုင်းပဲ ဆက်သုံးလို့ရပါတယ် (backBtnText မှာ quote ပိတ်ဖို့ မမေ့ပါနဲ့)
const styles = StyleSheet.create({
  // ... မင်းရဲ့ မူရင်း styles များ
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
    padding: 20,
    justifyContent: "center",
  },
  coinBadge: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#f1c40f",
    padding: 10,
    borderRadius: 20,
  },
  coinText: { fontWeight: "bold", color: "#000" },
  side: { alignItems: "center", marginVertical: 10 },
  pokemon: { width: 150, height: 150, resizeMode: "contain" },
  hpBarContainer: {
    width: "80%",
    height: 12,
    backgroundColor: "#ecf0f1",
    borderRadius: 6,
    marginVertical: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#bdc3c7",
  },
  hpBar: { height: "100%" },
  hpLabel: { fontSize: 16, fontWeight: "bold" },
  vs: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#bdc3c7",
  },
  attackBtn: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  btnText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
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
  resultTitle: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  resultMessage: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  backBtn: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  backBtnText: { color: "#fff", fontWeight: "bold" }, // ဒီမှာ quote ပြင်ထားတယ်
});
