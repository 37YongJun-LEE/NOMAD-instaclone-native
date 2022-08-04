import React from "react";
import { View, Text } from "react-native";
import { gql } from "@apollo/client/core";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { useQuery } from "@apollo/client/react/hooks";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;


export default function Feed({ navigation }) {
    const {data} = useQuery(FEED_QUERY);
    console.log(data);


    return (
        <View 
            style={{ 
                backgroundColor: "black", 
                flex: 1, 
                alignItems: "center", 
                justifyContent: "center",
            }}
        >
                <Text style={{ color: "white" }}>Feed</Text>
        </View>
    );
}