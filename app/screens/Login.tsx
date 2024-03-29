import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Pressable } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation(); 

    { /* Migrate this to App.tsx */}
    const [fontsLoaded] = useFonts({
        'SourceSansPro': require('../../assets/fonts/SourceSansPro-Regular.otf'),
        'Lora': require('../../assets/fonts/Lora-Bold.ttf'),
    });
    if (!fontsLoaded) { 
        return <AppLoading />;
    }

    const auth = FIREBASE_AUTH

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            if (response.user.emailVerified) {
                navigation.navigate('Inside' as never);
            }
        } catch (error: any) {
            console.log(error);
            alert('Incorrect email or password!');
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your email for a verification link!');
        } catch (error: any) {
            console.log(error);
            alert('Error signing in:' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const forgotPasswordAction = () => {
        setLoading(true);
        try {
            alert('Forgot password?');
        } catch (error: any) {
            console.log(error);
            alert('Error w/ forgot password:' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.logoContainer}>
                        <Text style={styles.logo}>RHYDER</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputSection}>
                            <Entypo style={styles.inputIcon} name="email" size={20} color="#383838" />
                            <TextInput 
                               value={email} 
                               style={styles.input} 
                               placeholder="Email" 
                               autoCapitalize="none" 
                               onChangeText={(text) => setEmail(text)} 
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputSection}>
                            <MaterialIcons style={styles.inputIcon} name="password" size={20} color="#383838" />
                            <TextInput 
                                secureTextEntry={true} 
                                value={password} 
                                style={styles.input} 
                                placeholder="Password" 
                                autoCapitalize="none" 
                                onChangeText={(text) => setPassword(text)} 
                            />
                        </View>
                    </View>
    
    
                    { loading ? ( 
                        <ActivityIndicator size="large" color="#0000ff" /> 
                    ) : ( <>
                            <Pressable 
                                style={styles.button} 
                                onPress={signIn}>
                                    <Text style={styles.buttonText}>Login</Text>
                            </Pressable>
                            <Pressable
                                onPress={forgotPasswordAction}>
                                <Text style={styles.forgotPassword}>Forgot password?</Text>
                            </Pressable>
                            <Pressable 
                                style={styles.registerButton} 
                                onPress={() => navigation.navigate('Register' as never)}>
                                <Text style={styles.registerButtonText}>Don't have an account? <Text style={ styles.registerButtonText2 }>Sign Up</Text></Text>
                            </Pressable>
                        </>
                    )}
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 0,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF8E7', // Add this line
    },
    container2: {
        marginHorizontal: 30,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 65,
    },
    logo: {
        fontSize: 64,
        fontFamily: 'Lora',
    },
    forgotPassword: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
        fontFamily: 'SourceSansPro',
        fontSize: 16,
    },
    input: {
        flex: 1,
        marginVertical: 5,
        height: 50,
        padding: 10,
        fontSize: 16,
        fontFamily: 'SourceSansPro',
        color: '#383838',
        paddingHorizontal: 0,
        width: '100%',
    },
    inputContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSection: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3E1D0',
        borderRadius: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        backgroundColor: '#91B7B5',
        marginVertical: 10,
        elevation: 0,
    },
    registerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 12,
        paddingHorizontal: 32,
        paddingTop: 24,
        borderRadius: 30,
        marginVertical: 10,
        elevation: 0,
    },
    registerButtonText: {
        fontSize: 16,
        lineHeight: 21,
        color: '#383838',
    },
    registerButtonText2: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: '#1B7670',
    },
    buttonText: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#383838',
    },
    inputIcon: {
        padding: 10,
    },
})