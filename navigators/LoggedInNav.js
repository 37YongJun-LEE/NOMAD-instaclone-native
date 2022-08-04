import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon"
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
    return (
        <Tabs.Navigator 
            tabBarOptions={{
                activeTintColor: "white",
                showLabel: false,
                style: {
                    borderTopColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "black",
                },
                // tabstyle: { backgroundColor: "red", marginRight: 10,}
                // 위 예시처럼 원하는 스타일 변경이 가능하다. 
            }}
        >
            <Tabs.Screen 
                name="Feed"
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"home"} color={color} focused={focused} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Feed" />}  
            </Tabs.Screen>
            <Tabs.Screen name="Search" 
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"search"} color={color} focused={focused} />
                    ),
            }}
            >
                {() => <SharedStackNav screenName="Search" />}  
            </Tabs.Screen>
            <Tabs.Screen name="Camera" component={View} 
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"camera"} color={color} focused={focused} />
                    ),
            }}
            />
            <Tabs.Screen name="Notifications" 
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"heart"} color={color} focused={focused} />
                    ),
            }}
            >
                {() => <SharedStackNav screenName="Notifications" />}  
            </Tabs.Screen>
            <Tabs.Screen name="Profile"
                options={{
                    tabBarIcon: ({focused, color, size}) => (
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