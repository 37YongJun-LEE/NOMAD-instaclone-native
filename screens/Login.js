import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;

export default function Login({ route: { params } }) {
    const {register, handleSubmit, setValue, watch} = useForm({
        defaultValues: {
            username: params?.username,
            password: params?.password,
        }
    })
    const passwordRef = useRef();  
    const onCompleted = async (data) => {
        const {
            login: { ok, token },
        } = data;
        if (ok) {
            await logUserIn(token);
        }
    }  
    const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onVaild = (data) => {
        if (!loading) {
            logInMutation({
                variables: {
                    ...data,
                },
            });
        }
    };

    useEffect( () => {
        register("username", {
            required: true,
        });
        register("password", {
            required: true,
        });
    }, [register])

    return (
        <AuthLayout>
            <TextInput 
                value={watch("username")}
                placeholder="Username"
                returnKeyType="next"
                autoCapitalize="none"
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("username", text)}
            />
            <TextInput  
                value={watch("password")}
                ref={passwordRef}
                placeholder="Password"
                returnKeyType="done"
                secureTextEntry
                lastOne={true}
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                onSubmitEditing={handleSubmit(onVaild)}
                onChangeText={(text) => setValue("password", text)}
            />
            <AuthButton 
                text="Login" 
                loading={loading}
                disabled={ !watch("username") || !watch("password") } 
                onPress={handleSubmit(onVaild)}
            />
        </AuthLayout>
    );
}
