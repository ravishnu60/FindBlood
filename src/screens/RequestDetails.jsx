import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { bg_color } from "../utils/utils";

const RequestDetails = ({ route }) => {
    const { request } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Request Details</Text>
            <View style={{ backgroundColor: "#fff", padding: 15, borderRadius: 10 }}>
                <Text style={styles.header}>Hospital Name</Text>
                <Text style={styles.text}>{request.hospital.name}</Text>
                <Text style={styles.header}>Hospital Address</Text>
                <Text style={styles.text}> {request.hospital.address}</Text>
                <Text style={styles.header}>Blood Group</Text>
                <Text style={[styles.text, {color:'red', fontWeight:'bold'}]}>{request.blood_group}</Text>
                <Text style={styles.header}>Status</Text>
                <Text style={styles.text}>{request.status}</Text>
                <Text style={styles.header}>Date</Text>
                <Text style={styles.text}>{new Date(request.created_at).toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: bg_color },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    header: { fontSize: 18, fontWeight: "bold", marginBottom: 0 },
    text: { fontSize: 18, marginBottom: 10, marginLeft: 10 },
});

export default RequestDetails;
