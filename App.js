import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider, useReactiveVar } from '@apollo/client/react';
import client, { isLoggedInVar, tokenVar, cache } from './apollo';
import LoggedInNav from './navigators/LoggedInNav';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';


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

    const persistor = new CachePersistor({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    });
    await persistor.restore(); // purge()를 restore()로 변경해주면 기존과 동일하게 작동한다.
    //await persistor.purge(); // --> 를 사용하면 밑의 기존코드로 잘못 저장된 캐시를 지울 수 있다.
    // 밑 부분 serialize: false 에서 지속적인 에러 발생으로 인해 위 코드로 대체.
    
    // await persistCache({
    //   cache,
    //   storage: new AsyncStorageWrapper(AsyncStorage),
    //   serialize: false,
    // });
    // return preloadAssets();

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
