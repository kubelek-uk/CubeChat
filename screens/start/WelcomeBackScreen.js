import { StyleSheet, Text, View, Platform, StatusBar, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

import { db } from '../../firebase';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';

const WelcomeBackScreen = ({ route }) => {
  const navigation = useNavigation()
  const animation = useRef(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [ userData, setUserData ] = useState({ username: '' })

  useLayoutEffect(() => {
    onSnapshot(doc(db, 'users', user.uid), snapshot => {
        if(!snapshot.exists()) {
            setTimeout(() => {
              navigation.replace('VerifyWallet')
            }, 2000);
        } else {

          if(!route.params.logIn) {
            return navigation.replace('Home')
          } else {
            setLoading(false);
            setTimeout(() => {
              //get prev screen name

              navigation.replace('Home')
            }, 5000);
          }
        }
    })
  })

  useEffect(() => {

      animation?.current?.play(0, 100)

      const userData = () => {
        const userRef = doc(db, `users`, user.uid)

        getDoc(userRef).then(doc => {
          if(doc.exists()) {
            setUserData(doc.data())
          }
        })
      }

      userData()
  }, [])

  return !loading ? (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={"#0063C6"} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Sign In{'\n'}<Text style={{ color: '#0063C6' }}>Successful</Text></Text>

        <LottieView 
            ref={animation}
            style={styles.lottie} 
            source={require('../../assets/lottie/done.json')} 
            autoPlay={true} loop={false} />
      </View>
      <Text style={styles.subText}>Welcome back {userData.username}!</Text>
      <Text style={[styles.subText, { textAlign: 'right', alignSelf: 'flex-end' }]}>
        You’ll be signed in to your account in a moment. If nothing happens, click <Text style={{ color: '#0063C6'}}>Finalize</Text>
      </Text>

      <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.button}>
            <Text style={styles.buttonText} allowFontScaling={true} >Finalize</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={ styles.loadingPage }>
        <ActivityIndicator size={80} color={'#0080FF'} style={{ top: -50 }} />

        <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

export default WelcomeBackScreen

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
      fontWeight: '700',
      width: "70%"
  },
  lottie: {
    top: -4,
    alignSelf: 'flex-end', 
    width: 110,
    height: 110,
  },
  button: {
    marginTop: height - (height - (Platform.OS == 'android' ? StatusBar.currentHeight : 0) - 300),
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
  loadingPage: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: '#3B3D3F',
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'RobotoBlack',
    marginTop: 20
  },
})