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

  // Load data when app starts
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

  // Purchase Pokemon logic
  const buyPokemon = async (pokemon) => {
    const isAlreadyOwned = myBag.some((p) => p.id === pokemon.id);

    if (isAlreadyOwned) return "owned";

    if (coins >= pokemon.price) {
      try {
        const newCoins = coins - pokemon.price;
        const newBag = [...myBag, { ...pokemon, lv: 1 }];

        // Update State
        setCoins(newCoins);
        setMyBag(newBag);

        // Update Storage
        await AsyncStorage.setItem("coins", JSON.stringify(newCoins));
        await AsyncStorage.setItem("myBag", JSON.stringify(newBag));

        return true;
      } catch (e) {
        console.error("Storage error:", e);
        return false;
      }
    }
    return false;
  };

  // Add coins (e.g., after winning a battle)
  const addCoins = async (amount) => {
    const updatedCoins = coins + amount;
    setCoins(updatedCoins);
    try {
      await AsyncStorage.setItem("coins", JSON.stringify(updatedCoins));
    } catch (e) {
      console.error("Failed to add coins:", e);
    }
  };

  // Remove coins (e.g., after losing a battle)
  const removeCoins = async (amount) => {
    const updatedCoins = Math.max(0, coins - amount);
    setCoins(updatedCoins);
    try {
      await AsyncStorage.setItem("coins", JSON.stringify(updatedCoins));
    } catch (e) {
      console.error("Failed to remove coins:", e);
    }
  };

  return (
    <GameContext.Provider
      value={{ coins, myBag, buyPokemon, addCoins, removeCoins }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export default GameProvider;
