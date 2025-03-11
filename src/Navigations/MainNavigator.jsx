import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useState } from 'react';
import Login from '../screens/Login';
import Register from '../screens/Register';
import BottomTabs from './BottomTabs';
import Notification from '../screens/Notification';

export const ContextData= createContext();
function MainNavigator() {
    const Stack = createNativeStackNavigator();
    const [user, setUser] = useState({});
    return (
        <ContextData.Provider value={{ user, setUser }}>
        <Stack.Navigator initialRouteName='HomeMenu' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="HomeMenu" component={BottomTabs} />
            <Stack.Screen name="Notification" component={Notification} />
        </Stack.Navigator>
        </ContextData.Provider>
    )
}

export default MainNavigator
