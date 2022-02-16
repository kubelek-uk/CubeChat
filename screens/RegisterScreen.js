import React, { useEffect } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ScrollView,
    Platform, Button, 
    Image, 
    TextInput,
    Dimensions,
    KeyboardAvoidingView, 
    TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { signUpWithEmail, error } = useAuth();

    let passwordVerified = {
        length: false,
        capital: false,
        number: false
    }

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVerification, setPasswordVerification] = React.useState('');

    useEffect(() => {
        validateEmail()
    }, [email])

    function validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(String(email).toLowerCase());
    }

    if(password.length >= 8) passwordVerified.length = true;

    const special = RegExp("^[a-zA-Z0-9 ]*$");
    if(!special.test(password)) passwordVerified.special = true;

    const capital = RegExp("(?:[^a-z]*[A-Z])");
    if(capital.test(password)) passwordVerified.capital = true;

    const hasNumber = /^.*[0-9].*$/;
    if(hasNumber.test(password)) passwordVerified.number = true;

    const disabled = !password || !email || validateEmail()
     || !passwordVerified.length
     || !passwordVerified.capital || !passwordVerified.number

    const renderPasswordVerification = () => {
        return (
            <View style={{ marginHorizontal: 22, marginTop: 35, marginBottom: 50 }}>
                <View style={{ flexDirection: 'row'}}>
                    <Icon type="material" name={passwordVerified.length ? "done" : "close"} color="#3b3d3f"/>
                    <Text style={styles.passwordVerificationText}>Password must a minimum of 8 characters</Text>
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <Icon type="material" name={passwordVerified.capital ? "done" : "close"} color="#3b3d3f"/>
                    <Text style={styles.passwordVerificationText}>Includes upper and lower case characters</Text>
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <Icon type="material" name={passwordVerified.number ? "done" : "close"} color="#3b3d3f"/>
                    <Text style={styles.passwordVerificationText}>Includes one number</Text>
                </View>
            </View>
        )
    }

    const renderForm = () => {
        return (
            <View style={styles.inputContainer}>

                <TextInput
                    selectionColor={colors.blue}
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#3B3D3F"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                
                <View style={{ height: 10 }} />
                <TextInput
                    selectionColor={colors.blue}
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#3B3D3F"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <View style={{ height: 10 }} />
                <TextInput
                    selectionColor={colors.blue}
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#3B3D3F"
                    secureTextEntry={true}
                    onChangeText={(text) => setPasswordVerification(text)}
                    value={passwordVerification}
                />

                {renderPasswordVerification()}

                <View>
                    <TouchableOpacity style={[styles.button, { opacity: disabled ? 0.4 : 1 }]} disabled={disabled} onPress={() => signUpWithEmail(email, password) }>
                        <Text style={styles.buttonText} allowFontScaling={true} >Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack() }>
                        <Text style={[styles.buttonText, { color: '#0063C6', marginTop: 20 }]} allowFontScaling={true} >Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (

        <ScrollView style={styles.container}>
            <Text style={styles.title}>Sign Up With {'\n'} 
                <Text style={{ color: colors.blue }}>Email</Text>
            </Text>

            {renderForm()}
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 
            (Platform.OS === 'android' ? 
            StatusBar.currentHeight : 0) + 60 
    },
    title: {
        color: "#3B3D3F", 
        fontSize: 38, 
        textAlign: 'left', 
        fontFamily: 'RobotoBlack'
    },
    goBackButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    inputContainer: {
        marginTop: "35%",
        alignSelf: 'center',
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
        width: width - 72
    },
    passwordVerificationText: {
        color: '#3b3d3f', 
        fontSize: 14,
        alignSelf: 'center',
        fontWeight: '700',
        marginLeft: 5
    },
    button: {
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
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: '700'
    },
})