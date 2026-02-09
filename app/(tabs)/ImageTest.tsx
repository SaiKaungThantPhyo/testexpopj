import React from "react"; // Component ကို import လုပ်စရာမလိုတော့ပါ
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ImageTest = () => {
  // Pokemon စာရင်းကို Array ထဲ ထည့်ထားမယ်
  const pokemons = [
    { id: 1, name: "Bulbasaur" },
    { id: 4, name: "Charmander" },
    { id: 7, name: "Squirtle" },
    { id: 25, name: "Pikachu" },
  ];
  const handlePress = (name: string) => {
    Alert.alert("Pokemon Selected", `မင်းရွေးလိုက်တာ ${name} လေးပါ!`);
  };
  // arrow function သုံးပြီး တည်ဆောက်ပါတယ်
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pokemon Images</Text>

      {/* ၁။ ပုံမှန် width/height */}
      <View style={styles.imageWrapper}>
        <Text style={styles.imageLabel}>Small (50x50)</Text>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          }}
          style={{ width: 50, height: 50 }}
        />
      </View>

      {/* ၂။ Medium size */}
      <View style={styles.imageWrapper}>
        <Text style={styles.imageLabel}>Medium (100x100)</Text>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
          }}
          style={{ width: 100, height: 100 }}
        />
      </View>

      {/* ၃။ Dynamic sizing (flex) */}
      <View style={styles.flexImageWrapper}>
        <Text style={styles.imageLabel}>Flex (Dynamic Scaling)</Text>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
          }}
          style={styles.responsiveImage}
        />
      </View>
      <TouchableOpacity
        style={styles.flexImageWrapper}
        onPress={() => handlePress("Squirtle")}
      >
        <Text style={styles.imageLabel}>High Quality (Official Artwork)</Text>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
          }}
          style={styles.responsiveImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => console.log("You tapped!")}
      >
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Pokemon List</Text>

      {/* .map() ကိုသုံးပြီး loop ပတ်မယ် */}
      {pokemons.map((pokemon) => (
        <TouchableOpacity
          key={pokemon.id} // တစ်ခုချင်းစီမှာ unique key ရှိရမယ်
          style={styles.imageWrapper}
          onPress={() => handlePress(pokemon.name)}
        >
          <Text style={styles.imageLabel}>{pokemon.name}</Text>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
            }}
            style={{ width: 150, height: 150 }}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  imageWrapper: {
    marginBottom: 30,
    alignItems: "center",
  },
  flexImageWrapper: {
    width: "80%",
    height: 350,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
  },
  responsiveImage: {
    flex: 1,
    width: undefined, // Network image ကို flex နဲ့ချဲ့ရင် width/height: undefined ထားရမယ်
    height: undefined,
    aspectRatio: 1, // ပုံရဲ့ အချိုးအစား မပျက်အောင် ထိန်းပေးတယ်
    resizeMode: "contain", // ပုံကို container ထဲမှာ အပြည့်အဝ ပြသဖို့ contain သုံးတယ်
  },
  imageLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  footerText: {
    marginTop: 50,
    fontSize: 14,
    color: "#888",
  },
});

export default ImageTest;
