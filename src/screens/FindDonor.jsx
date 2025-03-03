import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
// import { Picker } from "@react-native-picker/picker";
import { Card, Avatar } from "react-native-paper";

const donorsData = [
    { id: "1", name: "John Doe", bloodGroup: "A+", location: "New York", phone: "123-456-7890" },
    { id: "2", name: "Jane Smith", bloodGroup: "B+", location: "Los Angeles", phone: "987-654-3210" },
    { id: "3", name: "Michael Lee", bloodGroup: "O-", location: "Chicago", phone: "555-777-8888" },
];

const FindDonor = ({ navigation }) => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [location, setLocation] = useState("");
    const [filteredDonors, setFilteredDonors] = useState(donorsData);

    const searchDonors = () => {
        const filtered = donorsData.filter(donor =>
            (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
            (location ? donor.location.toLowerCase().includes(location.toLowerCase()) : true)
        );
        setFilteredDonors(filtered);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find Donors</Text>
            {/* <Picker selectedValue={bloodGroup} onValueChange={setBloodGroup} style={styles.input}>
                <Picker.Item label="Select Blood Group" value="" />
                <Picker.Item label="A+" value="A+" />
                <Picker.Item label="A-" value="A-" />
                <Picker.Item label="B+" value="B+" />
                <Picker.Item label="B-" value="B-" />
                <Picker.Item label="O+" value="O+" />
                <Picker.Item label="O-" value="O-" />
                <Picker.Item label="AB+" value="AB+" />
                <Picker.Item label="AB-" value="AB-" />
            </Picker> */}
            <TextInput
                style={styles.input}
                placeholder="Enter Location"
                value={location}
                onChangeText={setLocation}
            />
            <TouchableOpacity style={styles.button} onPress={searchDonors}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>

            <FlatList
                data={filteredDonors}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPress={() => navigation.navigate("DonorDetails", { donor: item })}>
                        <Card.Title
                            title={item.name}
                            subtitle={`Blood Group: ${item.bloodGroup} | Location: ${item.location}`}
                            left={(props) => <Avatar.Icon {...props} icon="account-heart" />}
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
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10 },
    button: { backgroundColor: "#e74c3c", padding: 12, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    card: { marginBottom: 10, borderRadius: 10, backgroundColor: "#fff", elevation: 3 },
});

export default FindDonor;
