import { StyleSheet, Text, View, Platform, StatusBar, Dimensions, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect } from 'react'
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth';

const { width, height } = Dimensions.get('window');

const VerificationFailed = () => {
    const navigation = useNavigation();
    const { logout } = useAuth(); 
    const animation = useRef(null);

    useEffect(() => {
        animation?.current?.play(0, 100)
    }, [])

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
         <Text style={styles.title}>Verification{'\n'}<Text style={{ color: '#0063C6' }}>Failed</Text></Text>

            <LottieView 
            ref={animation}
            style={styles.lottie} 
            source={require('../../assets/lottie/cross.json')} 
            autoPlay={true} loop={false} />
      </View>
      <Text style={styles.subText}>There was an issue while verifying ownership of your NFT.  Double check the information you have provided. If this issue persists, Try again at a later time.</Text>

      <View style={{ position: 'absolute', bottom: '6%', alignSelf: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack() }>
                <Text style={styles.buttonText} allowFontScaling={true} >Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => logout() }>
            <Text style={[styles.buttonText, { color: '#0080FF', marginTop: 20 }]} allowFontScaling={true} >Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default VerificationFailed

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
        marginTop: 16,
        color: "#3B3D3F", 
        fontSize: 18, 
        textAlign: 'left', 
        fontWeight: '700'
    },
    button: {
        marginTop: 65,
        alignSelf: 'center',
        backgroundColor: '#0080FF',
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
    lottie: {
        top: -4,
        alignSelf: 'flex-end', 
        width: 110,
        height: 110,
    },
})