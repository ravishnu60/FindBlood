import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import BloodRequest from '../screens/BloodRequest';
import Requests from '../screens/Requests';
import RequestDetails from '../screens/RequestDetails';
import { View } from 'react-native';
import CustomHeader from '../screens/CustomHeader';

function RequestNav() {
    const Stack = createNativeStackNavigator();
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Requests"  />
            <Stack.Navigator initialRouteName='Requests' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Requests" component={Requests} />
                <Stack.Screen name="RequestDetails" component={RequestDetails} />
                <Stack.Screen name="RequestBlood" component={BloodRequest} />
            </Stack.Navigator>
        </View>
    )
}

export default RequestNav
