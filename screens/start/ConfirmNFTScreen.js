import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Dimensions, Platform, StatusBar, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import React, { useEffect, useState } from 'react'

const { width, height } = Dimensions.get('window')

const ConfirmNFTScreen = ({ route }) => {
    const navigation = useNavigation()
    const [ nftData, setNftData ] = useState(null)
    const [ loaded, setLoaded ] = useState(false)

    useEffect(() => {

        //get nft data
        const getNFTData = async () => {
            const { wallet, location } = route.params

            const res = await fetch(`http://82.33.80.112:3069/wallet/nfts/${wallet}/nfts/${location - 1}`, {
                method: 'GET',
            })
            const data = await res.json()

            setNftData(data.nfts)
        }

        getNFTData()

    }, [])

    useEffect(() => {
        if(nftData) {
            setLoaded(true)
        }
    }, [nftData])

  return loaded ? (
      <View style={ styles.container }>
        <View style={styles.upperText}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name='chevron-back-outline' type='ionicon' color='#3B3D3F' size={28}/>
            </TouchableOpacity>
            <Text style={styles.title}>NFT Found</Text>
            <Text style={styles.subText}>We have found an NFT connected to the address provided. Is this correct?</Text>
        </View>

        <ScrollView style={styles.nft} showsVerticalScrollIndicator={false}>
            <Image source={{ 'uri': nftData.image }} style={{ width: 250, height: 250, resizeMode: 'contain', borderRadius: 30, alignSelf: 'center', marginTop: 20 }}  />
            <Text style={styles.nftTitle}>{nftData.name}</Text>
            <Text style={styles.nftDescription }>{nftData.description}</Text>

            <Text style={styles.nftSubTitle }>Attributes</Text>

            <View style={{ marginTop: 10, marginBottom: "40%" }}>
                {
                    nftData.attributes.map((attribute, index) => (
                        <Text key={`attribute-${index}`} style={styles.nftAttribute}><Text style={{ fontWeight: 'bold' }}>{attribute.trait_type}</Text> - {attribute.value}</Text>
                    ))
                }
            </View>

        </ScrollView>




        <TouchableOpacity onPress={() => navigation.navigate('AccountSetup', { wallet: route.params.wallet }) } style={styles.button}>
            <Text style={styles.buttonText} allowFontScaling={true} >Continue</Text>
        </TouchableOpacity>
    </View>
  ) : (
    <View style={ styles.loadingPage }>
        <ActivityIndicator size={80} color={'#0080FF'} style={{ top: -50 }} />

        <Text style={styles.loadingText}>Loading your NFT data...</Text>
    </View>
  )
}

export default ConfirmNFTScreen

const styles = StyleSheet.create({
    loadingText: {
        color: '#3B3D3F',
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: 'RobotoBlack',
        marginTop: 20
    },
    loadingPage: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
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
    nft: {
        flexGrow: 1,
        marginBottom: "20%"
    },
    nftTitle: {
        marginTop: 20,
        color: "#3B3D3F", 
        fontSize: 18,
        fontWeight: 'bold',
        width: 250,
        textAlign: 'center',
        alignSelf: 'center'
    },
    nftDescription: {
        marginTop: 5,
        color: "#3B3D3F", 
        fontSize: 14,
        width: 250,
        textAlign: 'center',
        alignSelf: 'center'
    },
    nftSubTitle: {
        marginTop: 10,
        width: 250,
        alignSelf: 'center',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
    },
    nftAttribute: {
        width: 250,
        alignSelf: 'center',
        marginTop: 10,
    },
    upperText: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingTop: 40 + (Platform.OS === 'android' ? StatusBar.currentHeight : 0),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10,
        backgroundColor: 'white'
    },
    backButton: {
        position: 'absolute',
        top: 25,
        left: 20
    }
})