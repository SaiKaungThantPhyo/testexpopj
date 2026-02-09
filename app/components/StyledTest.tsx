import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styletest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>StyledTest simple red</Text>
      <Text style={styles.bigBlue}>Big Blue Text</Text>
      <Text style={[styles.bigBlue, styles.red]}>big and then Red Text</Text>

      <Text style={[styles.red, styles.bigBlue]}>red and then Big Text</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});
export default styletest;
