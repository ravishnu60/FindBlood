import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FindDonor from '../screens/FindDonor';
import DonorDetails from '../screens/DonorDetails';
import DonateBlood from '../screens/DonateBlood';
import { View } from 'react-native';
import CustomHeader from '../screens/CustomHeader';

function DonorNav() {
    const Stack = createNativeStackNavigator();

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Donors" />
            <Stack.Navigator initialRouteName='FindDonor' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="FindDonor" component={FindDonor} />
                <Stack.Screen name="DonorDetails" component={DonorDetails} />
                <Stack.Screen name="DonateBlood" component={DonateBlood} />
            </Stack.Navigator>
        </View>
    )
}

export default DonorNav
