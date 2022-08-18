import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context"
import { createHttpLink } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";

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

const httpLink = createHttpLink({
    uri: "https://6779-112-216-247-248.jp.ngrok.io/graphql",
});

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

const client = new ApolloClient({
    link: authLink.concat(onErrorLink).concat(httpLink),
    cache,
});

export default client;

///////////////// 매우 중요 이슈 ////////////////
//  "http://localhost:4000/graphql" 에서는 로그인이 작동이 불가하며 (모바일 EXPO를 사용할 경우..)
// 작동하지 않는다 따라서 반드시 ngrok을 이용한 외부 주소를 이용해서 서버를 작동시켜야지 백엔드와 
// 프론트엔드가 서로 상호작용하며 통신 가능하다.