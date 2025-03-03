import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, Avatar } from "react-native-paper";

const requests = [
    { id: "1", hospital: "City Hospital", bloodGroup: "A+", status: "Pending" },
    { id: "2", hospital: "Red Cross", bloodGroup: "B-", status: "Completed" },
    { id: "3", hospital: "Apollo Clinic", bloodGroup: "O+", status: "In Progress" },
];

const Requests = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Blood Requests</Text>
            <FlatList
                data={requests}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPress={() => navigation.navigate("RequestDetails", { request: item })}>
                        <Card.Title
                            title={item.hospital}
                            subtitle={`Blood Group: ${item.bloodGroup} | Status: ${item.status}`}
                            left={(props) => <Avatar.Icon {...props} icon="hospital-building" />}
                        />
                    </Card>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    card: { marginBottom: 10, borderRadius: 10, backgroundColor: "#fff", elevation: 3 },
});

export default Requests;
