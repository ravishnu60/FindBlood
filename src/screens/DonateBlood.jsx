import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { Picker } from "@react-native-picker/picker";

const donateSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    bloodGroup: yup.string().required("Blood group is required"),
    location: yup.string().required("Location is required"),
    contact: yup.string().matches(/^\d{10}$/, "Enter a valid 10-digit phone number").required("Contact number is required"),
});

const DonateBlood = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(donateSchema),
    });

    const onSubmit = (data) => {
        console.log("Donor Registered:", data);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Donate Blood</Text>

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

            {/* <Controller
                control={control}
                name="bloodGroup"
                render={({ field: { onChange, value } }) => (
                    <Picker selectedValue={value} onValueChange={onChange} style={styles.input}>
                        <Picker.Item label="Select Blood Group" value="" />
                        <Picker.Item label="A+" value="A+" />
                        <Picker.Item label="A-" value="A-" />
                        <Picker.Item label="B+" value="B+" />
                        <Picker.Item label="B-" value="B-" />
                        <Picker.Item label="O+" value="O+" />
                        <Picker.Item label="O-" value="O-" />
                        <Picker.Item label="AB+" value="AB+" />
                        <Picker.Item label="AB-" value="AB-" />
                    </Picker>
                )}
            /> */}
            {errors.bloodGroup && <Text style={styles.error}>{errors.bloodGroup.message}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Register as Donor</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DonateBlood;
