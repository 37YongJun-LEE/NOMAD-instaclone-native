import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;   

const Container = styled.View`
`;
const Header = styled.TouchableOpacity`
    padding: 10px;
    flex-direction: row;
    align-items: center;
`;
const UserAvatar = styled.Image`
    margin-right: 10px;
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
`;
const Username = styled.Text`
    color: white;
    font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
    flex-direction: row;
    align-items: center;
`;
const Action = styled.TouchableOpacity`
    margin-right: 10px;
`;
const Caption = styled.View`
    flex-direction: row;
`;
const CaptionText = styled.Text`
    color: white;
    margin-left: 5px;
`;
const Likes = styled.Text`
    color: white;
    margin: 7px 0px;
    font-weight: 600;
`;
const ExtraContainer = styled.View`
    padding: 10px;
`;


function Photo({ id, user, caption, file, isLiked, likes }) {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const [imageHeight, setImageHeight] = useState(height - 400)
    useEffect( () => {
        Image.getSize(file, (width, height) => {
            setImageHeight(height / 2);
        });
    }, [file]);

    const updateToggleLike = (cache, result) => {
        const {
          data: {
            toggleLike: { ok },
          },
        } = result;
        if (ok) {
          const photoId = `Photo:${id}`;
          cache.modify({
            id: photoId,
            fields: {
              isLiked(prev) {
                return !prev;
              },
              likes(prev) {
                if (isLiked) {
                  return prev - 1;
                }
                return prev + 1;
              },
            },
          });
        }
      };
      const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
          id,
        },
        update: updateToggleLike,
      });

    const goToProfile = () => {
      navigation.navigate("Profile", {
        username: user.username,
        id: user.id,
      });
    };
    
    return (
        <Container>
            <Header onPress={goToProfile}>
                    <UserAvatar 
                        resizeMode="cover" 
                        source={{uri: user.avatar }}
                    />
                    <Username>{user.username}</Username>
            </Header>
            <File
                resizeMode="cover"
                style={{
                    width,
                    height: imageHeight,
                }}
                source={{ uri: file }}
            />
            <ExtraContainer>
                <Actions>
                    <Action onPress={toggleLikeMutation}>
                        <Ionicons 
                            name={isLiked ? "heart" : "heart-outline"} 
                            color={isLiked ? "tomato" : "white"} 
                            size={25}
                        />
                    </Action>
                    <Action 
                      onPress={ () => 
                        navigation.navigate("Comments", {
                          photoId: id,
                        })
                      }
                    >
                        <Ionicons name="chatbubble-outline" color="white" size={22}/>
                    </Action>
                </Actions>
                <TouchableOpacity 
                    onPress={() => 
                        navigation.navigate("Likes", {
                            photoId: id,
                        })
                    }
                >
                    <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
                </TouchableOpacity>
                <Caption>
                    <TouchableOpacity onPress={goToProfile}>
                        <Username>{user.username}</Username>
                    </TouchableOpacity>
                    <CaptionText>{caption}</CaptionText>
                </Caption>
            </ExtraContainer>
        </Container>
    );
}

/// props 에서 isRequired를 붙인 prop들이 계속 콘솔창에 경고문이 뜬다.
/// isRequired를 때면 경고가 없어지지만 굳이 없애지 않아도 작동은 되며, console.log(data)로 prop들이 잘 보인다.
/// 예를들어 Search에서 사진 클릭하면 Photo컴포넌트가 잘 작동되고, seePhoto가 잘 작동되며 또한
/// prop들을 잘 가져와서 화면에 잘 보여지지만, 경고발생의 이유를 모르겠다. (원인은 뭐 isRequired를 붙여서 경고뜨는 것)
/// 나중에 문제가 될 수도 있으나, 일단은 넘어간다. 굳이 Warning 없애겠다고 시간 날리기 싫다.
Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    commentNumber: PropTypes.number,
  };
  export default Photo;