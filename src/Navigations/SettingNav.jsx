import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import CustomHeader from '../screens/CustomHeader';
import Settings from '../screens/Settings';
import MyDonations from '../screens/MyDonations';
import MyRequests from '../screens/MyRequests';
import Profile from '../screens/Profile';

function SettingNav() {
    const Stack = createNativeStackNavigator();
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Settings" />
            <Stack.Navigator initialRouteName='Settings' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="MyDonations" component={MyDonations} />
                <Stack.Screen name="MyRequests" component={MyRequests} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </View>
    )
}

export default SettingNav
