import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function UploadNavi() {
    return (
        <Tab.Navigator 
            tabBarPosition="bottom" 
            screenOptions={{ 
                tabBarStyle: { backgroundColor: "black" }, 
                tabBarActiveTintColor: "white",
                tabBarIndicatorStyle: { backgroundColor: "white", top: 0 },  
            }}
            
        >
            <Tab.Screen name="Select">
                {() => (
                    <Stack.Navigator screenOptions={{
                        headerTintColor: "white",
                        headerBackVisible: false,
                        headerBackImage: ({tintColor}) => (
                            <Ionicons color={tintColor} name="close" size={28} />
                        ),
                        headerStyle: {
                            backgroundColor: "black",
                            shadowOpacity: 0.3,
                        }
                    }}>
                        <Stack.Screen name="Select" options={{ title: "Choose a photo" }} component={SelectPhoto}/>
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="Take" component={TakePhoto}  />
        </Tab.Navigator>
    );
}