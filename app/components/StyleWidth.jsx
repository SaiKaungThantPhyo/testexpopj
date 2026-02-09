import { Component } from "react";
import { ScrollView, Text, View } from "react-native";

export default class styleWidth extends Component {
  render() {
    return (
      //ScrollView မှာ paddingBottom ကို style ထဲမှာ မရေးဘဲ contentContainerStyle ထဲမှာ ရေးတာက အမှန်ကန်ဆုံးပါ။ ဘာလို့လဲဆိုတော့ ScrollView ရဲ့ Frame ကို padding ပေးတာမဟုတ်ဘဲ အထဲက Content တွေကို padding ပေးချင်တာ ဖြစ်လို့ပါ။
      <ScrollView
        horizontal={true} //ဘေးတိုက် scroll လုပ်ချင်ရင် horizontal=true လို့ရေးရမယ်။
        contentContainerStyle={{
          alignItems: "center",
          flexDirection: "row",
          paddingBottom: 200,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            //marginTop: 50,
            marginRight: 10,
            backgroundColor: "blue",
          }}
        />
        <View
          style={{
            width: 50,
            height: 50,
            marginRight: 10,
            // marginTop: 100,
            backgroundColor: "skyblue",
          }}
        />
        <View
          style={{
            width: 50,
            height: 50,
            marginRight: 10,
            //  marginTop: 150,
            backgroundColor: "red",
          }}
        />
        <Text style={{ fontSize: 20, color: "black" }}>
          styleWidth flexDirection row
        </Text>
      </ScrollView>
    );
  }
}
