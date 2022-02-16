import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, TextInput, Dimensions, Image, ScrollView } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import useAuth from '../../hooks/useAuth';
import { db, storage } from '../../firebase';
import localStorage from '@react-native-async-storage/async-storage';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const { width, height } = Dimensions.get('window')


const AccountSetupScreen = ({ route }) => {
    const { user } = useAuth()
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [ reload, setReload ] = useState(false);
    const [image, setImage] = useState(null);
    const [imageSet,setImageSet] = useState(false);


    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, [reload]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });
    
        if (!result.cancelled) {

            //save the image to setImage
            setImage(result.uri);

            setImageSet(true);

            //const fileExtension = result.uri.split('.').pop();
            //let imgRef = ref(storage, `${user.uid}/profile.${fileExtension}`)

            //uploadBytes(imgRef, blob).then((snap) => {
            //    //const userRef = doc(db, 'users', user.uid)
            //    getDownloadURL(imgRef).then(url => {
            //        //console.log(url)
            //        //updateDoc(userRef, {
            //        //    photoURL: url
            //        //})
            //        setImage(url)
            //        setImageSet(true)
            //        Animated.timing(opacity, {
            //            toValue: 1,
            //            duration: 750,
            //            useNativeDriver: true,
            //        }).start(() => {
            //            setTimeout(() => Animated.timing(opacity, {
            //                    toValue: 0,
            //                    duration: 1000,
            //                    useNativeDriver: true,
            //                }).start(() => setImageSet(false))
            //            , 3000)
            //        })
            //    })
            //}).catch(err => alert(err.message))
        }
    };


    const renderTitle = () => {
        return (
            <View style={{ marginLeft: 10 }}>
                <Text style={[styles.title, { color: colors.text }]}>Account {'\n'}Setup</Text>
                <Text style={styles.subText}>Fantastic! Now it's time setup your account. Fill out the information below and select a profile picture</Text>
            </View>
        )
    }

    const renderInputInfo = () => {
        return (
            <View style={{ marginTop: 20 }}>

                    <TouchableOpacity style={{ width: 125, height: 125, backgroundColor: '#373737', alignSelf: 'center', borderRadius: 420, justifyContent: 'center', marginBottom: "10%" }} onPress={pickImage}>
                        {imageSet ? 
                            <Image source={{ uri: image }} style={{ width: 125, height: 125, borderRadius: 420 }} /> : 
                            <Text style={styles.uploadImageText}>Upload</Text> 
                        }
                    </TouchableOpacity> 

                <TextInput
                    selectionColor={colors.blue}
                    style={styles.input}
                    placeholder="username"
                    placeholderTextColor="#3B3D3F"
                    secureTextEntry={false}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />

                <View style={[styles.input, { paddingVertical: 15, marginTop: 15 }]}>
                    <Text style={{ color: "rgba(59,61,63,0.9)", fontSize: 16, fontFamily: 'RobotoBlack', }}>{user.email}</Text>   
                </View>
            </View>
        )
    }

    async function Complete() {
        const verified = true;

        const response = await fetch(image);
        const blob = await response.blob();

        const fileExtension = image.split('.').pop();
        let imgRef = ref(storage, `${user.uid}/profile.${fileExtension}`)

        uploadBytes(imgRef, blob).then((snap) => {

            getDownloadURL(imgRef).then(url => {
                console.log(url)
                setDoc(doc(db, 'users', user.uid), {
                    photoURL: url,
                    username: username,
                    email: user.email,
                    verified: verified,
                    wallet: route.params.wallet
                }).then(async () => {
                    await localStorage.setItem('verified', 'true');
                    navigation.navigate('FinishSetup')
                })
            })
        }).catch(err => alert(err.message))
    }



    return (
        <ScrollView style={styles.container}>
            {renderTitle()}

            {renderInputInfo()}

            <TouchableOpacity onPress={() => Complete() } style={[styles.button, { opacity: !username || !image ? 0.4 : 1 }]} disabled={!username || !image}>
                <Text style={styles.buttonText} allowFontScaling={true} >Complete</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default AccountSetupScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 
            (Platform.OS === 'android' ? 
            StatusBar.currentHeight : 0) + 40,
        flex: 1,
        paddingHorizontal: 20
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
    uploadImageText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        marginTop: "41%",
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
