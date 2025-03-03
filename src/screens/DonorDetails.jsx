import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Avatar } from "react-native-paper";

const DonorDetails = ({ route }) => {
    const { donor } = route.params;

    return (
        <View style={styles.container}>
            <Avatar.Icon size={100} icon="account" style={styles.avatar} />
            <Text style={styles.name}>{donor.name}</Text>
            <Text style={styles.text}>Blood Group: {donor.bloodGroup}</Text>
            <Text style={styles.text}>Location: {donor.location}</Text>
            <Text style={styles.text}>Phone: {donor.phone}</Text>

            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(`tel:${donor.phone}`)}>
                <Text style={styles.buttonText}>Call Donor</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
    avatar: { backgroundColor: "#e74c3c", marginBottom: 20 },
    name: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    text: { fontSize: 18, marginBottom: 10 },
    button: { backgroundColor: "#3498db", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default DonorDetails;
