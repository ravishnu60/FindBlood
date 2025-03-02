import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Dummy Screens
const HomeScreen = () => <View style={styles.screen}><Text>Home Screen</Text></View>;
const RequestsScreen = () => <View style={styles.screen}><Text>Requests Screen</Text></View>;
const DonorsScreen = () => <View style={styles.screen}><Text>Donors Screen</Text></View>;
const BloodBanksScreen = () => <View style={styles.screen}><Text>Blood Banks Screen</Text></View>;
const SettingsScreen = () => <View style={styles.screen}><Text>Settings Screen</Text></View>;

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { backgroundColor: "#fff", height: 60, paddingBottom: 5 },
                tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "Home": iconName = "home"; break;
                        case "Requests": iconName = "blood-bag"; break;
                        case "Donors": iconName = "account-group"; break;
                        case "Blood Banks": iconName = "hospital"; break;
                        case "Settings": iconName = "cog"; break;
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#e74c3c",
                tabBarInactiveTintColor: "#7f8c8d",
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Requests" component={RequestsScreen} />
            <Tab.Screen name="Donors" component={DonorsScreen} />
            <Tab.Screen name="Blood Banks" component={BloodBanksScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
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
