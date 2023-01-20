import { ApolloClient, InMemoryCache, makeVar, split } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context"
import { createHttpLink } from "@apollo/client";
import { getMainDefinition, offsetLimitPagination } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
// import { WebSocketLink } from "@apollo/client/link/ws";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const logUserOut = async() => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
};

///////////////////////// uploadHttpLink 로 변환되야하는 부분 //////////////////
const httpLink = createHttpLink({
    uri: "https://ce50-112-216-247-248.jp.ngrok.io/graphql",
});
///////////////////////// 17.15 영상 참고 ////////////////////////////////


//////////////////////// 18.9 영상 참고 /////////////////////////
// const wsLink = new WebSocketLink({
//     uri: "ws://9a68-112-216-247-248.jp.ngrok.io/graphql",
//     options: {
//         reconnect: true,
//         connectionParams: () => ({
//             token: tokenVar(),
//         }),
//     },
// });
/////////////////////////////////////////////////////////////////////

///////////////////// 아래부분 8. 30.작성 (( 18.9영상의 wslink말고 GraphQLWsLink 사용 == 코드 바뀐 관계로 사용 ))  /////////////////////////////////////////////

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://ce50-112-216-247-248.jp.ngrok.io/subscriptions',
    options: {
        reconnect: true,
        connectionParams: () => ({
            token: tokenVar(),
        }),
    },
}));

//////////////////////////////////////////////////////////////////

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        },
    };
});

const onErrorLink = onError(({graphQLErrors, networkError}) => {
    if(graphQLErrors) {
        console.log(`GraphQL Error`, graphQLErrors);
    }
    if(networkError) {
        console.log("Network Error", networkError);
    }
});

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                seeFeed: offsetLimitPagination(),
            },
        },
    },
});

//////////////18.9 영상참고 /////////////// httpLink와 s차이 주의!.///////////////
const httpLinks = authLink.concat(onErrorLink).concat(httpLink);
/////////////////////////////////////////////////// 17.15영상안봤기때문에 httpLink는 차후에 uploadHttpLink로 바뀌어야함 /////////////////////
const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLinks, // 이부분도 17.15 영상보고나면 바뀌어야한다
  );


const client = new ApolloClient({
    link: splitLink,
    cache,
});

export default client;

///////////////// 매우 중요 이슈 ////////////////
//  "http://localhost:4000/graphql" 에서는 로그인이 작동이 불가하며 (모바일 EXPO를 사용할 경우..)
// 작동하지 않는다 따라서 반드시 ngrok을 이용한 외부 주소를 이용해서 서버를 작동시켜야지 백엔드와 
// 프론트엔드가 서로 상호작용하며 통신 가능하다.