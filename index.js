/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from './src/routers';
import {name as appName} from './app.json';
import React,{Component} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage from "./src/storages/store"
import { LogLevel, OneSignal } from 'react-native-onesignal';

const {store, persistor} = storage()

const AppID = "edc29384-96d4-4dd3-9a17-32e80c8a8a74"
class App extends Component{
	async componentDidMount(){
		OneSignal.Debug.setLogLevel(LogLevel.Verbose);
		OneSignal.initialize(AppID);
		OneSignal.Notifications.requestPermission(true);
		OneSignal.Notifications.addEventListener('click', (event) => {
			console.log('OneSignal: notification clicked:', event);
		  });
	}
	render(){
		return(
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Router />
				</PersistGate>
			</Provider>
				)
	}
}


AppRegistry.registerComponent(appName, () => App);
