import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import { bg_color, Loading } from "../utils/utils";
import axiosInstance from "../utils/axiosInstance";

const Requests = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [requestList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRequest = () => {
        setLoading(true);
        axiosInstance.get('api/blood-requests').then(res => {
            setRequestList(res.data);
        }).catch(err => console.log("eror", err)).finally(() => setLoading(false));
    }

    const getStatusColor = (status) => {
        status = status.charAt(0).toUpperCase() + status.slice(1)
        switch (status) {
            case "Pending":
                return "#0078b5";
            case "Approved":
                return "#06c206";
            case "Rejected":
                return "#c10000";
            default:
                return "#bc2d2d";
        }
    }

    const getUrgencyColor = (urgency) => {
        urgency = urgency ? urgency.charAt(0).toUpperCase() + urgency.slice(1) : 'Normal';
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
            <Loading visible={loading} />
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
                                <Text style={{ marginRight: 10, fontWeight: "bold", }}> Blood: <Text style={{ fontSize: 15, fontWeight: "bold", color: "#901111" }}>{item.blood_group}</Text></Text>
                                <Text style={{ marginRight: 10, fontWeight: "bold", }}> Level: <Text style={{ fontSize: 15, fontWeight: "bold", color: getUrgencyColor(item.urgency) }}>{item.urgency_level || 'Normal'} </Text></Text>
                            </View>
                            <View style={{ flexDirection: "row", columnGap: 20, alignItems: "center", marginBottom: 10 }} >
                                <Text style={{ marginRight: 10, fontWeight: "bold", }}> Hospital: <Text style={{ fontSize: 14, fontWeight: "normal", color: "#5b5b5b" }}>{item.hospital?.name}</Text></Text>
                            </View>
                            <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Place: <Text style={{ fontSize: 14, fontWeight: "normal", color: "#5b5b5b" }}>{item.hospital?.address} - {item.hospital?.district}</Text></Text>
                            <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Notes: <Text style={{ fontSize: 13, fontWeight: "normal" }}>{item.additional_notes || 'No notes'}</Text></Text>
                            <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Status: <Text style={{ fontSize: 15, fontWeight: "bold", color: getStatusColor(item.status) }}>{item.status === 'approved' ? 'Donated' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text></Text>
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
