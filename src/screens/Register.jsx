import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { bg_color, bloodGroups, cities, dropdownArrow, Loading } from "../utils/utils";
import { Picker } from "@react-native-picker/picker";
import axiosInstance from "../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);

    const registerSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phone: yup.string().matches(/^\d{10}$/, "Phone must be 10 digits").required("Phone is required"),
        blood_group: yup.string().required("Blood Group is required"),
        address: yup.string().required("Address is required"),
        district: yup.string().required("District is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = (data) => {

        console.log("Register Data:", data);
        setLoading(true);
        axiosInstance({
            method: "post",
            url: "api/register",
            data: data
        }).then(res => {
            AsyncStorage.setItem('token', res.data.token);
            AsyncStorage.setItem('userID', res.data.user.id.toString());
            navigation.navigate("HomeMenu");
        }).catch(err => Alert.alert("Error", 'Something went wrong, please try again')).finally(() => setLoading(false));
    };

    return (
        <ImageBackground source={require("../assets/blood.png")} style={styles.container}>
            <Loading visible={loading} />
            <View style={styles.formContainer}>
                <Text style={styles.title}>Register</Text>

                {/* Name Field */}
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name *"
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
                                placeholder="Email *"
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

                {/* Mobile Field */}
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Mobile *"
                                placeholderTextColor="#888"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="phone-pad"
                            />
                        )}
                    />
                </View>
                {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

                <Controller
                    control={control}
                    name="blood_group"
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.pickerContainer}>
                            <Picker dropdownIconColor={dropdownArrow} selectedValue={value} onValueChange={onChange} style={[styles.picker, value ? { color: "#ba1b1b" } : {}]}>
                                <Picker.Item label="Select Blood Group" value="" style={{ fontSize: 15 }} />
                                {
                                    bloodGroups.map((group, index) => (
                                        <Picker.Item key={index} label={group.label} value={group.value} style={{ fontSize: 15 }} />
                                    ))
                                }
                            </Picker>
                        </View>
                    )}
                />
                {errors.blood_group && <Text style={styles.errorText}>{errors.blood_group.message}</Text>}
                {/* Address Field */}
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        name="address"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Address *"
                                placeholderTextColor="#888"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                </View>
                {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

                {/* District Field */}
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        name="district"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.pickerContainer}>
                                <Picker dropdownIconColor={dropdownArrow} selectedValue={value} onValueChange={onChange} style={styles.picker}>
                                    <Picker.Item label="Select District" value="" />
                                    {
                                        cities.map((city, index) => (
                                            <Picker.Item key={index} label={city.label} value={city.value} />
                                        ))
                                    }
                                </Picker>
                            </View>
                        )}
                    />
                </View>
                {errors.district && <Text style={styles.errorText}>{errors.district.message}</Text>}

                {/* Password Field */}
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Password *"
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
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg_color,
        padding: 20,
    },
    formContainer: {
        width: "100%",
        backgroundColor: "#ffffffff",
        padding: 20,
        borderRadius: 10,
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
        color: '#000'
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
        textAlign: "center",
    },
    loginLink: {
        color: "#007bff",
        fontWeight: "bold",
    },
    pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginTop: 10 },
    picker: { height: 50, width: "100%", color: '#838383' },
});

export default Register;
