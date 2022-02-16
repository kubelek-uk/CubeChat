import { StatusBar } from 'expo-status-bar';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './navigation/StackNavigator';

export default function App() {

  let lightTheme = {
    dark: false,
    colors: { 
      background: '#FFFFFF', 
      text: '#3B3D3F',
      red: '#FB073C',
      blue: '#0063C6'
    }
  }

  return (
    <NavigationContainer theme={lightTheme}>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

