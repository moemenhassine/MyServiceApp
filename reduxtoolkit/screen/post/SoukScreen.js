import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/features/PostReducer";
import { useNavigation } from "@react-navigation/native";

const SoukScreen = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const Posts = useSelector((state) => state.posts.Posts);

  /*  useEffect(() => {

    dispatch(fetchPosts())
  },[]); */
  useEffect(() => {
    setPosts(Posts);
  }, [Posts]);
  useEffect(() => {
    //console.log("Souk posts",posts);
  }, [posts]);

  const renderPublicationItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("postDetails")}
      key={item._id}
      style={styles.pub}
    >
      <View style={styles.pubImageView}>
        <Image source={item.image} style={styles.pubImage} />
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.user}>{item.email}</Text>
      <Text style={styles.desc}>{item.desc.substring(0, 200)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.texthead}>Annonces</Text>
      </View>

      <FlatList
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={renderPublicationItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default SoukScreen;

const styles = StyleSheet.create({
  container: {},

  head: {
    backgroundColor: "gray",
  },
  texthead: {
    fontSize: 22,
    marginLeft: 20,
    marginTop: 60,
    marginBottom: 15,
  },
  flatList: {
    marginBottom: 120,
  },
  user: {
    marginLeft: 30,
    fontSize: 16,
    color: "gray",
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
    marginTop: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
    margin: 10,
  },
});
