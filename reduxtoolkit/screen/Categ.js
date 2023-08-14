import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Categ = () => {
  const navigation = useNavigation();
  const profilsData = [
    {
      id: 1,
      name: "Dhia Kacem",
      rating: "4.1/5",
      location: "Sousse",
      image: require("../assets/dia.jpg"),
    },
    {
      id: 2,
      name: "Hassine Moemen",
      rating: "2/5",
      location: "Tunis",
      image: require("../assets/profile.jpeg"),
    },
    {
      id: 3,
      name: "kazdar ahmed",
      rating: "5/5",
      location: "Tunis",
      image: require("../assets/kazdar.jpg"),
    },
  ];
  return (
    <View>
      <View style={styles.head}>
        <Text
          style={styles.buttonhead}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </Text>
        <Text style={styles.textCat}></Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profilsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ProfView}
            onPress={() => navigation.navigate("profilProf")}
          >
            <View style={styles.imgView}>
              <Image source={item.image} style={styles.profImage} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.rating}</Text>
              <Text>
                <Ionicons name="location" size={20} color="black" />{" "}
                {item.location}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categ;

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",

    backgroundColor: "gray",
  },
  buttonhead: {
    marginLeft: 20,
    marginTop: 60,
    marginBottom: 10,
  },
  textCat: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 60,
  },
  ProfView: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 8,
  },
  textView: {
    margin: 20,
  },
  text: {
    fontSize: 15,
    marginBottom: 8,
  },

  profImage: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 20,
  },
});
