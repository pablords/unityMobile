import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";




import Home from '../pages/Home';
import Profile from '../pages/Profile';
import BacklogTT from '../pages/BacklogTT';
import DetailBacklog from '../pages/BacklogTT/DetailBacklog';
import RegistrarCq from '../pages/BacklogTT/RegistrarCq';

import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator tabBar={props=><CustomTabBar {...props}/>}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="BacklogTT" component={BacklogTT} />
        <Tab.Screen name="DetailBacklog" component={DetailBacklog} />
        <Tab.Screen name="RegistrarCq" component={RegistrarCq} />
    </Tab.Navigator>
)
