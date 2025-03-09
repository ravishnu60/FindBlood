import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, IconButton } from "react-native-paper";

const Settings = () => {
    const navigation = useNavigation();

    const logout = () => {
        console.log("enters");
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    onPress: () => navigation.navigate("Login"),
                },
            ])
    }
    return (
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <Image
                    source={require("../assets/user.png")} // Replace with user's profile image
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <Text style={styles.userName}>John Doe</Text>
                        <Text style={styles.donorLabel}>Donor</Text>
                    </View>
                    <Text>No one has ever become poor by giving</Text>
                </View>
            </View>

            {/* Buttons Section */}

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyDonations")}>
                <Text style={styles.buttonText}>My Donations</Text>
            </TouchableOpacity>
{/* 
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyRequests")}>
                <Text style={styles.buttonText}>My Requests</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
    profileContainer: { alignItems: "center", marginBottom: 20 },
    profileImage: { width: 100, height: 100, borderRadius: 50 },
    profileInfo: { flexDirection: "column", alignItems: "center", marginTop: 10 },
    userName: { fontSize: 22, fontWeight: "bold", marginRight: 8 },
    button: { backgroundColor: "#3498db", padding: 12, borderRadius: 8, alignItems: "center", marginVertical: 10, width: "80%" },
    logoutButton: { backgroundColor: "#e74c3c" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    donorLabel: { color: "#ffffff", fontWeight: "bold", backgroundColor: "#05bb41", padding: 5, borderRadius: 8, },
});

export default Settings;
