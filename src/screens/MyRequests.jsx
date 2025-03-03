import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const receipts = [
    { id: "1", date: "2024-01-05", donor: "John Doe", hospital: "City Hospital", bloodGroup: "A+" },
    { id: "2", date: "2023-11-20", donor: "Jane Smith", hospital: "Red Cross Center", bloodGroup: "O-" },
];

const MyRequests = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Blood Request</Text>
            <FlatList
                data={receipts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.text}>Date: {item.date}</Text>
                        <Text style={styles.text}>Donor: {item.donor}</Text>
                        <Text style={styles.text}>Hospital: {item.hospital}</Text>
                        <Text style={styles.text}>Blood Group: {item.bloodGroup}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    card: { backgroundColor: "#ecf0f1", padding: 15, borderRadius: 8, marginBottom: 10 },
    text: { fontSize: 16 },
});

export default MyRequests;
