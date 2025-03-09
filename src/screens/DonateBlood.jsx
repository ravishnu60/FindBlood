import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const DonateBlood = ({ onClose }) => {
    // Validation Schema
    const donateSchema = yup.object().shape({
        bloodGroup: yup.string().required("Blood group is required"),
        location: yup.string().min(3, "Location must be at least 3 characters").required("Location is required"),
    });

    // React Hook Form setup
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(donateSchema),
    });

    const onSubmit = (data) => {
        Alert.alert("Success", `You have registered as a donor!\nBlood Group: ${data.bloodGroup}\nLocation: ${data.location}`);
        onClose();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Donate Blood</Text>

            {/* Blood Group Selection */}
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
            {errors.bloodGroup && <Text style={styles.errorText}>{errors.bloodGroup.message}</Text>}

            {/* Location Input */}
            <Text style={styles.label}>Location</Text>
            <Controller
                control={control}
                name="location"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter location"
                        placeholderTextColor="#545454"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.location && <Text style={styles.errorText}>{errors.location.message}</Text>}

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Register as Donor</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: { borderRadius: 10, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
    picker: { height: 50, width: "100%", color: '#000' },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10, color: '#000' },
    button: { backgroundColor: "#e74c3c", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    errorText: { color: "red", fontSize: 14, marginBottom: 5 },
});

export default DonateBlood;
