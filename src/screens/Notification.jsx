import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, Avatar } from "react-native-paper";
import CustomHeader from "./CustomHeader";

const notifications = [
    { id: "1", title: "New Blood Request", message: "A+ blood needed urgently at City Hospital.", type: "blood" },
    { id: "2", title: "Donation Success", message: "Thank you for your blood donation!", type: "success" },
    { id: "3", title: "Urgent Requirement", message: "B- blood needed for emergency surgery.", type: "alert" },
    { id: "4", title: "Event Reminder", message: "Blood Donation Camp on 10th March at Red Cross Center.", type: "event" },
];

const getIcon = (type) => {
    switch (type) {
        case "blood":
            return "blood-bag";
        case "success":
            return "check-circle";
        case "alert":
            return "alert-circle";
        case "event":
            return "calendar";
        default:
            return "information";
    }
};

const Notification = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <CustomHeader title="Notifications" />

            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title
                            title={item.title}
                            subtitle={item.message}
                            left={(props) => <Avatar.Icon {...props} icon={getIcon(item.type)} />}
                        />
                    </Card>
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    card: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 3,
    },
});

export default Notification;
