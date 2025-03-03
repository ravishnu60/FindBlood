import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Avatar, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomHeader from "./CustomHeader";

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <CustomHeader title="Home" />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("RequestMenu")}>
                        <Icon name="blood-bag" size={30} color="#e74c3c" />
                        <Text style={styles.actionText}>New Request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("DonorMenu")}>
                        <Icon name="account-plus" size={30} color="#27ae60" />
                        <Text style={styles.actionText}>Become Donor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("BloodBankMenu")}>
                        <Icon name="hospital-building" size={30} color="#3498db" />
                        <Text style={styles.actionText}>Find Blood Bank</Text>
                    </TouchableOpacity>
                </View>

                {/* Overview Cards */}
                <Card style={styles.card}>
                    <Card.Title title="Total Requests" left={(props) => <Avatar.Icon {...props} icon="blood-bag" />} />
                    <Card.Content>
                        <Text style={styles.cardText}>120 Active Requests</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Title title="Available Donors" left={(props) => <Avatar.Icon {...props} icon="account-group" />} />
                    <Card.Content>
                        <Text style={styles.cardText}>350 Registered Donors</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Title title="Nearby Blood Banks" left={(props) => <Avatar.Icon {...props} icon="hospital" />} />
                    <Card.Content>
                        <Text style={styles.cardText}>15 Blood Banks Found</Text>
                    </Card.Content>
                </Card>

                {/* Donate Button */}
                <Button mode="contained" style={styles.donateButton} onPress={() => navigation.navigate("Donors")}>
                    Donate Blood Now
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        padding: 16,
    },
    quickActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    actionButton: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        width: "30%",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 5, height: 2 },
        elevation: 10,
    },
    actionText: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: "bold",
    },
    card: {
        marginBottom: 16,
        borderRadius: 10,
        overflow: "hidden",
    },
    cardText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    donateButton: {
        marginTop: 20,
        backgroundColor: "#e74c3c",
        padding: 10,
        borderRadius: 10,
    },
});

export default Home;
