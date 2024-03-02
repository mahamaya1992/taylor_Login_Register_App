//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { Component } from 'react';
import Login from '../Screen/Auth/Login';
import SignUp from '../Screen/Auth/SignUp';

const Stack = createStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />

        </Stack.Navigator>
    );
};

export default AuthStack;
