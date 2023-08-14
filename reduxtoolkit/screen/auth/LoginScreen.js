import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/features/AuthReducer";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenHeight = 600;

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user, token, isLoggedIn, loginStatus } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const checkFormValidity = () => {
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  };

  // Appel de la fonction pour vérifier la validité du formulaire chaque fois que les champs sont modifiés
  const handleEmailChange = (text) => {
    setEmail(text);
    checkFormValidity();
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    checkFormValidity();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // login submit
  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        dispatch(loginUser({ email, password }))
          .unwrap()
          .then(() => {
            navigation.navigate("Home");
          })
          .catch((err) => {
            navigation.navigate("login");
            console.log("im here", err);
            setErrorMessage(err.message);
          });
      } catch (err) {
        console.error("Erreur d'authentification :", err);
        setErrorMessage(err);
        // Gérez les erreurs d'authentification
      }
    } else {
      setErrorMessage(
        "Veuillez remplir tous les champs avant de vous connecter."
      );
    }
  };
  useEffect(() => {
    if (user !== null) {
      navigation.navigate("hometab");
    } else {
      navigation.navigate("login");
    }
  }, [user, isLoggedIn, loginStatus]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Bienvenue</Text>
          {/* Affichez le message d'erreur s'il y en a un */}

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainerPass}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Mot de passe"
              value={password}
              onChangeText={handlePasswordChange}
              style={styles.input}
              secureTextEntry={!showPassword}
            />
          </View>
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeButton}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.groupbutton}>
          {/* Utilisez isFormValid pour activer ou désactiver le bouton de connexion */}
          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!isFormValid}
          >
            <Text style={styles.textbutton}>Se connecter</Text>
          </TouchableOpacity>

          <Text style={{ width: width - 20, textAlign: "center" }}>
            Vous n'avez pas encore de compte ?{" "}
            <Text
              style={styles.inscr}
              onPress={() => navigation.navigate("register")}
            >
              S'inscrire
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
   width :width ,
   alignItems:"center"
  },

  inputContainerPass: {
    alignItems: "center",
    flexDirection: "row",
  },
  eyeButton: {
    padding: 8,
    right: 70,
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
    fontSize: 15,
    marginTop: 15,
    width: width - 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
