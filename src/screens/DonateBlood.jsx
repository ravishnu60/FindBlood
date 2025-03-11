import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bloodGroups, cities, dropdownArrow, Loading } from "../utils/utils";
import axiosInstance from "../utils/axiosInstance";

const DonateBlood = ({ onClose, currUser }) => {
    const [loading, setLoading] = useState(false);
    // Validation Schema
    const donateSchema = yup.object().shape({
        blood_group: yup.string().required("Blood group is required"),
        district: yup.string().required("District is required"),
    });

    // React Hook Form setup
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(donateSchema),
        defaultValues: {
            blood_group: currUser?.blood_group,
            district: currUser?.district,
        }
    });

    const onSubmit = (data) => {
        setLoading(true);
        axiosInstance({
            method: "POST",
            url: "api/become-donor",
            data: data
        }).then((res) => {
            console.log(res);
            Alert.alert("You are a Donor!", `You have registered as a donor!\nBlood Group: ${data.blood_group}\nLocation: ${data.district}`);
        }).catch((err) => {
            Alert.alert("Error", "Something went wrong, please try again later!");
        }).finally(() => {
            setLoading(false);
            onClose();
        });
    };

    return (
        <View style={styles.container}>
            <Loading visible={loading} />
            <Text style={styles.title}>Become Donor</Text>
            <Text style={{ fontWeight: "bold", textAlign: "center", color: "#1bb250", marginBottom: 15 }}>Be a hero, donate blood and save lives! ❤️💉</Text>
            {/* Blood Group Selection */}
            <Text style={styles.label}>Blood Group</Text>
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

            {/* District Input */}
            <Text style={styles.label}>District</Text>
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
            {errors.district && <Text style={styles.errorText}>{errors.district.message}</Text>}

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
