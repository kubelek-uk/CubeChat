import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ScrollView,
    Platform, 
    Image, 
    Animated,
    TextInput,
    Dimensions,
    KeyboardAvoidingView, 
    TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';

const { width, height } = Dimensions.get('window');

const LogInScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { signInWithGoogle, signInWithEmail, error } = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const InputFields = () => {
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

                <View style={{ marginTop: "20%" }}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogIn') }>
                        <Text style={styles.buttonText} allowFontScaling={true} >Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Register') }>
                        <Text style={[styles.buttonText, { color: '#0063C6', marginTop: 20 }]} allowFontScaling={true} >Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Sign In With {'\n'} 
                <Text style={{ color: colors.blue }}>Email</Text>
            </Text>

            <InputFields />
        </ScrollView>
    )
}

export default LogInScreen

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
    inputContainer: {
        marginTop: "78%",
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
        textAlign: 'center',
        fontWeight: '700'
    },
})
