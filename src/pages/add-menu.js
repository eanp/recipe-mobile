import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import axios from 'axios';

const url = 'https://tiny-toad-teddy.cyclic.app';

export default function AddMenu({navigation}) {
  const auth = useSelector(state => state.auth);
  const [photo, setPhoto] = useState(null);
  const [response, setResponse] = useState(null);

  let headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${auth.data.token}`,
    },
  };

  useEffect(() => {
    console.log('response');
    console.log(response);
    response && navigation.navigate('Home');
  }, [response]);

  const uploadMenu = async () => {
    let formData = new FormData();

    formData.append('title', 'telur dadar');
    formData.append('ingredients', 'telur dan minyak');
    formData.append('category_id', 3);
    formData.append('photo', {
      uri: photo.uri,
      name: photo.fileName,
      type: photo.type,
    });

    let result = await axios.post(url + '/recipe', formData, headers);
    result.data && setResponse(result.data);
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App Needs Camera Access',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('access camera success');
        //
      } else {
        console.log('access camera failed');
        console.log(PermissionsAndroid.RESULTS.GRANTED);
      }
    } catch (err) {
      console.log('err');
      console.log(err);
    }
  };

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, res => {
      console.log('response camera ', res);
      if (res.didCancel) {
        console.log('user cancel camera');
      } else if (res.error) {
        console.log('camera error', res.errorMessage);
      } else {
        console.log('camera success');
        console.log(res);
        setPhoto(res.assets[0]);
      }
    });
  };

  const galleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, res => {
      console.log('response gallery ', res);
      if (res.didCancel) {
        console.log('user cancel gallery');
      } else if (res.error) {
        console.log('gallery error', res.errorMessage);
      } else {
        console.log('gallery success');
        console.log(res);
        setPhoto(res.assets[0]);
      }
    });
  };

  return (
    <View>
      {photo ? (
        <Image
          resizeMode="cover"
          style={{height: 300, width: 300}}
          source={{uri: photo.uri}}
        />
      ) : null}
      <Text style={{fontSize: 40, color: 'black', alignSelf: 'center'}}>
        Add Menu
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          borderRadius: 20,
          width: 200,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 40,
        }}
        onPress={requestPermission}>
        <Text style={{color: 'white'}}>requestPermission</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          borderRadius: 20,
          width: 200,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 40,
        }}
        onPress={cameraLaunch}>
        <Text style={{color: 'white'}}>cameraLaunch</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: 'green',
          borderRadius: 20,
          width: 200,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 40,
        }}
        onPress={galleryLaunch}>
        <Text style={{color: 'white'}}>galleryLaunch</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: 'grey',
          borderRadius: 20,
          width: 200,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 40,
        }}
        onPress={uploadMenu}>
        <Text style={{color: 'white'}}>uploadMenu</Text>
      </TouchableOpacity>

	  
    </View>
  );
}
