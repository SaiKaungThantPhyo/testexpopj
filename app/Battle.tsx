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
  const { myBag, addCoins } = useGame();

  // States
  const [selectedMyPoke, setSelectedMyPoke] = useState(null); // ကိုယ်ရွေးလိုက်တဲ့အကောင်
  const [showPicker, setShowPicker] = useState(true); // အကောင်ရွေးဖို့ modal
  const [enemyID, setEnemyID] = useState(null);
  const [isImgLoading, setIsImgLoading] = useState(true); // Loading state

  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [enemyOpacity, setEnemyOpacity] = useState(1);
  const [playerOpacity, setPlayerOpacity] = useState(1);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing",
  );

  useEffect(() => {
    // Enemy ကို random ရွေးမယ်
    const randomID = Math.floor(Math.random() * 151) + 1;
    setEnemyID(randomID);
  }, []);

  const handleAttack = () => {
    if (gameState !== "playing" || !selectedMyPoke) return;

    // Player Attack
    setEnemyOpacity(0.2);
    setTimeout(() => setEnemyOpacity(1), 100);
    const dmgToEnemy = Math.floor(Math.random() * 25) + 15;
    const newEHP = Math.max(0, enemyHP - dmgToEnemy);
    setEnemyHP(newEHP);

    if (newEHP <= 0) {
      setGameState("won");
      addCoins(50);
      return;
    }

    // Enemy Attack
    setTimeout(() => {
      setPlayerOpacity(0.2);
      setTimeout(() => setPlayerOpacity(1), 100);
      const dmgToPlayer = Math.floor(Math.random() * 20) + 10;
      const newPHP = Math.max(0, playerHP - dmgToPlayer);
      setPlayerHP(newPHP);
      if (newPHP <= 0) setGameState("lost");
    }, 600);
  };

  return (
    <View style={styles.container}>
      {/* 1. Selection Modal - အိတ်ထဲက အကောင်ရွေးရန် */}
      <Modal visible={showPicker} animationType="slide">
        <View style={styles.pickerContainer}>
          {/* အပေါ်က နောက်ပြန်ဆုတ်ခလုတ် */}
          <TouchableOpacity
            style={{ alignSelf: "flex-start", marginBottom: 10 }}
            onPress={() => router.back()} // Lobby ကို ပြန်သွားမယ်
          >
            <Ionicons name="arrow-back" size={30} color="#333" />
          </TouchableOpacity>

          <Text style={styles.pickerTitle}>Select Your Pokémon</Text>

          {/* ဒီ FlatList အပိုင်းကို ထည့်ပေးပါ */}
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
                <Text style={styles.pickerName}>
                  {item.name} (Lv. {item.lv || 1})
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Enemy Side */}
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
            onLoadEnd={() => setIsImgLoading(false)} // ပုံတက်လာရင် loading ပိတ်မယ်
          />
        </View>
        <Text style={styles.hpLabel}>Wild Pokémon: {enemyHP}%</Text>
      </View>

      <Text style={styles.vs}>VS</Text>

      {/* Player Side */}
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

      {/* Victory/Defeat Modal (အရင်အတိုင်း) */}
      <Modal
        visible={gameState !== "playing" && !showPicker}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.resultTitle}>
              {gameState === "won"
                ? "VICTORY! 🎉 \n💰 50 ရရှိပါတယ်။"
                : "DEFEAT 💀"}
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
  // Picker Styles
  pickerContainer: { flex: 1, padding: 40, backgroundColor: "#f5f6fa" },
  pickerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
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
  // Modal (Result) Styles
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
