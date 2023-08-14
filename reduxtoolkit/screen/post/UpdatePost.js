import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { useDispatch, useSelector } from "react-redux";
import {  getPostByUser ,updatePost } from "../../store/features/PostReducer";

const UpdatePost = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const route = useRoute();

  const { user, token } = useSelector((state) => state.auth);

  const postData = route.params?.postData;
  // console.log('heeeeeeeeeeeere',postData)
  useEffect(() => {
    const { postData } = route.params;
    if (postData) {
      setTitle(postData.title);
      setDescription(postData.desc);
    }
  }, [route.params]);
  const dispatch = useDispatch();

  // image picker
  const [imageURI, setImageURI] = useState(null);
  const selectImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      // console.log(pickerResult);

      if (!pickerResult.canceled) {
        const selectedImage = pickerResult.assets[0];
        setImageURI(selectedImage.uri);

        const formdata = new FormData();
        formdata.append("picker", {
          uri: pickerResult.assets[0].uri,
          type: pickerResult.assets[0].type,
          fileName: pickerResult.assets[0].fileName,
        });

        if (formdata.getParts) {
          const parts = formdata.getParts();
          console.log(parts[0].fileName); // [{ name: "picker", value: { key: "value" } }]
        }

        // Perform the image upload process here
        // You can use a library like Axios to make an API call to upload the image
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  const UpdateSubmit = () => {
    const userid = user._id;
    const idPost = postData._id;
    console.log("id post ", idPost);
    const userEmail = user.email;
    console.log(userEmail);
    dispatch(
      updatePost({
        idPost,
        userEmail,
        title,
        desc: description,
        photo: "photo",
      })
    ).then(() => {
      dispatch(getPostByUser(userid))
      navigation.navigate("mesPub",{ postData}) 
    });
  };

  return (
    <ScrollView>
      <View style={styles.head}>
        <Text
          style={styles.buttonhead}
          onPress={() => navigation.navigate("hometab")}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </Text>
        <Text style={styles.texthead}>Modifier poste</Text>
      </View>

      <View style={styles.titleBloc}>
        <Text style={styles.title}>Titre</Text>
        <TextInput
          placeholder="Écrivez ici le titre de votre Publication"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
        <Text style={styles.title}>Description</Text>
        <TextInput
          placeholder="Écrivez ici une description de votre Publication"
          editable
          multiline
          numberOfLines={4}
          maxLength={220}
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.descinput}
        />
      </View>

      <View style={styles.sub}>
        <TouchableOpacity style={styles.icons} onPress={selectImage}>
          <Text style={styles.icon}>
            <FontAwesome name="photo" size={28} color="gray" />
          </Text>
          {imageURI && (
            <Image
              source={{ uri: imageURI }}
              style={{ marginLeft: 20, width: 30, height: 30, borderRadius: 3 }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={UpdateSubmit}>
          <Text style={styles.textbutton}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdatePost;

const styles = StyleSheet.create({
  head: {
    backgroundColor: "#AF558B",
    flexDirection: "row",
  },
  buttonhead: {
    marginLeft: 20,
    marginTop: 60,
    marginBottom: 10,
  },
  texthead: {
    fontSize: 22,
    marginLeft: 20,
    marginTop: 60,
    marginBottom: 15,
  },
  mespub: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 8,
    flexDirection: "row-reverse",
  },
  textmp: {
    color: "#AF558B",
  },

  input: {
    backgroundColor: "white",
    width: 317,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
  },
  titleBloc: {
    margin: 20,
  },
  descinput: {
    backgroundColor: "white",
    width: 317,
    height: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#FFFFFF",
  },
  sub: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    flexDirection: "row",
    margin: 20,
  },
  icon: {
    marginLeft: 20,
  },

  button: {
    margin: 20,
    marginRight: 30,
  },
  textbutton: {
    fontSize: 20,
    textAlign: "center",
    color: "#4AB7B6",
  },
});
