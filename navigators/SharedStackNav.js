import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import Comments from "../screens/Comments";
import Feed from "../screens/Feed";
import Likes from "../screens/Likes";
import Me from "../screens/Me";
import Notifications from "../screens/Notifications";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile"
import Search from "../screens/Search";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function SharedStackNav({ screenName }) {
    return( 
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                // 안드로이드를 위한 스택네비게이션 border 옵션이 존재하지 않는다.... (버전6부터 지원안함)
                // 따라서 일단 안쓰고 그냥 넘어가기로 한다.
                headerBackTitleVisible: false,
                headerTintColor: "white",
                headerShadowVisible: true,
                headerStyle: {  
                    backgroundColor: "black",
                }
                
            }}
        > 
            {screenName === "Feed" ? (
                <Stack.Screen 
                    name={"Feed"}   
                    component={Feed}
                    options={{
                        headerTitle: () => (
                            <Image 
                                style={{
                                    width: 120,
                                    height: 60,
                                }}
                                resizeMode="contain"
                                source={require("../assets/hotdog.jpg")} 
                            />
                        ),

                        // headerRight: () => (
                        //     <TouchableOpacity>
                        //         <Ionicons 
                        //             name="paper-plane" 
                        //             color="white"
                        //             size={30}
                        //         />
                        //     </TouchableOpacity>
                        // ),
                    }} 
                />
            ) : null }
            {screenName === "Search" ? (
                <Stack.Screen name={"Search"} component={Search} />
            ) : null }
            {screenName === "Notifications" ? (
                <Stack.Screen name={"Notifications"} component={Notifications} />
            ) : null }    
            {screenName === "Me" ? (
                <Stack.Screen name={"Me"} component={Me} />
            ) : null }  
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Photo" component={Photo} />
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
          // Stack 스크린이름이랑 Tab스크린 이름이 똑같이겹치면,
        // 프로그램이 헷갈릴수 있다는 경고가 뜨긴하지만 , 큰 문제 없으니 넘어간다.
    );
}

