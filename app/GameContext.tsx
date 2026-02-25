import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [coins, setCoins] = useState(500);
  const [myBag, setMyBag] = useState([
    {
      id: "25",
      name: "Pikachu",
      lv: 10,
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
  ]);

  // အက်ပ်စဖွင့်တာနဲ့ သိမ်းထားတဲ့ Data တွေကို ပြန်ယူမယ်
  useEffect(() => {
    const loadGameData = async () => {
      try {
        const savedCoins = await AsyncStorage.getItem("coins");
        const savedBag = await AsyncStorage.getItem("myBag");

        if (savedCoins !== null) setCoins(JSON.parse(savedCoins));
        if (savedBag !== null) setMyBag(JSON.parse(savedBag));
      } catch (error) {
        console.error("Failed to load game data:", error);
      }
    };

    loadGameData();
  }, []);

  // ပိုက်ဆံဝယ်တဲ့ Function
  const buyPokemon = async (pokemon) => {
    const isAlreadyOwned = myBag.some((p) => p.id === pokemon.id);

    if (isAlreadyOwned) return "owned";

    if (coins >= pokemon.price) {
      try {
        // ၁။ State ကို Update လုပ်မယ် (Functional Update ထဲမှာ AsyncStorage ကို တန်းသိမ်းတယ်)
        setCoins((prevCoins) => {
          const updatedCoins = prevCoins - pokemon.price;
          AsyncStorage.setItem("coins", JSON.stringify(updatedCoins));
          return updatedCoins;
        });

        setMyBag((prevBag) => {
          const updatedBag = [...prevBag, { ...pokemon, lv: 1 }];
          AsyncStorage.setItem("myBag", JSON.stringify(updatedBag));
          return updatedBag;
        });

        // အောင်မြင်သွားရင် true ပြန်ပေးမယ်
        return true;
      } catch (e) {
        console.error("Storage error:", e);
        return false;
      }
    }
    return false;
  };

  // ပိုက်ဆံတိုးတဲ့ Function (Battle နိုင်တဲ့အခါ သုံးဖို့)
  const addCoins = async (amount) => {
    setCoins((prev) => {
      const updatedCoins = prev + amount;
      AsyncStorage.setItem("coins", JSON.stringify(updatedCoins));
      return updatedCoins;
    });
  };
  // GameContext.tsx ထဲက addCoins အောက်မှာ ဒါလေး ထည့်ပေးပါ
  const removeCoins = async (amount) => {
    setCoins((prev) => {
      const updatedCoins = Math.max(0, prev - amount); // 0 ထက်တော့ မနည်းစေရဘူး
      AsyncStorage.setItem("coins", JSON.stringify(updatedCoins));
      return updatedCoins;
    });
  };

  // return value ထဲမှာ removeCoins ကိုပါ ထည့်ပေးဖို့ မမေ့ပါနဲ့
  return (
    <GameContext.Provider
      value={{ coins, myBag, buyPokemon, addCoins, removeCoins }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
export default GameProvider;
