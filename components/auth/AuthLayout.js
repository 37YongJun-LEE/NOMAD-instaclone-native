import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 40px;
`;

const Logo = styled.Image`
    max-width: 50%;
    width: 100%;
    height: 300px;
    margin-bottom: 5px;
`;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  }
  return (
    <TouchableWithoutFeedback style={{height: "100%"}} onPress={dismissKeyboard} disabled={Platform.OS === "web"}>
      <Container>
      <KeyboardAvoidingView
        style={{
          width: "100%",
        }}
        behavior="padding" 
        keyboardVerticalOffset={Platform.OS ==="ios" ? 50: 0}
      >
        <Logo resizeMode="contain" source={require("../../assets/hotdog.jpg")} />
        {children}
      </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}