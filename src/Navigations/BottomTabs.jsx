import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../screens/Home";
import RequestNav from "./RequestNav";
import DonorNav from "./DonorNav";
import HospitalNav from "./HospitalNav";
import SettingNav from "./SettingNav";

// Dummy Screens
// const HomeScreen = () => <View style={styles.screen}><Text>Home Screen</Text></View>;
const RequestsScreen = () => <View style={styles.screen}><Text>Requests Screen</Text></View>;
const DonorsScreen = () => <View style={styles.screen}><Text>Donors Screen</Text></View>;
const BloodBanksScreen = () => <View style={styles.screen}><Text>Blood Banks Screen</Text></View>;
const SettingsScreen = () => <View style={styles.screen}><Text>Settings Screen</Text></View>;

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
        initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { backgroundColor: "#fff", height: 60, paddingBottom: 5 },
                tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "Home": iconName = "home"; break;
                        case "RequestMenu": iconName = "blood-bag"; break;
                        case "DonorMenu": iconName = "account-group"; break;
                        case "BloodBankMenu": iconName = "hospital"; break;
                        case "SettingMenu": iconName = "cog"; break;
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#e74c3c",
                tabBarInactiveTintColor: "#7f8c8d",
            })}
            backBehavior="history"
        >
            <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: "Home" }} />
            <Tab.Screen name="RequestMenu" component={RequestNav} options={{ tabBarLabel: "Requests" }} />
            <Tab.Screen name="DonorMenu" component={DonorNav} options={{ tabBarLabel: "Donors" }} />
            <Tab.Screen name="BloodBankMenu" component={HospitalNav} options={{ tabBarLabel: "Blood Banks" }} />
            <Tab.Screen name="SettingMenu" component={SettingNav} options={{ tabBarLabel: "Settings" }} />
        </Tab.Navigator>
    );
};

const styles = {
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
};

export default BottomTabs;
