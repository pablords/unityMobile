import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import Preload from '../pages/Preload';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import BacklogTT from '../pages/BacklogTT';
import DetailBacklog from '../pages/BacklogTT/DetailBacklog';
import RegistrarCq from '../pages/BacklogTT/RegistrarCq';
import Suporte from '../pages/Suporte';
import MainTab from './MainTab';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
        headerShown:false
    }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BacklogTT" component={BacklogTT} />
        <Stack.Screen name="DetailBacklog" component={DetailBacklog} />
        <Stack.Screen name="RegistrarCq" component={RegistrarCq} />
        <Stack.Screen name="Suporte" component={Suporte} />
        <Stack.Screen name="MainTab" component={MainTab} />

    </Stack.Navigator>
);