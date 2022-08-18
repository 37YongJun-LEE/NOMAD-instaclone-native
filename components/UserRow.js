import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";

const Column = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;
const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 25px;
    margin-right: 10px;
`;
const Username = styled.Text`
    font-weight: 600;
    color: white; 
`;

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 15px;
`;
const FollowBtn = styled.TouchableOpacity`
    background-color: ${colors.blue};
    justify-content: center;
    padding: 5px 10px;
    border-radius: 5px;
`;
const FollowBtnText = styled.Text`
    color: white;
    font-weight: 600;
`;

// 팔로우 언팔 버튼을 만들건데 버튼만 만들거고 기능은 알아서 
// 추가하라고 한다. 기능되게 만들어야한다.

export default function UserRow({ avatar, id, username, isFollowing, isMe }) {
    const navigation = useNavigation();
    return (
        <Wrapper>    
            <Column onPress={() => navigation.navigate("Profile", {
                username, 
                id,
            }) }>
                <Avatar source={{uri: avatar}} />
                <Username>{username}</Username>
            </Column>
            {!isMe ? (
                <FollowBtn>
                    <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
                </FollowBtn>
            ) : null}
        </Wrapper>
    );
}