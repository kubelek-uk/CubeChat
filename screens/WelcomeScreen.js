import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Platform, StatusBar  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';

const Welcome = () => {
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();

  const Verification = () => {
    navigation.navigate('Verification');
  }

  const Button = () => {
    return (
        <TouchableOpacity style={[styles.button, { width: width - 72 }]} onPress={Verification}>
          <Text style={styles.buttonText} allowFontScaling={true} >Get Started</Text>
        </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#0464dd"} barStyle="dark-content" />
      <LinearGradient
        colors={['#0080FF', '#56ABFF']}
        style={styles.background}
      >
        <ImageBackground source={require('../assets/background.png')} style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 20, marginTop: (Platform.OS == 'android' ? StatusBar.currentHeight : 0) + 55, flex: 1       }}>
            <Text style={{ color: "white", fontSize: 28, textAlign: 'center', fontFamily: 'RobotoBlack'  }}>
              Cube Chat
            </Text>
            <Text style={styles.investors}>
                Chat with 
                <Text style={{ color: "#1E1E1E", fontWeight: 'normal', fontFamily: 'RobotoBlack', }}> The Cubie</Text>
                {'\n'} investors
            </Text>  
          </View>

          <Button/>
        </ImageBackground>

      </LinearGradient> 
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    background: {
      flex: 1,
    },
    button: {
      position: 'absolute',
      bottom: "6%",
      backgroundColor: '#1E1E1E',
      alignSelf: 'center',
      paddingVertical: 15,
      borderRadius: 15,
      //create a drop shadow on the button
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5

    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      flexShrink: 0,
      height: 20,
      textAlign: 'center',
      fontWeight: '700'
    },
    investors: { 
      flex: 1,
      color: "white", 
      fontSize: 28, 
      textAlign: 'center', 
      fontWeight: '700',
      position: 'absolute',
      alignSelf: 'center',
      bottom: "30%"
    }
});
