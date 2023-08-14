import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  deletePost,
  getPost,
  getPostByUser,
} from "../../store/features/PostReducer";
import { ModalSup } from "../../components/modal/ModalSup";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenHeight = 600;

const MesPubScreen = () => {
  const navigation = useNavigation();
  const [postId, setPostId] = useState();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const dispatch = useDispatch();

  const myPosts = useSelector((state) => state.posts.PostsByUser);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    setPosts(myPosts);
  }, [myPosts]);
  useEffect(() => {}, [posts]);

  const handleModalClose = () => {
    setMenuVisible(false);
  };

  const handleModalOpen = (id) => {
    console.log(id);
    setMenuVisible(true);
    setPostId(id);
  };

  const handleDelete = (id) => {
    console.log(`Delete publication with id ${id}`);
    const userid = user._id;
    const userEmail = user.email;
    console.log("user email", userEmail);

    dispatch(deletePost({ id, userEmail })).then(() => {
      dispatch(getPostByUser(userid));
    });
    setMenuVisible(false);
  };

  const findPost = (id) => {
    console.log(`Update publication with id ${id}`);
    const foundPost = posts.find((item) => item._id === id);
    return foundPost;
  };

  useEffect(() => {
    //console.log("post===", post);
  }, [post]);

  const handleUpdate = (id) => {
    //console.log(`Update publication with id ${id}`);
    const data = findPost(id);
    //console.log("post===aa", data);
    navigation.navigate("updatePost", { postData: data });

  };

  const renderPublicationItem = ({ item }) => (
    <View key={item._id} style={styles.pub}>
      <View style={styles.icons}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => handleModalOpen(item._id)}
        >
          <AntDesign name="delete" size={25} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdate(item._id)}>
          <MaterialCommunityIcons name="update" size={25} color="#4AB7B6" />
        </TouchableOpacity>
      </View>
      <View style={styles.pubImageView}>
        <Image source={item.image} style={styles.pubImage} />
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.user}>{item.email}</Text>
      <Text style={styles.desc}>{item.desc.substring(0, 200)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.head}>
          <Text
            style={styles.buttonhead}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={30} color="black" />
          </Text>
          <Text style={styles.textCat}>Mes Publications</Text>
        </View>

      <FlatList
        style={styles.flatList}
        data={posts}
        renderItem={renderPublicationItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />

      <ModalSup
        visible={isMenuVisible}
        onClose={handleModalClose}
        onHide={handleModalClose}
        handleSubmit={() => handleDelete(postId)}
      />
    </View>
  );
};

export default MesPubScreen;

const styles = StyleSheet.create({
  head: {
    backgroundColor: "gray",
    flexDirection: "row",
  },
  flatList: {
    marginBottom: 120,
  },
  buttonhead: {
    marginLeft: 20,
    marginTop: 70,
    marginBottom: 10,
  },
 
  backButton: {
    marginLeft: 20,
  },

  textCat: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 72,
  },
  icons: {
    flexDirection: "row-reverse",
    marginTop: 10,
  },
  icon: {
    marginRight: 20,
  },
  pubImage: {
    width: 360,
    height: 200,
    margin: 10,
    marginRight: 10,
  },

  pub: {
    marginTop: 5,
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
