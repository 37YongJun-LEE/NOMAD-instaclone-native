import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

// react Native(웹말고 앱)에서는 모든 flex 컨테이너가 기본적으로
// flex direction이 column으로 디폴트란것을 기억해야한다.

const LoginLink = styled.Text`
    color: ${colors.blue};
    font-weight: 600;
    font-size: 16px;
    margin-top: 20px;
`;

export default function Welcome({ navigation }) {
        const goToCreateAccount = () => navigation.navigate("CreateAccount");
        const goToLogin = () => navigation.navigate("Login");
    return (
            <AuthLayout>
                <AuthButton
                    text="Crate New Account"
                    disabled={false}
                    onPress={goToCreateAccount}
                />
                <TouchableOpacity onPress={goToLogin}>
                    <LoginLink>Login</LoginLink>
                </TouchableOpacity>
            </AuthLayout>
    );
}
