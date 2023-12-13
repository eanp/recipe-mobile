// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ProfileScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'red'}}>ProfileScreen Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {name: 'riki', umur: 20})}
      />
      <Button
        title="push Details"
        onPress={() => navigation.push('Details', {name: 'riki', umur: 20})}
      />
    </View>
  );
}
function AboutScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'red'}}>AboutScreen Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {name: 'riki', umur: 20})}
      />
      <Button
        title="push Details"
        onPress={() => navigation.push('Details', {name: 'riki', umur: 20})}
      />
    </View>
  );
}
function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {name: 'riki', umur: 20})}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Menu')}
      />
      <Button
        title="push Details"
        onPress={() => navigation.push('Details', {name: 'riki', umur: 20})}
      />
    </View>
  );
}

function DetailsScreen({route, navigation}) {
  let name = route.params?.name;
  let umur = route.params?.umur;

  console.log(name, umur);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'red'}}>name : {name}</Text>
      <Text style={{color: 'red'}}>umur : {umur}</Text>
      <Text style={{color: 'red'}}>Details Screen</Text>
      <Button title="home" onPress={() => navigation.navigate('Home')} />
      <Button title="back" onPress={() => navigation.goBack()} />
      <Button title="push Details" onPress={() => navigation.push('Details')} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Tab = createNativeStackNavigator();
// const Stack = createNativeStackNavigator();
const Stack = createBottomTabNavigator();

function Menu() {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'accessibility'
                : 'accessibility-outline';
            } else if (route.name === 'Details') {
              iconName = focused ? 'alert' : 'alert-circle';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'My Home'}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
