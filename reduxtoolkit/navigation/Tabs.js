import { FontAwesome5, Feather, AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View } from "react-native";
import HomeScreen from "../screen/HomeScreen";
import SoukScreen from "../screen/post/SoukScreen";
import AddPostScreen from "../screen/post/AddPostScreen";
import MsgScreen from "../screen/MsgScreen";
import ProfileScreen from "../screen/ProfileScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator

    
      screenOptions={()=>({
        /* tabBarOptions={{ */
       
        headerShown: false,
        "tabBarShowLabel": false,
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ],
        // Floating Tab Bar...
        style: {
          backgroundColor: "white",
          position: "absolute",
          bottom: 40,
          marginHorizontal: 20,
          // Max Height...
          height: 60,
          borderRadius: 10,
          // Shadow...
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
          // Centering the icons...
          justifyContent: "center",
          alignItems: "center",
        },
    /*   }} */
      })}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={25}
              color={focused ? "#AF558B" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pub"
        component={SoukScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="picture"
              size={25}
              color={focused ? "#AF558B" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="plussquare"
              size={25}
              color={focused ? "#AF558B" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MsgScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="message-square"
              size={25}
              color={focused ? "#AF558B" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-alt"
              size={25}
              color={focused ? "#AF558B" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
