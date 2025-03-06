import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { base_url } from "../utils/axiosInstance";

const Login = ({ navigation }) => {
    const [secureText, setSecureText] = useState(true);

    const loginSchema = yup.object().shape({
        username: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = (data) => {
        const fm= new FormData();
        fm.append('username', data.username);
        fm.append('password', data.password);
        console.log("Login Data:", data, fm.getAll());
        
        axios({
            method: 'post',
            url: `${base_url}/api/login`,
            data: fm,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            console.log("res", res.data);
        }).catch(err => console.log("eror", err));
        
        // const getRequest = () => {        
        //         axiosInstance.get('api/blood-requests').then(res => {
        //             // setRequestList(res.data);
        //             console.log("res", res.data);
        //         }).catch(err => console.log("eror", err) );
        //     }

        //     getRequest();
    };

    console.log(errors);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

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

            {/* Login Button */}
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Register Navigation */}
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink}>Register</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ffcccc",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign:'center'
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
        color:'#000'
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 14,
        marginTop: 5
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
        textAlign:'center'
    },
    registerLink: {
        color: "#007bff",
        fontWeight: "bold",
    },
});

export default Login;
