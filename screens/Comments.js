import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { gql } from "@apollo/client/core";
import { COMMENT_FRAGMENT } from "../fragments";
import { useQuery } from "@apollo/client/react/hooks";
import ScreenLayout from "../components/ScreenLayout";
import CommentRow from "../components/CommentRow";
import styled from "styled-components/native";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons"

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
    }
  }
`;

const COMMENTS_QUERY = gql`
    query seePhotoComments($id: Int!) {
        seePhotoComments(id: $id) {
            ...CommentFragment
        }
    }
    ${COMMENT_FRAGMENT}
`;


const InputContainer = styled.View`
    width: 95%;
    margin-bottom: 30px;
    margin-top: 25px;
    flex-direction: row;
    align-items: center;

`;

const Input = styled.TextInput`
    background-color: rgba(255, 255, 255, 1);
    color: black;
    padding: 5px 10px;
    border-radius: 10px;
`;


const SendButton = styled.TouchableOpacity``;

export default function Comments({ route }) {
    
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async() => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
    
    const { data, loading, refetch } = useQuery(COMMENTS_QUERY, {
        variables: {
            id: route?.params?.photoId
        },
        skip: !route?.params?.photoId,
    });

    // console.log(route);
    // console.log(data);

    //////////////////////////////////////////////////////////////////
    const [createCommentMutation, {loading: createComment}] = useMutation(
        CREATE_COMMENT_MUTATION
      );
    const { register, handleSubmit, setValue, getValues } = useForm();
    const { comment } = getValues();
    setValue("comment", "");

    const onValid = ({ comment }) => {
        if (createComment) {
          return;
        }
        createCommentMutation({
          variables: {
            photoId: route?.params?.photoId,
            payload: comment,
          },
        });
        useEffect( () => {
            register("comment", { required: true });
        }, [register]);
    };
    //////////////////////////////////////////////////////////////////

    const renderItem = ({item:comment}) => (
     <CommentRow {...comment} />
    );

    return (

        <ScreenLayout loading={loading}>
            <InputContainer>
                <Input
                    type="text"
                    placeholder="Write a comment..."
                    onChangeText={(text) => setValue("comment", text)}
                    onSubmitEditing={handleSubmit(onValid)}
                />
                <SendButton onPress={handleSubmit(onValid)}>
                    <Ionicons name="send" color={"white"} size={22} />
                </SendButton>
            </InputContainer>

            <FlatList 
                ItemSeparatorComponent={() => (
                    <View 
                        style={{ 
                            width: "100%", 
                            height:1, 
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                        }}
                    ></View >
                )}
                refreshing={refreshing}
                onRefresh={onRefresh}
                data={data?.seePhotoComments}
                keyExtractor={(item) => "" +  item.id}
                renderItem={renderItem}
                style={{ width:"100%" }}
            />
        </ScreenLayout>

    );
}