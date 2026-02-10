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

  // ဂိမ်းဖွင့်လိုက်တာနဲ့ သိမ်းထားတဲ့ Data တွေ ပြန်ယူမယ်
  useEffect(() => {
    loadGameData();
  }, []);

  const loadGameData = async () => {
    const savedCoins = await AsyncStorage.getItem("coins");
    const savedBag = await AsyncStorage.getItem("myBag");
    if (savedCoins) setCoins(JSON.parse(savedCoins));
    if (savedBag) setMyBag(JSON.parse(savedBag));
  };

  const buyPokemon = async (pokemon) => {
    if (coins >= pokemon.price) {
      const newCoins = coins - pokemon.price;
      const newBag = [...myBag, { ...pokemon, lv: 1 }];
      setCoins(newCoins);
      setMyBag(newBag);
      await AsyncStorage.setItem("coins", JSON.stringify(newCoins));
      await AsyncStorage.setItem("myBag", JSON.stringify(newBag));
      return true;
    }
    return false;
  };

  return (
    <GameContext.Provider value={{ coins, myBag, buyPokemon }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
export default GameProvider;
