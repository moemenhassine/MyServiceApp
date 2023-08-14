import { StyleSheet, Text, View, Image , TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather, Entypo } from "@expo/vector-icons";

const ProfileProfessionel = () => {
    const navigation = useNavigation()
    return (
        <ScrollView>
          <View style={styles.head}>
            <Text
              style={styles.buttonhead}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={30} color="black" />
            </Text>
            <Text style={styles.textCat}> Moemen Hassine </Text>
          </View>
    
          <View style={styles.ProfView}>
            <View style={styles.imgView}>
              <Image
                source={require("../assets/profile.jpeg")}
                style={styles.profImage}
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>Hassine Moemen</Text>
              <Text style={styles.text}>2/5</Text>
              <Text>
                <Ionicons name="location" size={20} color="black" /> Sahloul
              </Text>
            </View>
          </View>
          {/* ************** block info *************/}
          <View style={styles.InfoView}>
            <View style={styles.textViewIfo}>
              <Text style={styles.nbrInfo}>10</Text>
              <Text style={styles.info}>Messages</Text>
            </View>
            <View style={styles.textViewIfo}>
              <Text style={styles.nbrInfo}>20</Text>
              <Text style={styles.info}>Vues profile</Text>
            </View>
            <View style={styles.textViewIfo}>
              <Text style={styles.nbrInfo}>4</Text>
              <Text style={styles.info}>Notes</Text>
            </View>
            <View style={styles.textViewIfo}>
              <Text style={styles.nbrInfo}>10</Text>
              <Text style={styles.info}>Appels</Text>
            </View>
          </View>
          {/* ************** block contact *************/}
          <View style={styles.contactView}>
            <View style={styles.contactView}>
              <Text style={styles.textContact}>Contacter moi</Text>
            </View>
            <View style={styles.icons}>
              <Feather style={styles.icon} name="phone" size={24} color="#4AB7B6" />
              <Entypo name="message" size={24} color="#4AB7B6" />
            </View>
          </View>
          <View style={styles.descView}>
            <Text style={styles.title}>Description</Text>
            <Text style={styles.description}>
              plomberie / électricité {" "}
            </Text>
          </View>
          <View style={styles.qualificationView}>
            <Text style={styles.title}>Qualifications</Text>
            <View style={styles.qualView}>
              <Text style={styles.description}>Experience Professionnelle :</Text>
              <Text style={styles.description}>2-3 ans</Text>
            </View>
          </View>
          <View style={styles.noteView}>
            <Text style={styles.title}>Note clients</Text>
    
            <View style={styles.tete}> 
            <Text style={styles.note}>0</Text>
            <View style={styles.stars}>
            <AntDesign name="star" size={24} color="gold"/>
            <AntDesign name="star" size={24} color="gold"/>
            <AntDesign name="star" size={24} color="gold"/>
            <AntDesign name="star" size={24} color="gold"/>
            <AntDesign name="star" size={24} color="gold"/>
            </View>
            </View>
            <View style={styles.noteText}>
            <View style={styles.qualView}>
              <Text style={styles.text1}>Qualité de service:</Text>
              <Text style={styles.text1}>0</Text>
            </View>
            <View style={styles.qualView}>
              <Text style={styles.text1}>Prix de la prestation:</Text>
              <Text style={styles.text1}>0</Text>
            </View>
            <View style={styles.qualView}>
              <Text style={styles.text1}>Ponctualité:</Text>
              <Text style={styles.text1}>0</Text>
            </View>
            <View style={styles.qualView}>
              <Text style={styles.text1}>Accueil et politesse</Text>
              <Text style={styles.text1}>0</Text>
            </View>
            </View>
          </View>
          {/* <View style={styles.pp}>  
          <TouchableOpacity
              style={styles.plus}
              onPress={() => navigation.navigate("hometab")}
            >
              <Text style={styles.textbutton}>
                Reserver 
              </Text>
            </TouchableOpacity>
          </View> */}
    
        </ScrollView>
      );
}

export default ProfileProfessionel

const styles = StyleSheet.create({
    head: {
      flexDirection: "row",
      backgroundColor: "gray",
    },
    buttonhead: {
      marginLeft: 20,
      marginTop: 60,
      marginBottom: 10,
    },
    textCat: {
      fontSize: 20,
      marginLeft: 20,
      marginTop: 60,
    },
    ProfView: {
      flexDirection: "row",
      backgroundColor: "white",
      borderRadius: 10,
      margin: 12,
    },
    textView: {
      margin: 20,
    },
    text: {
      fontSize: 15,
      marginBottom: 8,
    },
  
    profImage: {
      width: 110,
      height: 110,
      margin: 8,
      borderRadius: 20,
    },
    InfoView: {
      flexDirection: "row",
      backgroundColor: "white",
      borderRadius: 10,
      marginRight: 12,
      marginLeft: 12,
      justifyContent: "space-evenly",
    },
    textViewIfo: {
      margin: 15,
      alignItems: "center",
    },
    info: {
      fontSize: 10,
      // color:"#4AB7B6"
    },
    nbrInfo: {},
    contactView: {
      flexDirection: "row",
      backgroundColor: "white",
      marginTop: 12,
      borderRadius: 10,
      marginRight: 12,
      marginLeft: 12,
      justifyContent: "space-between",
    },
    icons: {
      flexDirection: "row",
      margin: 12,
      marginRight: 30,
    },
    icon: {
      marginRight: 20,
    },
    textContact: {
      marginTop: 5,
      fontSize: 16,
      marginLeft: 20,
    },
    descView: {
      backgroundColor: "white",
      marginTop: 12,
      borderRadius: 10,
      marginRight: 12,
      marginLeft: 12,
    },
    qualificationView: {
      backgroundColor: "white",
      marginTop: 12,
      borderRadius: 10,
      marginRight: 12,
      marginLeft: 12,
    },
    qualView: {
      flexDirection: "row",
    },
    description: {
      marginLeft: 25,
      marginBottom: 20,
      color: "gray",
    },
    noteView:{
      backgroundColor: "white",
      marginTop: 12,
      borderRadius: 10,
      marginRight: 12,
      marginLeft: 12,
    },
  
    title: {
      margin: 20,
      fontSize: 16,
    },
    tete:{
      alignItems:"center"
    },
    note:{
      fontSize:20,
      marginBottom:20,
  
    },
    stars:{
      flexDirection:"row",
      marginBottom : 20,
    },
    noteText:{
      alignItems:"center",
    },
    text1:{
      margin:5 ,
    },
  
    plus:{
      backgroundColor: "#4AB7B6",
      width: 200,
      height: 50,
      alignSelf:"center",
      marginTop:10,
      marginBottom:20,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:16,
      
    },
    textbutton:{
      fontSize:20,
      color:"white"
    },
    pp:{
      
    }
  
  
  });
  