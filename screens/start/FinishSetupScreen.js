import { StyleSheet, Text, View, StatusBar, Platform, Dimensions, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const FinishSetupScreen = () => {
    const navigation = useNavigation()
    const animation = useRef(null);

    useEffect(() => {
        animation?.current?.play(0, 100)
    }, [])

    setTimeout(() => {
        navigation.replace('Home')
    }, 5000);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
         <Text style={styles.title}>Verification{'\n'}<Text style={{ color: '#0063C6' }}>Complete</Text></Text>

            <LottieView 
            ref={animation}
            style={styles.lottie} 
            source={require('../../assets/lottie/done.json')} 
            autoPlay={true} loop={false} />
      </View>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={[styles.text, { textAlign: 'right', alignSelf: 'flex-end' }]}>Great! You have been verified as an official owner of an NFT from The Cubie colletion</Text>

        <Text style={[styles.text, { alignSelf: 'flex-start' }]}>You’ll be signed in to your account in a moment. If nothing happens, click <Text style={{ color: '#0063C6' }}>Finalize</Text></Text>
      </View>

      <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.button}>
            <Text style={styles.buttonText} allowFontScaling={true} >Finalize</Text>
       </TouchableOpacity>

    </View>
  )
}

export default FinishSetupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: (Platform.OS == 'android' ? StatusBar.currentHeight : 0) + 60
    },
    lottie: {
        top: -4,
        alignSelf: 'flex-end', 
        width: 110,
        height: 110,
    },
    title: {
        color: "#3B3D3F", 
        fontSize: 38, 
        textAlign: 'left', 
        fontFamily: 'RobotoBlack'
    },
    text: {
        marginTop: 16,
        color: '#3B3D3F',
        fontFamily: 'RobotoBlack',
        fontSize: 16,
        width: 270,
    },
    button: {
        marginTop: "80%",
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
})