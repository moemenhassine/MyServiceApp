import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { AntDesign } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";

const AllService = () => {
    const navigation = useNavigation();

    const servicesData = [
      {
        id: 1,
        title: "Chauffeur",
        image: require("../assets/chauffeur.png"),
        nav :  "categ",
      },
      {
        id: 2,
        title: "Plombérie",
        image: require("../assets/tools.png"),
        nav: "categ"
      },
      {
        id: 3,
        title: "Babysiter",
        image: require("../assets/baby.jpg"),
        nav: "categ"
      },
      {
        id: 4,
        title: "Couture",
        image: require("../assets/couture.png"),
        nav: "categ"
      },
      {
        id: 5,
        title: "Déménagement",
        image: require("../assets/demenagement.png"),
        nav: "categ"
      },
      {
        id: 6,
        title: "Ménage et netoyage",
        image: require("../assets/clean.jpg"),
        nav: "categ"
      },
      {
        id: 7,
        title: "éléctricien",
        image: require("../assets/electronique.png"),
        nav: "categ"
      },
      {
        id: 8,
        title: "Service auto",
        image: require("../assets/auto.webp"),
        nav: "categ"
      },
      {
        id: 9,
        title: "Service bateau",
        image: require("../assets/bateau.jpg"),
        nav: "categ"
      },
  
      // Ajoutez les autres services ici
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
          <Text style={styles.textCat}>Nos services</Text>
        </View>
  
        <FlatList
          data={servicesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.services}
              onPress={() => navigation.navigate(item.nav)}
            >
              <View style={styles.imgView}>
                <Image source={item.image} style={styles.categImg} />
              </View>
              <Text style={styles.textService}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  
  export default AllService;
  
  const styles = StyleSheet.create({
    head: {
      flexDirection: "row",
      backgroundColor: "gray",
    },
    buttonhead: {
      marginLeft: 20,
      marginTop: 70,
      marginBottom: 10,
    },
    textCat: {
      fontSize: 20,
      marginLeft: 20,
      marginTop: 70,
    },
    services: {
      flexDirection: "row",
      backgroundColor: "white",
      margin: 8,
      borderRadius: 10,
    },
    categImg: {
      height: 30,
      width: 30,
      borderRadius: 5,
      margin: 15,
    },
    textService: {
      fontSize: 18,
      marginTop: 20,
      color: "#4AB7B6",
    },
    buttonService: {
      margin: 20,
    },
  });
  