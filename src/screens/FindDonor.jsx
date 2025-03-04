import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card, Avatar } from "react-native-paper";
import { axiosInstance } from "../utils/axiosInstance";
import { bg_color } from "../utils/utils";

const donorsData = [
    { id: "1", name: "John Doe", bloodGroup: "A+", location: "New York", phone: "123-456-7890" },
    { id: "2", name: "Jane Smith", bloodGroup: "B+", location: "Los Angeles", phone: "987-654-3210" },
    { id: "3", name: "Michael Lee", bloodGroup: "O-", location: "Chicago", phone: "555-777-8888" },
];

const FindDonor = ({ navigation }) => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [location, setLocation] = useState("");
    const [filteredDonors, setFilteredDonors] = useState(donorsData);

    const isFocused = useIsFocused();
    const [donorList, setDonorList] = useState([]);

    const getDonors = () => {
        axiosInstance.get('api/donations').then(res => {
            setDonorList(res.data);
            console.log("res", res.data);
        }).catch(err => console.log("eror", err));
    }

    useEffect(() => {
        if (isFocused) {
            getDonors();
        }
    }, [isFocused])

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
            <View style={{ flexDirection: 'row', columnGap: 10 }}>
                {/* <Picker selectedValue={bloodGroup} onValueChange={setBloodGroup} style={{ flex:1, backgroundColor: "#ff5050" }}>
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
                    placeholder="Search by name, blood group, location"
                    placeholderTextColor={"#ff5050"}
                    value={location}
                    onChangeText={setLocation}
                />
                <TouchableOpacity style={styles.button} onPress={searchDonors}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={donorList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DonorDetails", { donor: item })}>
                        <Card.Title
                            title={item.donor?.name}
                            subtitle={`Blood Group: ${item.blood_group} | Location: ${item.donor.address}`}
                            left={(props) => <Avatar.Icon {...props} icon="heart" />}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: bg_color },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "#ff5050", padding: 10, borderRadius: 8, marginBottom: 10 },
    button: { backgroundColor: "#e74c3c", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    card: { marginBottom: 10, borderRadius: 10, backgroundColor: "#fff" },
});

export default FindDonor;
