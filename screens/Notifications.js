import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { logUserIn, logUserOut } from "../apollo";

export default function Notifications() {
    return (
        <View 
            style={{ 
                backgroundColor: "black", 
                flex: 1, 
                alignItems: "center", 
                justifyContent: "center"
            }}
        >
        <TouchableOpacity onPress ={ () => logUserOut() } >
            <Text style={{ color: "white" }}>Notifications</Text>
        </TouchableOpacity>
        </View>
    );
}