import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/AuthReducer";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, token } = useSelector((state) => state.auth);
  const { isLoggedOut } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("user login isloggedout value :(", isLoggedOut, ") ");
    if (isLoggedOut === true) {
      navigation.navigate("login");
    } else {
      navigation.navigate("Home");
    }
  }, [isLoggedOut]);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigation.navigate("login");
    });
  };

  return (
    <View style={styles.container}>
     {/*  <Text style={styles.text}>email : {user.email}</Text>
      <Text style={styles.text}>Nom : {user.name}</Text>
      <Text style={styles.text}>Prénom : {user.lastName}</Text> */}
      <Button onPress={() => handleLogout()} title="logout" color="blue" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
