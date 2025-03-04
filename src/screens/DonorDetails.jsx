import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Avatar } from "react-native-paper";
import { bg_color } from "../utils/utils";

const DonorDetails = ({ route }) => {
    const { donor } = route.params;

    return (
        <View style={styles.container}>
            <Avatar.Icon size={100} icon="account" style={styles.avatar} />
            <View style={{ backgroundColor: "#fff", padding: 15, borderRadius: 10 }}>
                <Text style={styles.header}>Donor Name</Text>
                <Text style={styles.text}>{donor.donor.name}</Text>
                <Text style={styles.header}>Donor Address</Text>
                <Text style={styles.text}> {donor.donor.address}</Text>
                <Text style={styles.header}>Blood Group</Text>
                <Text style={[styles.text, { color: 'red', fontWeight: 'bold' }]}>{donor.blood_group}</Text>
                <Text style={styles.header}>Status</Text>
                <Text style={styles.text}>{donor.status}</Text>
                <Text style={styles.header}>Date</Text>
                <Text style={styles.text}>{new Date(donor.created_at).toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(`tel:${donor.donor.phone}`)}>
                <Text style={styles.buttonText}>Call Donor</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: bg_color, padding: 20 },
    avatar: { backgroundColor: "#e74c3c", marginBottom: 20, alignSelf: "center" },
    name: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    header: { fontSize: 18, fontWeight: "bold", marginBottom: 0 },
    text: { fontSize: 18, marginBottom: 10, marginLeft: 10 },
    button: { backgroundColor: "#3498db", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default DonorDetails;
