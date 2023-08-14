import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import React, { useState } from "react";

//DIMENTIONS
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenHeight = 600;

export const ModalMoidifPost = ({ visible, onClose, onHide, handleSubmit }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={onHide}>
        <View style={styles.containerPost}>
          <View style={styles.modalContainerPost}>
            <View style={styles.radioButtonContainePara}>
              <Text style={styles.text1}></Text>

              <Text
                style={{
                  color: "black",
                  fontFamily: "Helvetica Neue",
                  fontSize: height >= screenHeight ? 14 : 13,

                  marginTop: height >= screenHeight ? 10 : 20,
                }}
              >
                {" "}
                êtes-vous sûr de vouloir supprimer ce {"\n"} membre
                définitivement ?{" "}
              </Text>

              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.buttonSup}
                  onPress={handleSubmit}
                >
                  <Text style={styles.textbutton}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonAnnuler}
                  onPress={onClose}
                >
                  <Text style={styles.textbutton}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonAnnuler: {
    backgroundColor: "gray",
    width: 110,
    height: 50,
    marginVertical: 35,
    padding: 10,
    borderRadius: 5,
  },
  buttonSup: {
    backgroundColor: "#4AB7B6",
    width: 110,
    height: 50,
    marginVertical: 35,
    padding: 10,
    borderRadius: 5,
  },
  textbutton: {
    textAlign: "center",
    marginVertical: 5,
    color: "white",
  },
  containerPost: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContainerPost: {
    width: height >= screenHeight ? width * 0.91 : width * 0.95,
    height: height >= screenHeight ? height * 0.3 : height * 0.6,

    backgroundColor: "white",

    borderRadius: 11,

    paddingHorizontal: height >= screenHeight ? 20 : 15,

    paddingVertical: height >= screenHeight ? 30 : 20,
  },
  radioButtonContainePara: { flex: height >= screenHeight ? 10 : 5 },
});
