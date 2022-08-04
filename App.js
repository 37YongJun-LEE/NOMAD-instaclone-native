import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider, useReactiveVar } from '@apollo/client/react';
import client, { isLoggedInVar, tokenVar } from './apollo';
import LoggedInNav from './navigators/LoggedInNav';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
  const [ loading, setLoading ] = useState (true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = () => {
    const fontToLoad = [Ionicons.font]
    const fontPromises = fontToLoad.map(font => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/hotdog.jpg"),];
    const imagesPromises = imagesToLoad.map(image => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagesPromises]);
  }
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };
  if (loading) {
    return (
      <AppLoading 
        startAsync={preload} 
        onError={console.warn} 
        onFinish={onFinish}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav /> }
      </NavigationContainer>
    </ApolloProvider>
       );
}
