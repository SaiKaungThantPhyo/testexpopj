import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Pokemon = () => {
  const [pokemons, setPokemon] = useState([]);
  useEffect(() => {
    //fetch pokemon
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10",
      );
      const data = await response.json();
      setPokemon(data.results);
      //   console.log(data.results);
    } catch (error) {
      alert("Network Error: " + error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, marginTop: 50 }}>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name} style={styles.itemContainer}>
          <Text style={styles.text}>{pokemon.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textTransform: "capitalize",
  },
});

export default Pokemon;
