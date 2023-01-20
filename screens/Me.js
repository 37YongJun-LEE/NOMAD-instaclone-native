import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions, FlatList } from "react-native";
import useMe from "../hooks/useMe";
import styled from "styled-components/native";
import { colors } from "../colors";


const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const Avatar = styled.Image` 
  width: 150px;
  height: 150px;
  border-radius: 80px;
`;

const Username = styled.Text`
  font-size: 30px;
  font-weight: 400;
  padding: 10px 10px;
`;


export default function Me({ navigation }) {
    const { data } = useMe();
    useEffect(() => {
        navigation.setOptions({
            title: data?.me?.username,
        });
    });
    //console.log(data);

///////////////////////////////////////////////////////////////////////////////////
    const { width } = useWindowDimensions();
    const numColumns = 4;
    const renderItem = ({item:photo}) => (
        <TouchableOpacity 
            onPress={() => 
                navigation.navigate("Photo", {
                    photoId: photo.id,
                })
            }
        >
            <Image 
                source={{uri: photo.file }}
                style={{width: width / numColumns, height:100}}
            />
        </TouchableOpacity>
    );
///////////////////////////////////////////////////////////////////////////////////



    return (
        <Container>
            <View style = {{alignItems: 'center', marginTop: 40}}>
                <Avatar source={{ uri: data?.me?.avatar}} /> 
                <Username>{data?.me?.username}</Username>                
            </View>

            <View style = {{ marginTop: 20 }}>  
                <FlatList 
                    numColumns={4}
                    data={data?.me?.photos}
                    keyExtractor={photo => "" + photo.id}
                    renderItem={renderItem}
                    inverted
                />
            </View>

        </Container>
    );
}