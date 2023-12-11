import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

const App = () => {
  const [number,setNumber] = useState(0)

  return (
    <SafeAreaView style={{}}>
      <StatusBar barStyle={'light-content'} backgroundColor="salmon" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
        <View style={[{backgroundColor: 'salmon'}]}>
          <Text
            style={{
              color: 'white',
              margin: 50,
              alignSelf: 'center',
              fontSize:30
            }}>
            {number}
          </Text>
        </View>
        <View style={styles.box}>
          <Text
            style={[styles.text,styles.button]}>
            hallo react native
          </Text>
        </View>

        <TouchableOpacity style={styles.box} onPress={()=>setNumber(number+1)}>
        <Text
            style={[styles.text,styles.button]}>
            hallo react native
          </Text>
        </TouchableOpacity>
       
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box:{
    backgroundColor:'skyblue',
    borderRadius: 20,
    marginTop:20,
    marginHorizontal:20
  },
  text:{
    color:"white"
  },
  button:{
    margin:20
  }
});

export default App;
