import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { Picker } from "@react-native-picker/picker";

const requestSchema = yup.object().shape({
    hospital: yup.string().required("Hospital name is required"),
    bloodGroup: yup.string().required("Blood group is required"),
    urgency: yup.string().required("Urgency level is required"),
    contact: yup.string().matches(/^\d{10}$/, "Enter a valid 10-digit phone number").required("Contact number is required"),
});

const BloodRequest = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(requestSchema),
    });

    const onSubmit = (data) => {
        console.log("Request Submitted:", data);
        navigation.navigate("MyRequests");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Request Blood</Text>

            <Controller
                control={control}
                name="hospital"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Hospital Name"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.hospital && <Text style={styles.error}>{errors.hospital.message}</Text>}

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

            <Controller
                control={control}
                name="urgency"
                render={({ field: { onChange, value } }) => (
                    <Picker selectedValue={value} onValueChange={onChange} style={styles.input}>
                        <Picker.Item label="Select Urgency" value="" />
                        <Picker.Item label="Low" value="Low" />
                        <Picker.Item label="Medium" value="Medium" />
                        <Picker.Item label="High" value="High" />
                        <Picker.Item label="Emergency" value="Emergency" />
                    </Picker>
                )}
            />
            {errors.urgency && <Text style={styles.error}>{errors.urgency.message}</Text>}

            <Controller
                control={control}
                name="contact"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Contact Number"
                        keyboardType="phone-pad"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.contact && <Text style={styles.error}>{errors.contact.message}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Submit Request</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10 },
    error: { color: "red", fontSize: 12, marginBottom: 10 },
    button: { backgroundColor: "#e74c3c", padding: 12, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default BloodRequest;
