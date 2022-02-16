import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const DummyData = [
    {
        name: 'Bitcoin',
        coin: 'BTC',
        logo: require('../assets/bitcoin.png')
    },
    {
        name: 'Ethereum',
        coin: 'ETH',
        logo: require('../assets/ethereum.png')
    },
    {
        name: 'Litecoin',
        coin: 'LTC',
        logo: require('../assets/litecoin.png')
    }
]

const HomeScreen = () => {
    const [ coins, setCoinData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ refeshing, setRefreshing ] = useState(false);
    const currency = 'GBP'
    const { user,  logout } = useAuth()
    const navigation = useNavigation()

    const getCoinDataFromAPI = () => {
        fetch(`http://82.33.80.112:3069/coins/buy/${currency}/bulk`).then(res => res.json()).then(data => {
                setCoinData(data)
        })

        setLoading(false)
    }

    const onRefresh = () => {
        setRefreshing(true)
        getCoinDataFromAPI()
        
        setTimeout(() => setRefreshing(false), 1000)
    }

    useEffect(() => {
        getCoinDataFromAPI()
    }, [])


  return (
    <ScrollView style={styles.container} refreshControl={ <RefreshControl refreshing={refeshing} onRefresh={onRefresh}/> }>
      <StatusBar barStyle="light-content" backgroundColor={"#0063C6"} />
      <Text>HomeScreen</Text>

      <View style={styles.crypto}>
        { DummyData.map(( coin, index ) => (
            <View key={index} style={styles.cryptoView}>
                <Image source={coin.logo} style={{ width: 45, height: 45, resizeMode: 'contain'}}/>
                <Text>{coin.name}</Text>
                <Text>£{ coins?.filter(c => c.base?.toLowerCase() === coin.coin.toLowerCase())[0]?.amount}</Text>
            </View>
        ))
        }
      </View>

        <TouchableOpacity onPress={logout}>
            <Text>Logout</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },

    crypto: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },

    cryptoView: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 15,
        height: 110,
        paddingBottom: 15,
        minWidth: 100,
        maxWidth: 120,
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    }
})