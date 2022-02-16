import { StyleSheet, Text, View, StatusBar, Platform, Image } from 'react-native'
import React from 'react'

const MaintenanceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.subText}>We are very sorry, our development team is working as fast as they can. {'\n'}
        <Text style={{ color: '#0080FF'}}>Undergoing Maintenance!</Text></Text>

    <Image source={require('../../assets/Maintanece.png')} style={{ width: '100%', height: "50%", resizeMode: 'contain' }} />
    </View>
  )
}

export default MaintenanceScreen

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
})