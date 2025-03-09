import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Fontawesome from "react-native-vector-icons/FontAwesome";

const FindDonors = ({ navigation }) => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [location, setLocation] = useState("");
    const [donors, setDonors] = useState([]);

    const handleSearch = () => {
        // Dummy data for demonstration (replace with API call)
        const dummyDonors = [
            { id: "1", name: "John Doe", bloodGroup: "O+", location: "New York" },
            { id: "2", name: "Alice Smith", bloodGroup: "A+", location: "Los Angeles" },
        ];
        setDonors(dummyDonors);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find Blood Donors</Text>

            <Text style={styles.label}>Blood Group</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={bloodGroup} onValueChange={setBloodGroup} style={styles.picker}>
                    <Picker.Item label="Select Blood Group" value="" />
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="O-" value="O-" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="AB-" value="AB-" />
                </Picker>
            </View>

            <Text style={styles.label}>Location</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={"#515151"}
                placeholder="Enter location"
                value={location}
                onChangeText={setLocation}
            />

            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Search Donors</Text>
            </TouchableOpacity>

            <FlatList
                data={donors}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("DonorDetails", { donor: item })} style={styles.list} >
                        <View style={styles.donorCard} >
                            <Text style={styles.donorName}>{item.name}</Text>
                            <Text style={{ fontWeight: "bold" }}>Blood Group: <Text style={{ fontWeight: "bold", color: "#e74c3c" }}>{item.bloodGroup}</Text></Text>
                            <Text style={{ fontWeight: "bold" }}>Location: <Text style={{ fontWeight: "normal", color: "#717171" }}>{item.location}</Text></Text>
                        </View>
                        <Fontawesome name="arrow-right" size={25} color="#959595" />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    input: { borderWidth: 1, borderColor: "#ccc", color: "#000", padding: 10, borderRadius: 5, marginBottom: 10 },
    pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
    picker: { height: 50, width: "100%", color: "#000" },
    button: { backgroundColor: "#e74c3c", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    donorCard: { flexDirection: "column", alignItems: "flex-start", rowGap: 5 },
    donorName: { fontSize: 18, fontWeight: "bold" },
    list : {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, backgroundColor: "#f2f2f2", marginTop: 10, borderRadius: 8, padding: 10}
});

export default FindDonors;
