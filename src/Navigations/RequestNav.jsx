import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import BloodRequest from '../screens/BloodRequest';
import Requests from '../screens/Requests';
import { View } from 'react-native';
import CustomHeader from '../screens/CustomHeader';

function RequestNav({navigation}) {
    const Stack = createNativeStackNavigator();

    useEffect(() => {
        navigation.navigate('RequestBlood');
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Requests" />
            <Stack.Navigator initialRouteName='RequestBlood' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="RequestBlood" component={BloodRequest} />
                <Stack.Screen name="Requests" component={Requests} />
            </Stack.Navigator>
        </View>
    )
}

export default RequestNav
