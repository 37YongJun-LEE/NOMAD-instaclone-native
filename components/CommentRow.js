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
const Payload = styled.Text`
    font-weight: 400;
    color: white; 
`;


const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 15px;
`;

export default function CommentRow({ payload }) {
    const navigation = useNavigation();
    return (
        <Wrapper>    
            <Column 
            >
                 <Payload>{payload}</Payload>
            </Column>
            
        </Wrapper>
    );
}