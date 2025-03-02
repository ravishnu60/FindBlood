import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Register = ({ navigation }) => {
    const [secureText, setSecureText] = useState(true);

    const registerSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = (data) => {
        console.log("Register Data:", data);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            {/* Name Field */}
            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#888"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

            {/* Email Field */}
            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    name="email"
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
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

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

            {/* Register Button */}
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.registerButton}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            {/* Login Navigation */}
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Login</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
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
        marginTop: 5,
    },
    registerButton: {
        backgroundColor: "#27ae60",
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
    loginText: {
        fontSize: 14,
        marginTop: 15,
    },
    loginLink: {
        color: "#007bff",
        fontWeight: "bold",
    },
});

export default Register;
