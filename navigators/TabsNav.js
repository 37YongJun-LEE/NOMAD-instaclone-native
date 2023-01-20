import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon"
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
    const {data} = useMe();
    return (
        <Tabs.Navigator 
            screenOptions={{
                "tabBarActiveTintColor": "white",
                "tabBarShowLabel": false,
                "tabBarStyle": [
                  {
                    "display": "flex",
                    "backgroundColor": "black",
                  },
                  null
                ]
              }}  // 위 예시처럼 원하는 스타일 변경이 가능하다.            
        >
             <Tabs.Screen name="Feed"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"home"} color={color} focused={focused} />
                    ),
            }}
            >
                {() => <SharedStackNav screenName="Feed" />}  
            </Tabs.Screen>

            <Tabs.Screen name="Search" 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"search"} color={color} focused={focused} />
                    ),
            }}
            >
                {() => <SharedStackNav screenName="Search" />}  
            </Tabs.Screen>

            <Tabs.Screen 
                name="Camera" 
                component={View}
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate("Upload");
                        },
                    };
                }} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"camera"} color={color} focused={focused} />
                    ),
            }}
            />
    
            <Tabs.Screen name="Notifications" 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"heart"} color={color} focused={focused} />
                    ),
            }}
            >
                {() => <SharedStackNav screenName="Notifications" />}  
            </Tabs.Screen>

            <Tabs.Screen 
                name="Profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => 
                       data?.me?.avatar ? (
                       <Image 
                            source={{uri:data.me.avatar}} 
                            style={{height:20, width: 20, borderRadius: 10, ...(focused && {borderColor:"white", borderWidth: 1})}} 
                        />
                        ) : (
                            <TabIcon iconName={"person"} color={color} focused={focused} />
                        ),
                }}
            >
                {() => <SharedStackNav screenName="Me" />}  
            </Tabs.Screen>
        </Tabs.Navigator>
    );
}





// 로그인 화면 네이게이션에서 네가 원하는대로 아이콘을 만들수 있고 모양을 설정할 수 있다.
// tabStyle을 통해서 탭 모양, 색깔과 스타일 등을 변경 가능하다.
// 