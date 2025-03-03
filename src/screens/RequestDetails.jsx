import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RequestDetails = ({ route }) => {
    const { request } = route.params;
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Request Details</Text>
            <Text style={styles.text}>Hospital: {request.hospital}</Text>
            <Text style={styles.text}>Blood Group: {request.bloodGroup}</Text>
            <Text style={styles.text}>Status: {request.status}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    text: { fontSize: 18, marginBottom: 10 },
});

export default RequestDetails;
