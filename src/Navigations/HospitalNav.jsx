import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import CustomHeader from '../screens/CustomHeader';
import Hospitals from '../screens/Hospitals';
import HospitalDetails from '../screens/HospitalDetails';

function HospitalNav() {
    const Stack = createNativeStackNavigator();
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Blood Banks" />
            <Stack.Navigator initialRouteName='Hospital' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Hospital" component={Hospitals} />
                <Stack.Screen name="HospitalDetails" component={HospitalDetails} />
            </Stack.Navigator>
        </View>
    )
}

export default HospitalNav
