import React, { useEffect } from "react";
import { ReactNativeFile } from "apollo-upload-client";
import { useForm } from "react-hook-form";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import { FEED_PHOTO } from "../fragments";

const UPLOAD_PHOTO_MUTATION = gql`
    scalar Upload

    mutation uploadPhoto($file: Upload!, $caption: String) {
        uploadPhoto(file: $file, caption: $caption) {
            ...FeedPhoto
        }
    }
    ${FEED_PHOTO}
`;

const Container = styled.View`
    flex: 1;
    background-color: black;
    padding: 0px 50px;
`;
const Photo = styled.Image`
    height: 400px;
`;
const CaptionContainer = styled.View`
    margin-top: 30px; 
`;
const Caption = styled.TextInput`
    background-color: white;
    color: black;
    padding: 10px 20px;
    border-radius: 100px;
`;

const HeaderRightText = styled.Text`
    color: ${colors.blue};
    font-size: 16px;
    font-weight: 600;
    margin-right: 7px;
`;

export default function UploadForm({ route, navigation }) {
    const [uploadPhotoMutation, { loading, error }] = useMutation(UPLOAD_PHOTO_MUTATION);
    const HeaderRight = () => (
        <TouchableOpacity 
            onPress={handleSubmit(onValid)}
        >
            <HeaderRightText>done</HeaderRightText>
        </TouchableOpacity>
    );

    const HeaderRightLoading = () => (    
        <ActivityIndicator 
            size="small" 
            color={colors.blue} 
            style={{ marginRight: 10 }}
        />
    );

    const { register, handleSubmit, setValue } = useForm();
    useEffect( () => {
        register("caption");
    }, [register]);

    useEffect( () => {
        navigation.setOptions({
            headerRight: loading ? HeaderRightLoading : HeaderRight,
            ...(loading && { headerLeft: () => null }),
        });
    }, [loading]);
    
    const onValid = ({ caption }) => {
        const file = new ReactNativeFile({
            uri: route.params.file,
            name:`1.jpg`,
            type: "image/jpeg",
        });
        console.log(file);
        uploadPhotoMutation({
            variables: {
                caption,
                file,
            }
        });
    };
    console.log(error);

    return (
        <DismissKeyboard>
        <Container>
            <Photo 
                resizeMode="contain"
                source={{uri: route.params.file}} 
            />
            <CaptionContainer>
                <Caption 
                    returnKeyType="done"
                    placeholder="Write a caption"
                    placeholderTextColor="rgba(0, 0, 0, 0.5)"    
                    onSubmitEditing={handleSubmit(onValid)}
                    onChangeText={(text) => setValue("caption", text)}
                />
            </CaptionContainer>
        </Container>
        </DismissKeyboard>
    );
}   