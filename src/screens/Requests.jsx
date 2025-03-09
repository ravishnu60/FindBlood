import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import { bg_color } from "../utils/utils";
import axiosInstance from "../utils/axiosInstance";

const Requests = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [requestList, setRequestList] = useState([
        { id: 1, bloodGroup: "A+", urgency: 'Urgent', status: "Pending", hospitalOrLocation: "City Hospital, chennai", date: "2023-08-01", notes: "I need blood urgently", donated_by: null },
        { id: 2, bloodGroup: "B-", urgency: 'Normal', status: "Accepted", hospitalOrLocation: "Red Cross Center, chennai", date: "2023-08-02", notes: "I need blood for surgery", donated_by: 'Donor' },
        { id: 3, bloodGroup: "O+", urgency: 'Urgent', status: "Accepted", hospitalOrLocation: "Don bosco college, chennai", date: "2023-08-03", notes: "I need blood for operation", donated_by: 'Hospital' },
    ]);

    const getRequest = () => {
        axiosInstance.get('api/blood-requests').then(res => {
            // setRequestList(res.data);
            console.log("res", res.data);
        }).catch(err => console.log("eror", err));
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "#0078b5";
            case "Accepted":
                return "#06c206";
            case "Rejected":
                return "#c10000";
            default:
                return "#bc2d2d";
        }
    }

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case "Urgent":
                return "#c10000";
            case "Normal":
                return "#00b554";
            default:
                return "#bc2d2d";
        }
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
                    <View style={styles.card} onPress={() => navigation.navigate("RequestDetails", { request: item })}>
                        <Fontisto name="blood-drop" size={35} color="#bc2d2d" />
                        <View style={{}}>
                            <View style={{ flexDirection: "row", columnGap: 20, alignItems: "center", marginBottom: 10 }} >
                                <Text style={{ marginRight: 10, fontWeight: "bold", }}> Blood: <Text style={{ fontSize: 15, fontWeight: "bold", color: "#901111" }}>{item.bloodGroup}</Text></Text>
                                <Text style={{ marginRight: 10, fontWeight: "bold", }}> Level: <Text style={{ fontSize: 15, fontWeight: "bold", color: getUrgencyColor(item.urgency) }}>{item.urgency} </Text></Text>
                            </View>
                            <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Notes: <Text style={{ fontSize: 13, fontWeight: "normal" }}>{item.notes}</Text></Text>
                            <View style={{ flexDirection: "row", columnGap: 20, alignItems: "center", marginBottom: 10 }} >
                                <Text style={{ marginRight: 10, fontWeight: "bold", }}> place: <Text style={{ fontSize: 14, fontWeight: "normal", color: "#5b5b5b" }}>{item.hospitalOrLocation}</Text></Text>
                            </View>
                            <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Status: <Text style={{ fontSize: 15, fontWeight: "bold", color: getStatusColor(item.status) }}>{item.status}</Text></Text>
                            {item?.donated_by && <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Donated by: <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.donated_by}</Text></Text>}
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: bg_color },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
    card: { marginBottom: 15, padding: 10, paddingHorizontal: 20, borderRadius: 10, backgroundColor: "#f3f3f3", flexDirection: "row", alignItems: "center", columnGap: 20 },
});

export default Requests;
