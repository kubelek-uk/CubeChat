import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements'

const { height, width } = Dimensions.get('window');

const buttons = [
    { id: 1, name: 'Lokale', icon: 'home', screen: 'Home' },
    { id: 2, name: 'Suchen', icon: 'search', screen: 'search' },
    { id: 3, name: 'Events', icon: require('../assets/miniIcon.png'), screen: 'Events'},
    { id: 4, name: 'Mitteilungen', icon: 'notifications', screen: 'notification' },
    { id: 5, name: 'Profil', icon: 'person-circle', screen: 'Profile' },
]

const bottomNavigation = ({ navigation }) => {
    return (
        <View style={styles.navigationContainer}>
            {
                buttons.map(button => (
                    renderNavigationButton(button, navigation)
                ))
            }
        </View>
    )
}

const renderNavigationButton = (button, navigation) => {
    return (
        <TouchableOpacity key={button.id}
            onPress={() => navigation.navigate(button.screen)}
            >
            <View style={styles.navigationButton}>
                {
                    isNaN(button?.icon) ? 
                        <Icon type="ionicon" name={button.icon} color="#bfbfbf" size={24} />
                    :
                        <Image source={button.icon} style={styles.navigationIcon} />
                }
                <Text style={{ color: '#bfbfbf' }}>{button.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default bottomNavigation

const styles = StyleSheet.create({
    navigationContainer: {
        justifyContent: 'space-evenly',
        backgroundColor: 'black',
        flexDirection: 'row',
        width: width,
        height: 65,
    },
    navigationButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    navigationIcon: {
        marginTop: 2,
        height: 24,
        width: 24,
        resizeMode: 'contain'
    }
})
