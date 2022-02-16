import React, { useEffect, useState } from 'react'
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { useFonts } from '@use-expo/font';
import useAuth from '../hooks/useAuth'

import LogInScreen from '../screens/LogInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AccountSetupScreen from '../screens/start/AccountSetupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import VerificationScreen from '../screens/VerificationScreen';
import VerifyWallet from '../screens/start/VerifyWallet';
import VerificationFailed from '../screens/errors/VerificationFailed';
import MaintenanceScreen from '../screens/errors/MaintenanceScreen'
import ConfirmNFTScreen from '../screens/start/ConfirmNFTScreen'
import FinishSetupScreen from '../screens/start/FinishSetupScreen'
import HomeScreen from '../screens/HomeScreen';
import WelcomeBackScreen from '../screens/start/WelcomeBackScreen'


const customFonts = {
    RobotoBlack: require("../assets/fonts/Roboto-Black.ttf"),
};

function StackNavigator() {
    const { user, maintenance, loggedIn } = useAuth()
    const Stack = createStackNavigator();
    const [isLoaded] = useFonts(customFonts);

    if(!isLoaded) {
        return null
    }

    console.log(loggedIn)


    

    return (
        <Stack.Navigator 
            screenOptions={{
                    headerShown: false, 
                    gestureEnabled: true,  
                    gestureDirection: 'horizontal', 
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
                { maintenance ? <Stack.Screen name="UnderMaintenance" component={MaintenanceScreen}/> :
                user ? 
                <>  
                    {/* Verified */}
                    <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} initialParams={{ logIn: loggedIn }} />
                    <Stack.Screen name="Home" component={HomeScreen} />


                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen name="VerifyWallet" component={VerifyWallet} />
                        <Stack.Screen name="VerificationFailed" component={VerificationFailed} />
                        <Stack.Screen name="ConfirmNFT" component={ConfirmNFTScreen} />
                        <Stack.Screen name="AccountSetup" component={AccountSetupScreen} />   
                        <Stack.Screen name="FinishSetup" component={FinishSetupScreen} />
                    </Stack.Group>
                </>

        
                : (
                    <>
                        {/* Not Logged In */}
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="Verification" component={VerificationScreen} />
                        <Stack.Screen name="LogIn" component={LogInScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                )
            }
        </Stack.Navigator> 
    )
}

export default StackNavigator
