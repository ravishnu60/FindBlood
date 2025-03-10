import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { base_url, bg_color, Loading } from "../utils/utils";
import { Checkbox } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
    const isFocused = useIsFocused();

    const loginSchema = yup.object().shape({
        username: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        remember: yup.boolean()
    });

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(loginSchema), defaultValues: {
            remember: false
        }
    });

    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const onSubmit = (data) => {
        setLoading(true);
        if (data.remember) {
            AsyncStorage.setItem('username', data.username);
            AsyncStorage.setItem('password', data.password);
        } else {
            AsyncStorage.removeItem('username');
            AsyncStorage.removeItem('password');
        }

        // navigation.navigate("HomeMenu");

        const fm = new FormData();
        fm.append('email', data.username);
        fm.append('password', data.password);

        axios({
            method: 'post',
            url: `${base_url}api/login`,
            data: fm,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            AsyncStorage.setItem('token', res.data.token);
            navigation.navigate("HomeMenu");
        }).catch(err => {
            console.log("eror", err);
            setError("Invalid email or password");
        }).finally(() => setLoading(false));
    };

    const patchValueIfExist = async () => {
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        console.log("username", username);

        if (username && password) {
            reset({
                username: username,
                password: password,
                remember: true
            });
        }
    }

    useEffect(() => {
        if (isFocused) {
            patchValueIfExist();
            reset();
        }
    }, [isFocused])

    return (
        <ImageBackground source={require("../assets/blood.png")} style={styles.container} >
            <View style={styles.formContainer}>
                <Loading visible={loading} />
                <Text style={styles.title}>Login</Text>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                {/* Email Field */}
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#888"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        )}
                    />
                </View>
                {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

                {/* Password Field */}
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Password"
                                    placeholderTextColor="#888"
                                    value={value}
                                    onChangeText={onChange}
                                    secureTextEntry={secureText}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                                    <Icon name={secureText ? "eye-off" : "eye"} size={24} color="#888" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                {/* check box for remember me */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <Controller
                        control={control}
                        name="remember"
                        render={({ field: { onChange, value } }) => (
                            <Checkbox
                                status={value ? 'checked' : 'unchecked'}
                                onPress={() => onChange(!value)}
                            />
                        )}
                    />
                    <Text style={{ marginLeft: 5 }}>Remember Me</Text>
                </View>

                {/* Login Button */}
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginButton}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Register Navigation */}
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink}>Register</Text></Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: bg_color,
        padding: 20,
    },
    formContainer: {
        backgroundColor: "#ffffffff",
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: 'center'
    },
    inputContainer: {
        width: "100%",
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        fontSize: 16,
        marginTop: 10,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        width: "100%",
        marginTop: 10,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000'
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center'
    },
    loginButton: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    registerText: {
        fontSize: 14,
        marginTop: 15,
        textAlign: 'center'
    },
    registerLink: {
        color: "#007bff",
        fontWeight: "bold",
    },
});

export default Login;
