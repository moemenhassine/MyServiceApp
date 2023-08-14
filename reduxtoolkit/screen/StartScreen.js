import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenHeight = 600;
const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <Text style={styles.text1}>
          VITE <Text style={styles.text12}>FAIT</Text>{" "}
        </Text>
      </View>
      <View style={styles.imageView}>
        <Image source={require("../assets/logo.png")} style={styles.image} />
      </View>
      <View>
        <Text style={styles.textp}>
          TROUVER LE MEILLEUR PROFESSIONNEL CHEZ TOI
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.textbutton}>
            <AntDesign name="arrowright" size={43} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  text1: {
    marginTop: 70,
    marginLeft: 270,
    color: "#AF558B",
    fontSize: 20,
  },

  text12: {
    marginTop: 70,
    marginLeft: 270,
    color: "#4AB7B6",
    fontSize: 20,
  },
  imageView: {
    alignItems: "center",
    width: width,
    marginTop: height / 20,
  },

  textp: {
    fontSize: height >= screenHeight ? 32 : 37,
    width: width - 50,
    margin: width / 10,
  },

  button: {
    backgroundColor: "#4AB7B6",
    width: 80,
    height: 80,
    marginLeft: width / 1.45,
    borderRadius: 80,
  },
  textbutton: {
    textAlign: "center",
    marginVertical: 17,
  },
});
