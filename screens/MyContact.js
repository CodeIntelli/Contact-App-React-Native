import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import {UserAddOutlined} from '@ant-design/icons';
export default function MyContact({navigation}) {
  let [contactData, setContactData] = React.useState([]);

  async function getAllData() {
    const data = await AsyncStorage.getItem('contacts');
    console.log(data);
    setContactData(data);
  }
  console.log('[My Contact]', contactData);
  React.useEffect(() => {
    getAllData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.customText}>Add Your Contact</Text>
      {contactData && contactData.length > 1 ? (
        <TouchableOpacity
          style={styles.AddBtn}
          onPress={() => navigation.navigate('ViewContact')}>
          <Text style={styles.btnText}>View</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.btnText}> </Text>
      )}
      <TouchableOpacity
        style={styles.AddBtn}
        onPress={() => navigation.navigate('Create')}>
        <Text style={styles.btnText}>+ Add</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={[styles.AddBtn, {width: 150}]}
        onPress={() => navigation.navigate('UploadImage')}>
        <Text style={styles.btnText}>Upload Image</Text>
      </TouchableOpacity> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  customText: {margin: 20, fontSize: 20, color: 'white'},
  AddBtn: {
    padding: 10,
    backgroundColor: '#3498db',
    height: 35,
    width: 100,
    color: 'white',
    margin: 10,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    alignSelf: 'center',
  },
});
