import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav"
import UploadForm from "../screens/UploadForm";
import { Ionicons } from "@expo/vector-icons";


const Stack = createNativeStackNavigator();

export default function LoggedInNav() {
    return (
        <Stack.Navigator screenOptions={{ presentation: "modal" }}>
            <Stack.Screen 
                name="Tabs" 
                component={TabsNav} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Upload" 
                component={UploadNav} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="UploadForm" 
                component={UploadForm} 
                options={{ 
                    headerBackTitleVisible: false,
                    headerBackImage: ({tintColor}) => <Ionicons color={tintColor} name="close" size={28} />,
                    title: "Upload",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: "black",
                    },   
                }}
            />

        </Stack.Navigator>
    );
}





// 로그인 화면 네이게이션에서 네가 원하는대로 아이콘을 만들수 있고 모양을 설정할 수 있다.
// tabStyle을 통해서 탭 모양, 색깔과 스타일 등을 변경 가능하다.
// 