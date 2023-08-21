import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FontAwesome5,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { fetchPosts, getPostByUser } from "../store/features/PostReducer";
import { logout } from "../store/features/AuthReducer";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //all state

  const [searchValue, setSearchValue] = useState("");

  const { Posts } = useSelector((state) => state.posts);
  const { user, token } = useSelector((state) => state.auth);
  const { isLoggedOut } = useSelector((state) => state.auth);

  useEffect(() => {
    const userid = user._id;

    dispatch(getPostByUser(userid));
  }, []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigation.navigate("login");
    });
  };

  const handleSearch = () => {
    // Effectuez la logique de recherche ici en utilisant la valeur de `searchValue`
    // Mettez à jour l'état `searchResults` avec les résultats de la recherche
    console.log("Recherche:", searchValue);
    // Réinitialiser la valeur de recherche
    setSearchValue("");
  };

  const categories = [
    { icon: "tools", name: "Plomberie" },
    { icon: "broom", name: "Ménage et netoyage" },
    { icon: "face-woman", name: "Beauté et bien être" },
    { icon: "tools", name: "Électricité" },
  ];
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categorieIbutton}
      onPress={() => navigation.navigate("categ")}
    >
      <Text style={styles.textbutton}>
        {item.icon === "tools" && (
          <Entypo name="tools" size={30} color="white" />
        )}
        {item.icon === "broom" && (
          <MaterialCommunityIcons name="broom" size={30} color="white" />
        )}
        {item.icon === "face-woman" && (
          <MaterialCommunityIcons name="face-woman" size={24} color="white" />
        )}
      </Text>
      <Text style={styles.textbutton}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("postDetails")}
        style={styles.pub}
      >
        <View style={styles.pubImageView}>
          <Image
            source={require("../assets/pub.jpg")}
            style={styles.pubImage}
          />
        </View>
        <Text style={styles.title}> {item.title.substring(0, 20)} </Text>
        <Text style={styles.user}> {item.email}</Text>
        <Text style={styles.desc}> {item.desc.substring(0, 30)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <Text style={styles.text1}>
          VITE <Text style={styles.text12}>FAIT</Text>
        </Text>

        <TouchableOpacity style={styles.button}
        onPress={() => handleLogout()}>
          <Text style={{padding:7}}><Ionicons name="exit-outline" size={24} color="black" /></Text>
        </TouchableOpacity>
      </View>
      {/* /////////////////block recherche///////////// */}

      <View style={styles.recherche}>
        <TextInput
          placeholder="Rechercher n'importe quoi..."
          value={searchValue}
          onChangeText={setSearchValue}
          style={styles.rechInput}
        />
        <TouchableOpacity style={styles.rechButton} onPress={handleSearch}>
          <Text>
            <FontAwesome5 name="search" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>

      {/* /////////////////block categorie///////////// */}
      
      <View style={styles.categorie}>
        <Text style={styles.textCat}>Services</Text>
        <TouchableOpacity
          style={styles.plus}
          onPress={() => navigation.navigate("allService")}
        >
          <Text style={styles.textPlus}>Voir plus <AntDesign name="rightcircle" size={10} color="black" /></Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categorieIcons}
      />

      {/* ////////////////////block publication///////////////////////  */}

      <View style={styles.pubTitre}>
        <Text style={styles.textCat}>Annonces</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={Posts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70,
  },
  loginText: {
    fontSize: 20,
    marginRight: 20,
    color: "gray",
  },
  text1: {
    marginTop: 10,
    marginLeft: 20,
    color: "#AF558B",
    fontSize: 20,
  },
  text12: {
    marginTop: 70,
    color: "#4AB7B6",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#4AB7B6",
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 20,
  },
  textbutton: {
    textAlign: "center",
    marginTop: 8,
    color: "white",
  },
  rechInput: {
    marginTop: 30,
    backgroundColor: "white",
    height: 50,
    margin: 12,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#FFFFFF",
  },
  recherche: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rechButton: {
    backgroundColor: "#4AB7B6",
    width: 50,
    height: 50,
    padding: 13,
    borderRadius: 10,
    marginTop: 30,
    marginRight: 12,
  },
  categorie: {
    marginTop: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "white",
  },
  textCat: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 5,
  },
  plus: {
    marginRight: 10,
   
  },
  textPlus:{
    margin :8,
    fontSize:10,
    fontFamily: ""
  },
  categorieIcons: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  categorieIbutton: {
    backgroundColor: "#4AB7B6",
    width: 100,
    height: 100,
    margin: 12,
    padding: 10,
    borderRadius: 15,
  },
  pubImageView: {
    alignItems: "center",
  },
  pubImage: {
    width: 360,
    height: 200,
    margin: 10,
  },
  pub: {
    backgroundColor: "white",
  },
  pubTitre: {
    marginTop: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
  },
  user: {
    marginLeft: 30,
    fontSize: 16,
    color: "gray",
  },
  desc: {
    marginLeft: 20,
    margin: 10,
  },
});
