import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";

const requestSchema = yup.object().shape({
    bloodGroup: yup.string().required("Blood Group is required"),
    urgency: yup.string().required("Urgency Level is required"),
    hospital: yup.string().required("Hospital name is required"),
    notes: yup.string().optional(),
});

const BloodRequest = ({ navigation }) => {
    const isFocused= useIsFocused();

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(requestSchema),
    });

    const onSubmit = (data) => {
        console.log("Blood Request Data:", data);
        Alert.alert("Success", "Blood request submitted successfully!");
        navigation.navigate("MyRequests");
    };


    useEffect(() => {
        if (isFocused) {
            reset({});
        }
    }, [isFocused]);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Request Blood</Text>

            <Text style={styles.label}>Blood Group</Text>
            <Controller
                control={control}
                name="bloodGroup"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
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
                    </View>
                )}
            />
            {errors.bloodGroup && <Text style={styles.error}>{errors.bloodGroup.message}</Text>}

            <Text style={styles.label}>Urgency Level</Text>
            <Controller
                control={control}
                name="urgency"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
                            <Picker.Item label="Select Urgency Level" value="" />
                            <Picker.Item label="Normal" value="Normal" />
                            <Picker.Item label="Urgent" value="Urgent" />
                        </Picker>
                    </View>
                )}
            />
            {errors.urgency && <Text style={styles.error}>{errors.urgency.message}</Text>}

            <Text style={styles.label}>Hospital / Location</Text>
            <Controller
                control={control}
                name="hospital"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter hospital name"
                        placeholderTextColor={'#3b3b3b'}
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.hospital && <Text style={styles.error}>{errors.hospital.message}</Text>}

            <Text style={styles.label}>Additional Notes</Text>
            <Controller
                control={control}
                name="notes"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Any additional details"
                        placeholderTextColor={'#3b3b3b'}
                        multiline
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />

            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                <Text style={styles.buttonText}>Submit Request</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate("Requests")} style={styles.pastReq}>
                <Text style={styles.buttonText}>My Requests</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    input: { borderWidth: 1, borderColor: "#ccc", color: '#000', padding: 10, borderRadius: 5, marginBottom: 10 },
    pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
    picker: { height: 50, width: "100%", color:'#000' },
    error: { color: "red", marginBottom: 10 },
    button: { backgroundColor: "#e74c3c", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
    pastReq: { backgroundColor: "#4daa85", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default BloodRequest;
