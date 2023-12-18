import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout} from '../storages/action/auth';
import AddMenu from '../pages/add-menu';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const url = 'https://tiny-toad-teddy.cyclic.app';


function LoginScreen() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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

      {auth.isErrorMessage && <Text style={{color: 'red'}}>{auth.isErrorMessage}</Text>}
    </View>
  );
}
function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const [response, setResponse] = useState(null);

  let getData = async () => {
    let result = await axios.get(url + '/recipe/detail');
    console.log(result.data.data)
    result && setResponse(result.data.data)
  }

  useEffect(() =>{
    getData()
  },[])

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{color: 'red'}}>Home Screen</Text>

          {response && response.map((item,index) => 
                <Text key={index+1} style={{color:"black"}}>
                  {item.title}
                </Text>
              )
          }


          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              borderRadius: 20,
              width: 200,
              height: 40,
              justifyContent:"center",
              alignItems:"center",
              marginBottom:40
            }}
            onPress={() => navigation.navigate("AddMenu")}>
            <Text style={{color: 'white'}}>Add Menu</Text>
            </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          borderRadius: 20,
          width: 200,
          height: 40,
          justifyContent:"center",
          alignItems:"center"
        }}
        onPress={() => dispatch(logout())}>
        <Text style={{color: 'white'}}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'accessibility' : 'accessibility-outline';
          } else if (route.name === 'AddMenu') {
            iconName = focused ? 'alert' : 'alert-circle';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'My Home'}}
      />
      <Tab.Screen
        name="AddMenu"
        component={AddMenu}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function Router() {
  const auth = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.data ? (
          <Stack.Screen
            name="BottomNav"
            component={BottomNav}
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
