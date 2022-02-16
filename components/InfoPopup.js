import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const InfoPopup = ({ popupText }) => {
    return (
        <View style={styles.container}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{popupText}</Text>
        </View>
    )
}

export default InfoPopup

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(66, 66, 66, 0.8)', 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 69,
    }
})
