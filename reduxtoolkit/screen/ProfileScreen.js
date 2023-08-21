import React, { useState, useMemo, useEffect } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker, {
  getFormatedDate,
  getToday,
} from "react-native-modern-datepicker";
import * as ImagePicker from "expo-image-picker";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/AuthReducer";
import { validationSchema } from "../helpers/Register.helpers";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

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
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate()) + 1,
    "YYYY/MM/DD"
  );

  //select date
  const handleSub = (selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
  };
  const handleOnPress = () => {
    setOpen(!open);
  };

  const data = [
    { label: "Sousse", value: "1" },
    { label: "Tunis", value: "2" },
    { label: "Monastir", value: "3" },
    { label: "Beja", value: "4" },
    { label: "Nabeul", value: "5" },
    { label: "Jandouba", value: "7" },
    { label: "Mednine", value: "8" },
    { label: "Kairawen", value: "9" },
    { label: "Gabes", value: "10" },
    { label: "Gafsa", value: "11" },
    { label: "Benzart", value: "12" },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("12/12/2023");
  const [imageSource, setImageSource] = useState(null);

  const openLibrary = (index) => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        //console.log('User cancelled image picker')
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error)
      } else {
        const imageSource = {
          data: response.assets[0],
        };
        setImageSource(imageSource.data.uri);
        console.log(" image source", imageSource.data.uri);
      }
    });
  };

  const handleSubmit = (values) => {
    console.log("res update user  ", values);
  };
  const initialValues = {
    nom: "",
    prenom: "",
    tel: "",
    username: "",
    date: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
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
          console.log(parts[0]); // [{ name: "picker", value: { key: "value" } }]
        }

        // Perform the image upload process here
        // You can use a library like Axios to make an API call to upload the image
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "android" ? -Height / 2 : null}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginTop: 30 }}>
            <Text style={styles.backButton} onPress={() => navigation.goBack()}>
              <AntDesign name="caretleft" size={18} color="black" /> Profile
            </Text>
          </View>

          {/* <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLogout()}
            ><Text> Deconnecté</Text></TouchableOpacity>
            <Button
              onPress={() => handleLogout()}
              title="logout"
              color="blue"
            />
          </View> */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              dirty,
              isValid,
              touched,
              isSubmitting,
            }) => (
              <View style={styles.container}>
                <View style={styles.titleView}>
                  <Text style={styles.title1}>Informations Personnelles</Text>
                </View>

                <View style={styles.imageView}>
                  <TouchableOpacity onPress={selectImage}>
                    {imageURI ? (
                      <Image source={{ uri: imageURI }} style={styles.image} />
                    ) : (
                      <Image
                        source={require("../assets/upload.png")}
                        style={styles.image}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <Text style={styles.textInput}>Nom</Text>
                <TextInput
                  style={styles.input}
                  placeholder="nom"
                  onChangeText={handleChange("nom")}
                  onBlur={handleBlur("nom")}
                  value={values.nom}
                ></TextInput>
                {touched.nom && dirty && errors.nom && (
                  <Text style={styles.errorText}>{errors.nom}</Text>
                )}
                <Text style={styles.textInput}>prénom</Text>
                <TextInput
                  style={styles.input}
                  placeholder="prenom"
                  onChangeText={handleChange("prenom")}
                  onBlur={handleBlur("prenom")}
                  value={values.prenom}
                ></TextInput>
                {touched.prenom && dirty && errors.prenom && (
                  <Text style={styles.errorText}>{errors.prenom}</Text>
                )}
                {/* select date */}

                <TouchableOpacity onPress={handleOnPress}>
                  <Text style={styles.textInput}>Date de naissance</Text>
                  <TextInput
                    placeholder="date"
                    style={styles.input}
                    value={date}
                    editable={false}
                  ></TextInput>
                </TouchableOpacity>
                {/*  modal block  */}
                <Modal animationType="slide" transparent={true} visible={open}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <DatePicker
                        mode="calendar"
                        selected={date}
                        minimumDate={startDate}
                        onDateChange={(selectedDate) => setDate(selectedDate)}
                      />
                      <TouchableOpacity onPress={handleOnPress}>
                        <Text>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                <Text style={styles.textInput}>Numéro de téléphone</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="tel"
                  onChangeText={handleChange("tel")}
                  onBlur={handleBlur("tel")}
                  value={values.tel}
                ></TextInput>
                {touched.tel && dirty && errors.tel && (
                  <Text style={styles.errorText}>{errors.tel}</Text>
                )}
                <Text style={styles.textInput}>Adresse</Text>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Selectionné une ville" : "..."}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
                <Text style={styles.title1}> Informations du compte</Text>

                <Text style={styles.textInput}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {touched.username && dirty && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
                <Text style={styles.textInput}>adresse e-mail</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && dirty && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <View>
                  <Text style={styles.textInput}>Mot de passe</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleTogglePassword}
                    style={styles.iconContainer}
                  >
                    <Entypo
                      name={showPassword ? "eye" : "eye-with-line"}
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                  {touched.password && dirty && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.textInput}>Confirmer mot de passe </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleTogglePassword}
                    style={styles.iconContainer2}
                  >
                    <Entypo
                      name={showPassword ? "eye" : "eye-with-line"}
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                  {touched.confirmPassword &&
                    dirty &&
                    errors.confirmPassword && (
                      <Text style={styles.errorText}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                </View>
                <TouchableOpacity
                  disabled={!isValid}
                  style={[styles.button, !isValid && styles.disabledButton]}
                  title="S'inscrire"
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Modifier</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },

  backButton: {
    marginTop: 50,
    fontSize: 18,
    color: "#1B8793",

    marginTop: 20,
    fontWeight: "bold",
  },

  imageView: {
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    marginBottom: 7,
  },
  titleView: {
    paddingHorizontal: 10,
    marginTop: 30,
  },

  title1: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
  },
  textInput: {
    marginBottom: 8,
    color: "black",
  },

  input: {
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },

  iconContainer: {
    position: "absolute",
    right: 15,
    paddingTop: 37,
  },
  iconContainer2: {
    position: "absolute",
    right: 15,
    paddingTop: 37,
  },

  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    width: 140,
    height: 40,
    backgroundColor: "#1B8793",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 18,
  },
  button1: {
    width: 140,
    height: 40,
  },

  buttonText: {
    fontSize: 15,
    color: "#f4f4f4",
    fontSize: 16,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#1B8793",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  dropdown: {
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
