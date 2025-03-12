import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomHeader from "./CustomHeader";
import DonateBlood from "./DonateBlood";
import axiosInstance from "../utils/axiosInstance";
import { ContextData } from "../Navigations/MainNavigator";
import { iconBg, Loading } from "../utils/utils";
import DonorViewRequest from "./DonorViewRequest";

const Home = ({ navigation }) => {
    const contextVal = useContext(ContextData);

    const [modalVisible, setModalVisible] = useState(false);
    const [countDetails, setCountDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [donorModal, setDonorModal] = useState(false);

    const getCountDetails = () => {
        setLoading(true);
        axiosInstance({baseURL: contextVal?.api?.base_url}).get('get/counts').then(res => {
            setCountDetails(res.data);
        }).catch(err => console.log("eror", err)).finally(() => setLoading(false));
    }
    const getCurrentUser = () => {
        axiosInstance({baseURL: contextVal?.api?.base_url}).get('current-user').then(res => {
            contextVal.setUser(res.data)
        }).catch(err => console.log("eror", err));
    }

    const handleModalClose = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        getCountDetails();
        getCurrentUser();
    }, [modalVisible]);

    return (
        <View style={styles.container}>
            <CustomHeader title="Home" />
            <Loading visible={loading} />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("RequestMenu")}>
                        <Icon name="blood-bag" size={30} color="#e74c3c" />
                        <Text style={styles.actionText}>New Request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => contextVal?.user?.is_donor ? setDonorModal(true) : setDonorModal(true)}>
                        <Icon name={contextVal?.user?.is_donor ? "account-heart" : "account-plus"} size={30} color="#27ae60" />
                        <Text style={styles.actionText}>{contextVal?.user?.is_donor ? "Donate Blood" : "Become Donor"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("BloodBankMenu")}>
                        <Icon name="hospital-building" size={30} color="#3498db" />
                        <Text style={styles.actionText}>Find Blood Bank</Text>
                    </TouchableOpacity>
                </View>

                {/* Overview Cards */}
                <Card style={styles.card}>
                    <Card.Title title="Total Requests" left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: iconBg }} icon="water" />} />
                    <Card.Content>
                        <Text style={styles.cardText}>{countDetails?.totalRequest} Requests</Text>
                    </Card.Content>
                </Card>
                {
                    contextVal?.user?.is_donor ?
                        <Card style={styles.card}>
                            <Card.Title title="Total Donations" left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: iconBg }} icon="blood-bag" />} />
                            <Card.Content>
                                <Text style={styles.cardText}>{countDetails?.donation} Donations</Text>
                            </Card.Content>
                        </Card>
                        : ''
                }

                <Card style={styles.card}>
                    <Card.Title title="Available Donors" left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: iconBg }} icon="account-group" />} />
                    <Card.Content>
                        <Text style={styles.cardText}>{countDetails?.donor} Registered Donors</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Title title="Nearby Blood Banks" left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: iconBg }} icon="hospital" />} />
                    <Card.Content>
                        <Text style={styles.cardText}>{countDetails?.hospital} Blood Banks Found</Text>
                    </Card.Content>
                </Card>

                {/* Donate Button */}
                {/* <Button mode="contained" style={styles.donateButton} onPress={() => navigation.navigate("Donors")}>
                    Donate Blood Now
                </Button> */}
            </ScrollView>
            <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={handleModalClose}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <DonateBlood onClose={handleModalClose} currUser={contextVal?.user} />
                    </View>
                </View>
            </Modal>
            <Modal visible={donorModal} animationType="slide" transparent={true} onRequestClose={() => setDonorModal(false)}>
                <View style={[styles.modalContainer, {backgroundColor:'#62e2ff50'}]}>
                    <View style={[styles.modalContent, {flex: 1}]}>
                        <DonorViewRequest onClose={()=> setDonorModal(false)} />
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fcadad80",
    },
    modalContent: {
        margin: 20,
    },
});

export default Home;
