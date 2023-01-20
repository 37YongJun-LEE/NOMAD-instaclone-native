import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";


const Stack = createNativeStackNavigator();

export default function MessagesNav() {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerTintColor: "white",
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: "black",
                },
            }}
        >
            <Stack.Screen 
                name="Rooms" 
                options={{
                    headerBackImage: ({ tintColor }) => <Ionicons name="chevron-down" color={tintColor} size={28} />
                }}
                component={Rooms}
            />
            <Stack.Screen 
                name="Room" 
                component={Room}
            />
        </Stack.Navigator>
    );
}