import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { bg_color, Loading } from "../utils/utils";
import axiosInstance from "../utils/axiosInstance";

const DonorViewRequest = ({ onClose }) => {
    const isFocused = useIsFocused();
    const [requestList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRequest = () => {
        setLoading(true);
        axiosInstance.get('api/get/requests').then(res => {
            console.log(res.data);

            setRequestList(res?.data?.totalRequest);
        }).catch(err => console.log("eror", err)).finally(() => setLoading(false));
    }

    const getStatusColor = (status) => {
        status = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending';
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
            <View style={styles.header}>
                <FontAwesome name="arrow-left" size={25} color="#707070" onPress={onClose} />
                <Text style={styles.title}>Blood Requests</Text>
            </View>
            {
                !loading && requestList.length === 0 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}><Text style={{ fontSize: 15 }}>No requests found</Text></View>
            }
            <FlatList
                data={requestList}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card} onPress={() => navigation.navigate("RequestDetails", { request: item })}>
                        <Fontisto name="blood-drop" size={35} color="#bc2d2d" />
                        <View >
                            <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Name: <Text style={{ fontSize: 15, fontWeight: "bold", color: "#901111" }}>{item.name}</Text></Text>

                            <View style={{ flexDirection: "row", columnGap: 20, alignItems: "center", marginBottom: 10 }} >
                                <Text style={{ marginRight: 10, fontWeight: "bold", }}> Blood: <Text style={{ fontSize: 15, fontWeight: "bold", color: "#901111" }}>{item?.blood_requests?.[0]?.blood_group}</Text></Text>
                                <Text style={{ marginRight: 10, fontWeight: "bold", }}> Level: <Text style={{ fontSize: 15, fontWeight: "bold", color: getUrgencyColor(item?.blood_requests?.[0]?.urgency) }}>{item?.blood_requests?.[0]?.urgency || 'Normal'} </Text></Text>
                            </View>
                            <View style={{ flexDirection: "row", columnGap: 20, alignItems: "center", marginBottom: 10 }} >
                                <Text style={{ marginRight: 10, fontWeight: "bold", }}> Hospital: <Text style={{ fontSize: 14, fontWeight: "normal", color: "#5b5b5b" }}>{item?.blood_requests?.[0]?.hospital?.name}</Text></Text>
                            </View>
                            <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Place: <Text style={{ fontSize: 14, fontWeight: "normal", color: "#5b5b5b" }}>{item?.blood_requests?.[0]?.hospital?.address} - {item?.blood_requests?.[0]?.hospital?.district}</Text></Text>
                            <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Notes: <Text style={{ fontSize: 13, fontWeight: "normal" }}>{item?.blood_requests?.[0]?.additional_notes || 'No notes'}</Text></Text>
                            <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Status: <Text style={{ fontSize: 15, fontWeight: "bold", color: getStatusColor(item?.blood_groups[0]?.status) }}>{item?.blood_requests?.[0]?.status === 'approved' ? 'Donated' : item?.blood_requests?.[0]?.status.charAt(0).toUpperCase() + item?.blood_requests?.[0]?.status.slice(1)}</Text></Text>
                            {item?.donated_by && <Text style={{ marginRight: 10, fontWeight: "bold", marginBottom: 10 }}> Donated by: <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item?.donated_by}</Text></Text>}
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: bg_color, borderRadius: 5 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 15, columnGap: 25 },
    title: { fontSize: 22, fontWeight: "bold" },
    card: { marginBottom: 15, padding: 10, paddingHorizontal: 20, borderRadius: 10, backgroundColor: "#f3f3f3", flexDirection: "row", alignItems: "center", columnGap: 20 },
});

export default DonorViewRequest;
