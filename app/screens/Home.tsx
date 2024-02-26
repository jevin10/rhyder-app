import { View, Text, Button } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

// Define the RouterProps type
interface RouterProps { 
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={() => navigation.navigate('Details')} title="Go to Details" />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Sign Out" />
            <Text>Home</Text>
        </View>
    );
};

export default Home;