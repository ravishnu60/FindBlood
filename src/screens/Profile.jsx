import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const profileSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().matches(/^\d{10}$/, "Phone must be 10 digits").required("Phone is required"),
    bloodGroup: yup.string().oneOf(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], "Select a valid blood group"),
    address: yup.string().required("Address is required"),
});

const Profile = ({ navigation }) => {
    const [profileImage, setProfileImage] = useState(null);
    
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "1234567890",
            bloodGroup: "O+",
            address: "123 Street, City, Country",
        }
    });

    const onSubmit = (data) => {
        console.log("Updated Profile Data:", data);
    };

    return (
        <View style={styles.container}>
            {/* Profile Image Section */}
            <TouchableOpacity >
                <Image
                    source={profileImage ? { uri: profileImage } : require("../assets/user.png")}
                    style={styles.profileImage}
                />
                {/* <Text style={styles.changePhotoText}>Change Photo</Text> */}
            </TouchableOpacity>

            {/* Form Fields */}
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
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="email-address"
                    />
                )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="numeric"
                    />
                )}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

            <Controller
                control={control}
                name="bloodGroup"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Blood Group (e.g., O+)"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.bloodGroup && <Text style={styles.errorText}>{errors.bloodGroup.message}</Text>}

            <Controller
                control={control}
                name="address"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Address"
                        value={value}
                        onChangeText={onChange}
                        multiline
                    />
                )}
            />
            {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

            {/* Save Button */}
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff", alignItems: "center" },
    profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
    changePhotoText: { color: "#3498db", fontSize: 14, marginBottom: 20 },
    input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 8 },
    textArea: { height: 80 },
    errorText: { color: "red", fontSize: 12, alignSelf: "flex-start" },
    saveButton: { backgroundColor: "#27ae60", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10, width: "100%" },
    saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default Profile;
