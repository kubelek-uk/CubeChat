import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { StatusBar, Platform, Dimensions } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useTheme, useNavigation } from '@react-navigation/native';
import React from 'react'

const { width, height } = Dimensions.get('window');

const VerificationScreen = () => {
  const { signInWithGoogle, signInWithApple, signInWithEmail , error } = useAuth();
  const { colors } = useTheme();
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subText}>Verify yourself by selection {'\n'}an option below</Text>

      <TouchableOpacity
            style={[styles.button, { bottom: "18%", backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around' }]} 
            onPress={signInWithGoogle}>
                <Image 
                source={require('../assets/google-logo.png')} 
                style={{ height: 30, width: 30, top: -5}} />

                <Text 
                style={[styles.buttonText,  { color: "#323232", fontWeight: 'bold' }]}>
                    Sign In with Google</Text>
                <View/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogIn') }>
          <Text style={styles.buttonText} allowFontScaling={true} >Continue with email</Text>
      </TouchableOpacity>
    </View>
  )
}

export default VerificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: (Platform.OS == 'android' ? StatusBar.currentHeight : 0) + 60
    },
    title: {
        color: "#3B3D3F", 
        fontSize: 38, 
        textAlign: 'left', 
        fontFamily: 'RobotoBlack'
    },
    subText: {
        marginTop: 8,
        color: "#3B3D3F", 
        fontSize: 18, 
        textAlign: 'left', 
        fontWeight: '700'
    },
    button: {
        position: 'absolute',
        bottom: "6%",
        backgroundColor: '#0080FF',
        alignSelf: 'center',
        paddingVertical: 15,
        height: 50,
        borderRadius: 15,
        //create a drop shadow on the button
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: width - 72
    
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        maxHeight: 20,
        minHeight: 20,
        height: 20,
        textAlign: 'center',
        fontWeight: '700'
    },
})