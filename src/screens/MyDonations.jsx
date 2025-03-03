import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const donations = [
    { id: "1", date: "2024-02-15", hospital: "City Hospital", bloodGroup: "A+" },
    { id: "2", date: "2023-12-10", hospital: "Red Cross Center", bloodGroup: "B-" },
];

const MyDonations = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Donations</Text>
            <FlatList
                data={donations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.text}>Date: {item.date}</Text>
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

export default MyDonations;
