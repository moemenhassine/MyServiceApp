import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import StartScreen from "../screen/StartScreen";
import LoginScreen from "../screen/auth/LoginScreen";
import RegisterScreen from "../screen/auth/RegisterScreen";
import Tabs from "./Tabs";
import AddPostScreen from "../screen/post/AddPostScreen";
import MesPubScreen from "../screen/post/MesPubScreen";
import UpdatePost from "../screen/post/UpdatePost";
import PostDetails from "../screen/post/PostDetails";
import Categ from "../screen/Categ";
import AllService from "../screen/AllService";
import ProfileProfessionel from "../screen/ProfileProfessionel";

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="startScreen" component={StartScreen} />
      <Stack.Screen name="hometab" component={Tabs} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="allService" component={AllService} />
      <Stack.Screen name="addPost" component={AddPostScreen} />
      <Stack.Screen name="categ" component={Categ} />
      <Stack.Screen name="mesPub" component={MesPubScreen} />
      <Stack.Screen name="updatePost" component={UpdatePost} />
      <Stack.Screen name="postDetails" component={PostDetails} />
      <Stack.Screen name="profilProf" component={ProfileProfessionel} />
    </Stack.Navigator>
  );
};

export default AppStack;
