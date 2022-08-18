import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList, Image, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";

const Container = styled.View`
    flex: 1;
    background-color: black;
`;

const Top = styled.View`
    flex: 1;
    background-color: black;
`;

const Bottom = styled.View`
    flex: 1;
    background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
    position: absolute;
    bottom: 5px;
    right: 0px;
`;

const HeaderRightText = styled.Text`
    color: ${colors.blue};
    font-size: 16px;
    font-weight: 600;
    margin-right: 7px;
`;

// accessPrivileges는 IOS에서만 사용된다. 따라서 안드로이드에서는
// granted로 대체햐여 사용해야 동작한다고 한다.
// 밑 코드는 권한요청을 받는 방법의 코드가 적혀있다.
export default function SelectPhoto({navigation}) {
    const [ok, setOk] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [chosenPhoto, setChosenPhoto] = useState("");
    const getPhotos = async() => {
            const { assets: photos } = await MediaLibrary.getAssetsAsync();
            setPhotos(photos);
            setChosenPhoto(photos[0]?.uri);
    } 
    const getPermissions = async() => {
        const { status } = await MediaLibrary.getPermissionsAsync();
            if (status !== "granted"){
                const {status} = await MediaLibrary.requestPermissionsAsync();
                if (status === "granted") {
                    setOk(true);
                    getPhotos();
                }
            } else if(status === "granted"){
                setOk(true);
                getPhotos();
            }
    }

    const HeaderRight =() => (
        <TouchableOpacity 
            onPress={() => 
                navigation.navigate("UploadForm", {
                    file: chosenPhoto, 
                })
            }
        >
            <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    );
    useEffect(() => {
        getPermissions();
    }, [ok]);
    useEffect(() => {
        navigation.setOptions({
             headerRight: HeaderRight,
        })
    }, [chosenPhoto]);

    const numColumns = 4;
    const {width} = useWindowDimensions();

    const choosePhoto = (uri) => {
        setChosenPhoto(uri);
    }

    const renderItem = ({ item: photo }) => (
        <ImageContainer onPress={()=> choosePhoto(photo.uri)}>
            <Image source={{uri:photo.uri}} style={{width: width/numColumns, height:100}} />
            <IconContainer>
                <Ionicons name="checkmark-circle" size={18} color={photo.uri === chosenPhoto ? colors.blue : "white"}
                />
            </IconContainer>
        </ImageContainer>
    );

    return (
        <Container>
            <StatusBar hidden={false} />
            <Top>
                { chosenPhoto !== "" ? (
                    <Image 
                        source={{ uri: chosenPhoto }} 
                        style={{ width, height:"100%" }} 
                    /> 
                ) : null }
            </Top>
            <Bottom>
                <FlatList 
                    data={photos}
                    numColumns={numColumns}
                    keyExtractor={(photo) => photo.id}
                    renderItem={renderItem}
                />
            </Bottom>
        </Container>
    );
}

