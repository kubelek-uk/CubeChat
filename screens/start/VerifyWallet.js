import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native'
import { getDoc, doc, getDocs, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { useTheme, useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth'
import React, { useEffect, useState } from 'react'
import config from '../../config'


const { width, height } = Dimensions.get('window')



const VerifyWallet = () => {
    const { colors } = useTheme()
    const { user, logout } = useAuth()
    const [ isLoading, setIsLoading ] = useState(false)

    const navigation = useNavigation()


    const [wallet, setWallet] = React.useState('')

    const verifyWallet = async () => {

        setIsLoading(true)

        if( wallet.length < 10 ) {
          setIsLoading(false)
          return navigation.navigate('VerificationFailed')
        }

        //get every user document and see if the wallet is in the document
        const users = collection(db, 'users')
        const docs = await getDocs(users);

        for( const doc of docs.docs ) {

          if( doc.exists() && doc.data().verified && doc.data().wallet.toLowerCase() === wallet.toLowerCase() ) {
            setIsLoading(false)
            navigation.navigate('VerificationFailed')
            break;
          } else if( doc.data().wallet.toLowerCase() != wallet.toLowerCase() ) {
          
            const data = await fetch(`http://82.33.80.112:3069/wallet/nfts/${wallet}/rawData`, {
              method: 'GET',
            })

            const response = await data.json()

            if(response.rawData ? response.rawData.total == 0 : response?.error) {
              setIsLoading(false)
              navigation.navigate('VerificationFailed')
              break;
            }

            let i = 0;

            for ( const nft of response.rawData.result ) {
              i++
              if(nft.name === config.NFTCollection) {
                setIsLoading(false)
                navigation.navigate('ConfirmNFT', { token_uri: nft.token_uri, location: i, wallet: wallet })
                break;
              }
            }
            
            break;
          }
        }

        //docs.forEach(async(doc) => {
        //  if(doc.exists() && doc.data().verified && doc.data().wallet === wallet || wallet.length < 10) {
        //    setIsLoading(false)
        //    navigation.navigate('VerificationFailed')
        //  } else if(doc.data().wallet != wallet || wallet.length < 10) {
        //    //send out a get request to the server
        //    fetch(`http://82.33.80.112:3069/wallet/nfts/${wallet}/rawData`, {
        //      method: 'GET',
        //    }).then(async(res) => {
        //      const data = await res.json()
        //      if(data.rawData ? data.rawData.total == 0 : data?.error ? true : false) {
        //        return navigation.navigate('VerificationFailed')
        //      }
        //      let i = 0;
        //      for ( const nft of data.rawData.result) {
        //        i++;
        //        if(nft.name === config.NFTCollection) {
        //          setIsLoading(false)
        //          return navigation.navigate('ConfirmNFT', { token_uri: nft.token_uri, location: i, wallet: wallet })
        //        }
        //      }
        //    
        //    })
        //  }
        //}).finally(() => {
        //  setTimeout(() => setIsLoading(false), 5000)
        //})

        // logout()
    }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={"#0063C6"} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ height: height, paddingTop: (Platform.OS == 'android' ? StatusBar.currentHeight : 0) + 60 }}>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subText}>Before you gain access to our app, we need to verify if you own one of <Text style={{ color: '#0063C6'}}>The Cubie</Text> NFT's. To do so, enter your <Text style={{ color: '#0063C6'}}>Wallet Address</Text> below.</Text>

          <View style={{ position: 'absolute', bottom: '6%', alignSelf: 'center' }}>
            <TextInput
                selectionColor={colors.blue}
                style={styles.input}
                placeholder="Wallet Address"
                placeholderTextColor="#3B3D3F"
                secureTextEntry={false}
                onChangeText={(text) => setWallet(text)}
                value={wallet}
            />

            <TouchableOpacity onPress={ verifyWallet } style={[ styles.button, { opacity: !wallet ? 0.4 : 1  } ]} disabled={ !wallet }>
              { isLoading ? <ActivityIndicator size="small" color={'white'} /> : <Text style={styles.buttonText} allowFontScaling={true} >Continue</Text> }

            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default VerifyWallet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
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
    input: {
        color: "#3B3D3F",
        fontSize: 16,
        fontFamily: 'RobotoBlack',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: width - 72,
        alignSelf: 'center'
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
})