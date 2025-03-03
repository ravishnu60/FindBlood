import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomHeader = ({ title }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            {
                title === 'Notifications' &&
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={28} color="#fff" />
                </TouchableOpacity>
            }
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Notification")}>
                {title !== 'Notifications' && <Icon name="bell-outline" size={28} color="#fff" />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#e74c3c",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default CustomHeader;
