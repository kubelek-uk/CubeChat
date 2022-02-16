import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity,Platform, StatusBar } from 'react-native'
import { doc, onSnapshot, updateDoc, getDoc, collection, setDoc} from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth'
import { Icon } from 'react-native-elements'

const navbar = (props) => {
    const { back, navigation, randomize, localName, like, events, local } = props
    const { user } = useAuth()
    const [ liked, setLiked] = useState(false)

    useEffect(() => {

        // *WORKING CODE
        const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
            if(snapshot.data()) {
                if(snapshot.data().likedLocals.includes(localName)) 
                setLiked(true)
            }
        });
        return unsubscribe;
        
    }, [])

    const updatedLiked = async() => {

        let userRef = doc(db, 'users', user.uid);

        let likedLocals = await getDoc(userRef)

        console.log(likedLocals.data().likedLocals)

        if(likedLocals.data().likedLocals.includes(localName)) {
            updateDoc(userRef, {
                likedLocals: [
                    ...likedLocals.data().likedLocals.filter(local => local !== localName)
                ]
            }).then(() => {
                setLiked(false)
            })
        } else {
            updateDoc(userRef, {
                likedLocals: [
                    ...likedLocals.data().likedLocals,
                    localName
                ]
            }).then(() => {
                setLiked(true)

                //let eventRef = collection(db, 'events')
                //setDoc(eventRef, { 
                //    name: localName,
                //    isPublic: local.isPublic || true,
                //    music: local.music || local.categories,
                //    image: local.image || local.image_url,
                //    dateAndTime: local.dateAndTime || local.display_number,
                //    creator: {
                //        userName: local.creator.username || localName,
                //        photoURL: local.creator.photoURL || local.image_url
                //    },
                //    age: { 
                //        age: local.age.age || "Alle",
                //        color: local.age.color || '#939393'
                //    },
                //    address: local.address || local.location.display_address
                //})
            })
        }
    };

    return (
        <View style={styles.container}>
            {randomize?.enabled == true ? 
                null
            : back == true ?
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 20, height: 20, bottom: 2 }}>
                        <Icon type="ionicon" name="chevron-back-outline" color={"white"} size={24} />
                    </TouchableOpacity>
                : <View style={{ width: events ? 80 : 20 }}/>
            }

            { localName ? 
            <Text style={{ fontWeight: "bold", fontSize: 18, color: 'white', lineHeight: 22}}>{localName}</Text>
            : events ? <Image source={require('../assets/Events.png')} style={styles.image} /> : 
                <Image source={require('../assets/icon2.png')} style={styles.image} />
            }



            {
                randomize?.enabled ?
                <TouchableOpacity onPress={randomize.run} style={{ width: 24, height: 24, bottom: 2 }}>
                    <Icon type="material" name="casino" color={"white"} size={28} />
                </TouchableOpacity>

                : events ? 
                
                    <View style={{ flexDirection: 'row', width: 80, justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.selector}>
                            <Icon type="ionicon" name="heart" color={"white"} size={24} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.selector} onPress={() => navigation.replace("Profile") }>
                            <Icon type="ionicon" name="person-circle" color={"white"} size={24} />
                        </TouchableOpacity>
                    </View>

                : like ? 
                <TouchableOpacity onPress={() => {
                    updatedLiked()
                    setLiked(!liked)
                }}>
                    <Icon type="ionicon" name={liked ? 'heart' : 'heart-outline'} color={liked ? 'red' : "white"} size={28} />
                </TouchableOpacity>
            : <View style={{ width: 20 }}/>
            }
        </View>
    )
}

export default navbar

const styles = StyleSheet.create({
    container: {
        //! FIX: position absolute breaks button
        //position: 'absolute',
        left:0,
        paddingTop: 20,
        right:0,
        zIndex: 100,
        backgroundColor: "black",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    image: {
        height: 20
    },
    selector: { 
        height: 36, 
        width: 36, 
        backgroundColor: '#1F1F1F', 
        borderRadius: 69,
        alignItems: 'center',
        justifyContent: 'center' 
    }
})
