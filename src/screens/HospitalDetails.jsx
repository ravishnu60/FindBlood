import React from "react";
import { View, Linking, StyleSheet } from "react-native";
import { Card, Text, Button, Avatar } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { iconBg } from "../utils/utils";

const HospitalDetails = ({ route }) => {
    const { name, phone, address, email, district } = route.params.hospital;

    const dialPhone = () => {
        Linking.openURL(`tel:${phone}`);
    };

    const openMaps = () => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
    };

    return (
        <View style={styles.container}>
            <Avatar.Icon size={100} icon="hospital-building" style={styles.avatar} />
            <Text style={styles.title}>{name}</Text>
            <Card style={styles.card}>
                {/* <Card.Title title={name} titleStyle={styles.title} /> */}
                <Card.Content>
                    <View style={styles.infoRow}>
                        <FontAwesome name="phone" size={18} color="green" />
                        <Text style={styles.infoText} onPress={dialPhone}>{phone}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <FontAwesome name="envelope" size={18} color="#225ed6" />
                        <Text style={styles.infoText} onPress={() => Linking.openURL(`mailto:${email}`)}>{email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <FontAwesome name="map-marker" size={18} color="red" />
                        <Text style={styles.infoText}>{address} - {district}</Text>
                    </View>
                </Card.Content>
                <View style={{ marginTop: 25, marginBottom: 15, flexDirection: "row", justifyContent: "center", columnGap: 15 }}>
                    <Button mode="contained"  style={{backgroundColor: "#1eb034", borderRadius: 10}} onPress={dialPhone}>Call</Button>
                    <Button mode="contained" style={{backgroundColor: "#2191d6", borderRadius: 10}} onPress={openMaps}>View on Map</Button>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f2f2f2",
    },
    avatar: {
        alignSelf: "center",
        marginBottom: 10,
        backgroundColor: iconBg,
    },
    card: {
        padding: 15,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    infoText: {
        marginLeft: 10,
        fontSize: 16,
        color: "blue",
    },
});

export default HospitalDetails;