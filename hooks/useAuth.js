import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import * as Google from 'expo-google-app-auth';
import env from '../config'
import { 
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    deleteUser,
    signOut
 } from 'firebase/auth'
import { deleteDoc, getDoc, doc, collection, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, OAuthProvider } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const AuthContext = createContext({});

const config = {
    androidClientId: env.androidClientId,
    iosClientId: env.iosClientId,
    androidStandaloneAppClientId: env.androidStandaloneAppClientId,
    iosStandaloneAppClientId: env.iosStandaloneAppClientId,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"]
}

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [ user, setUser ] = useState(null);
    const [ loadingInitial, setLoadingInitial ] = useState(true);
    const [ maintenance, setMaintenance ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ loggedIn, setLoggedIn ] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {



        const awaitAuth = onAuthStateChanged(auth, (user) => {
            if(user) {
                //logged in...

                setUser(user);
            } else {
                // not logged in...
                setUser(null);
            }

            setLoadingInitial(false);
        })

        return awaitAuth;
    }, [])

    onSnapshot(doc(db, 'maintenance', 'Main'), (doc) => {
        var data = doc.data();
        setMaintenance(data.maintenance)
    })

    const signInWithGoogle = async() => {
        setLoading(true);

        await Google.logInAsync(config).then(async(logInResult) => {
            if(logInResult.type === 'success') {
                // login...
                const { idToken, accessToken } = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);

                await signInWithCredential(auth, credential);
                setLoggedIn(true);
            }

            return Promise.reject();
        }).catch(error => setError(error))
        .finally(() => setLoading(false));
    }

    const signInWithEmail = (email, password) => {
        setLoading(true)
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials);

        })
        .finally(() => {
            setLoading(false)
            setLoggedIn(true);
        });
    }

    const signUpWithEmail = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials);

        })
        .finally(() => {
            setTimeout(() => setError(''), 6000)
            setLoading(false);
            setLoggedIn(true);
        });
    }

    const userDelete = () => {
        setError(null);
        setLoading(true);

        const userRef = doc(db, 'users', user.uid)

        deleteUser(user).then(() => {
            deleteDoc(userRef).catch(error => Error(error));
            console.log('User deleted');
        })
        .finally(() => {
            setLoading(false)
        });
    }

    const logout = () => {
        setLoading(true);

        signOut(auth)
        .finally(async() => {
            setLoading(false)
        });
    }

    const memoedValue = useMemo(() => ({
        user,
        loading, 
        maintenance,
        loggedIn,
        error,
        userDelete, 
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        logout
    }), [user , loading, error, maintenance])

    return (
        <AuthContext.Provider value={ memoedValue }> 
            { !loadingInitial && children }
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}
