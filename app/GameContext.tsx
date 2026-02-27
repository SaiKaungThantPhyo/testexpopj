import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [coins, setCoins] = useState(500);
  const [myBag, setMyBag] = useState([
    {
      id: "25",
      name: "Pikachu",

      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
  ]);

  // Battle counter state for the "3-match losing algorithm"
  const [battleCount, setBattleCount] = useState(0);

  // Load saved data when the app initializes
  useEffect(() => {
    const loadGameData = async () => {
      try {
        const savedCoins = await AsyncStorage.getItem("coins");
        const savedBag = await AsyncStorage.getItem("myBag");
        const savedCount = await AsyncStorage.getItem("battleCount");

        if (savedCoins !== null) setCoins(JSON.parse(savedCoins));
        if (savedBag !== null) setMyBag(JSON.parse(savedBag));
        if (savedCount !== null) setBattleCount(JSON.parse(savedCount));
      } catch (error) {
        console.error("Failed to load game data:", error);
      }
    };
    loadGameData();
  }, []);

  // Function to increment battle count and save to storage
  const incrementBattle = async () => {
    const nextCount = battleCount + 1;
    setBattleCount(nextCount);
    await AsyncStorage.setItem("battleCount", JSON.stringify(nextCount));
  };

  // Logic to purchase a new Pokemon
  const buyPokemon = async (pokemon) => {
    const isAlreadyOwned = myBag.some((p) => p.id === pokemon.id);
    if (isAlreadyOwned) return "owned";

    if (coins >= pokemon.price) {
      try {
        const newCoins = coins - pokemon.price;
        const newBag = [...myBag, { ...pokemon }];

        // Update both state and persistent storage
        setCoins(newCoins);
        setMyBag(newBag);
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

  // Add coins after a victory
  const addCoins = async (amount) => {
    const updatedCoins = coins + amount;
    setCoins(updatedCoins);
    await AsyncStorage.setItem("coins", JSON.stringify(updatedCoins));
  };

  // Remove coins after a defeat (penalty)
  const removeCoins = async (amount) => {
    const updatedCoins = Math.max(0, coins - amount);
    setCoins(updatedCoins);
    await AsyncStorage.setItem("coins", JSON.stringify(updatedCoins));
  };

  return (
    <GameContext.Provider
      value={{
        coins,
        myBag,
        battleCount,
        buyPokemon,
        addCoins,
        removeCoins,
        incrementBattle,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for easy access to GameContext
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export default GameProvider;
