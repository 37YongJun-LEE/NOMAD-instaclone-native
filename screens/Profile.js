import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native';
import styled from "styled-components/native";
import { colors } from "../colors";
import { gql, useQuery, useMutation } from "@apollo/client";
import { PHOTO_FRAGMENT } from "../fragments";
import { useForm } from "react-hook-form";
import useMe from "../hooks/useMe";
import { useNavigation } from "@react-navigation/native";


const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
  `;

  const SEND_MESSAGE_MUTATION = gql`
    mutation sendMessage (
        $payload: String!
        $roomId: Int
        $userId: Int
    )   {
        sendMessage(
            payload: $payload
            roomId: $roomId
            userId: $userId
        ) {
            ok
            id
        }
    }
  `;


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

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  justify-content: center;
  padding: 7px 10px;
  border-radius: 5px;
  width: 100px;
`;

export default function Profile({navigation, route}) {
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables : {
      username: route.params.username,
    },
  }); 
  
  useEffect(() => {
    if (route?.params?.username) {
        navigation.setOptions({
            title: route.params.username,
        });       
    }
  }, []);

  // console.log(route);
  // console.log(data);

  ///////////////////////////////////////////////////////////////////////////////////
  // ????????? ????????? ???????????? ????????????
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
  // ?????? ???????????? ????????? ?????? + ????????? ??????????????? ??????
  const { data: meData } = useMe();
  const { register, setValue, handleSubmit } = useForm();
  setValue("message", `${meData?.me?.username}?????? ????????? ??????????????????222`);

  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
  );

  const onValid = ({ message }) => {
    if (!sendingMessage) {
        sendMessageMutation({
            variables: {
                payload: message,
                userId: route?.params?.id,
            },
        });
    }
  };

  useEffect( () => {
    register("message", { required: true });
  }, [register]);

  ///////////////////////////////////////////////////////////////////////////////////

    return (

    <Container>
      <View style = {{alignItems: 'center', marginTop: 40}}>
        <Avatar source={{ uri: data?.seeProfile?.avatar}} /> 
        <Username>{data?.seeProfile?.username}</Username>
        <Button loading={sendingMessage} onPress={handleSubmit(onValid)} >
                <Text style={{ textAlign: "center" , fontSize: 20}}>??????</Text>
        </Button>
      </View>

      <View style = {{ marginTop: 20 }}>  
        <FlatList 
          numColumns={4}
          data={data?.seeProfile?.photos}
          keyExtractor={photo => "" + photo.id}
          renderItem={renderItem}
          inverted
        />
      </View>

    </Container>
    );
}