import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { axiosInstance } from "../utils/axiosInstance";
import { useIsFocused } from "@react-navigation/native";
import { bg_color } from "../utils/utils";

const Requests = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [requestList, setRequestList]= useState([]);

    const getRequest = () => {        
        axiosInstance.get('api/blood-requests').then(res => {
            setRequestList(res.data);
            console.log("res", res.data);
        }).catch(err => console.log("eror", err) );
    }

    useEffect(() => {
        if (isFocused) {
            getRequest();
        }
    }, [isFocused])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Blood Requests</Text>
            <FlatList
                data={requestList}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RequestDetails", { request: item })}>
                        <Card.Title
                            title={item.hospital.name}
                            subtitle={`Blood Group: ${item.blood_group} | Status: ${item.status}`}
                            left={(props) => <Avatar.Icon {...props} icon="hospital-building" />}
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
    card: { marginBottom: 10, borderRadius: 10, backgroundColor: "#fff"},
});

export default Requests;
