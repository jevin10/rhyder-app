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
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const Register = () => {
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
                <KeyboardAvoidingView behavior="height">
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
                                onPress={signUp}>
                                    <Text style={styles.buttonText}>Create Account</Text>
                            </Pressable>
                            <View style={styles.socialsContainer}>
                              <Pressable 
                                  style={styles.socialsButton} 
                                  onPress={signUp}>
                                      <Text style={styles.socialsButtonText}>Sign in with Google</Text>
                              </Pressable>
                              <Pressable 
                                  style={styles.socialsButton} 
                                  onPress={signUp}>
                                      <Text style={styles.socialsButtonText}>Sign in with Apple</Text>
                              </Pressable>
                            </View>
                            <Pressable 
                                style={styles.goBackButton} 
                                onPress={() => navigation.navigate('Login' as never)}>
                                <Text style={styles.buttonText}>Return to Login</Text>
                            </Pressable>
                        </>
                    )}
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

export default Register;

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
    socialsContainer: {
        marginVertical: 20,
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
    socialsButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        borderWidth: 2,
        marginVertical: 10,
        elevation: 0,
        borderColor: '#1B7670',
    },
    goBackButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        marginVertical: 10,
        elevation: 0,
    },
    buttonText: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#383838',
    },
    socialsButtonText: {
        fontSize: 20,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#1B7670', 
    },
    inputIcon: {
        padding: 10,
    },
})