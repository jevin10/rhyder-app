import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import List from './app/screens/Home';
import Details from './app/screens/Details';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='Home' component={List} />
      <InsideStack.Screen name='Details' component={Details} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, SetUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      SetUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          // If there's a user, show the inside layout
          <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }}/>
        ) : (
          // If there's no user, show the login screen
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
