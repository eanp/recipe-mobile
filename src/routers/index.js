// In App.js in a new project

import * as React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout} from '../storages/action/auth';

function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'red'}}>ProfileScreen Screen</Text>

      <TouchableOpacity
        style={{
          backgroundColor: 'skyblue',
          borderRadius: 20,
          width: 200,
          height: 40,
        }}
        onPress={() => dispatch(login())}>
        <Text style={{color: 'white'}}>
          {auth.isLoading ? 'loading...' : 'LOGIN'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'red'}}>Home Screen</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          borderRadius: 20,
          width: 200,
          height: 40,
        }}
        onPress={() => dispatch(logout())}>
        <Text style={{color: 'white'}}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function Router() {
  const auth = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.data ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Login'}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
