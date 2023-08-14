import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { registerUser } from "../../store/features/AuthReducer";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenHeight = 600;

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(true);

  const [lastName, setlastName] = useState("");
  const [isValidlastName, setIsValidlastName] = useState(true);

  const [error, setError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [user, setUser] = useState({
    name: name,
    lastName: lastName,
    email: email,
    password: password,
  });
  const dispatch = useDispatch();

  const validateName = (text) => {
    // Définir la longueur minimale du nom
    const minLength = 2;

    // Expression régulière pour valider le nom (uniquement des lettres alphabétiques)
    const namePattern = /^[a-zA-Z]+$/;

    const isValid = text.length >= minLength && namePattern.test(text);
    setIsValidName(isValid);
    setName(text);
  };
  const validatelastName = (text) => {
    // Définir la longueur minimale du nom
    const minLength = 2;

    // Expression régulière pour valider le nom (uniquement des lettres alphabétiques)
    const namePattern = /^[a-zA-Z]+$/;

    const isValid = text.length >= minLength && namePattern.test(text);
    setIsValidlastName(isValid);
    setlastName(text);
  };

  const validateEmail = (text) => {
    // Expression régulière pour valider le format de l'email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(text);
    setIsValidEmail(isValid);
    setEmail(text);
  };
  const validatePassword = (text) => {
    // Définir la longueur minimale du mot de passe
    const minLength = 8;

    // Vérifier si le mot de passe contient au moins 8 caractères
    const isValid = text.length >= minLength;
    setIsValidPassword(isValid);
    setPassword(text);
  };
  useEffect(() => {
    // Vérifier si tous les champs sont remplis
    const checkFormValidity = () => {
      if (name && lastName && email && password) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [name, lastName, email, password]);

  useEffect(() => {
    //console.log("userrrrrrrrrrrr", user);
  }, [user]);

  const handleSubmit = async () => {
    //console.log("before submit register");

    dispatch(
      registerUser({
        name,
        lastName,
        email,
        password,
      })
    ).then(() => {
      navigation.navigate("login");
    });

    if (isFormValid) {
      dispatch(registerUser({ name, lastName, email, password })).then(() => {
        navigation.navigate("login");
      });
    } else {
      setError(true); // l'affichage d'erreur.
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Créer votre compte</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nom"
            value={name}
            onChangeText={(text) => validateName(text)}
            style={styles.input}
            maxLength={25}
          />
        </View>
        {!isValidName && (
          <Text style={styles.errorText}>Ecrit un Nom valide.</Text>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Prénom"
            value={lastName}
            onChangeText={(text) => validatelastName(text)}
            maxLength={25}
            style={styles.input}
          />
        </View>
        {!isValidlastName && (
          <Text style={styles.errorText}>Ecrit un Prénom valide.</Text>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => validateEmail(text)}
            style={styles.input}
          />
          {!isValidEmail && (
            <Text style={styles.errorText}>
              Veuillez entrer une adresse email valide.
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={(text) => validatePassword(text)}
            style={styles.input}
            secureTextEntry
          />
          {!isValidPassword && (
            <Text style={styles.errorText}>
              Le mot de passe doit contenir au moins 8 caractères.
            </Text>
          )}
        </View>

        <View style={styles.groupbutton}>
          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.disabledButton]} // Appliquer un style différent si le formulaire n'est pas valide
            onPress={handleSubmit}
            disabled={!isFormValid} // Désactiver le bouton si le formulaire n'est pas valide
          >
            <Text style={styles.textbutton}>S'inscrire</Text>
          </TouchableOpacity>

          {error && (
            <Text style={styles.errorText}>
              Veuillez remplir tous les champs avant de vous inscrire.
            </Text>
          )}
          <Text style={{ width: width - 20, textAlign: "center" }}>
            Vous avez déja un compte ?{" "}
            <Text
              style={styles.inscr}
              onPress={() => navigation.navigate("login")}
            >
              Connecter?{" "}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleView: {
    flex: 0.5,
    alignItems: "center",
    textAlign: "center",
    marginTop: height / 6,
    marginBottom: height / 10,
  },

  title: {
    textAlign: "center",
    width: width - 20,

    fontSize: 36,
    fontWeight: "bold",
    color: "#0D0140",
  },
  inputContainer: {
    alignItems: "center",
  },

  input: {
    backgroundColor: "white",
    width: width - 50,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#FFFFFF",
  },
  textbutton: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },

  button: {
    backgroundColor: "#4AB7B6",
    width: width - 120,
    height: 50,
    margin: height / 20,
    padding: 10,
    borderRadius: 5,
  },
  groupbutton: {
    justifyContent: "center",
    alignItems: "center",
  },

  inscr: {
    fontSize: 14,
    color: "#4AB7B6",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
    width: width - 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
