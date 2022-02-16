/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-customized-image-picker';
export default function CreateContact({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [contactData, setContactData] = useState([]);

  const [imagePreview, setimagePreview] = React.useState('');
  let data;

  let handleImageUpload = async () => {
    console.log('data clicked');
    ImagePicker.openPicker({
      includeBase64: true,
      cropping: true,
      height: 250,
      width: 250,
    }).then(image => {
      console.log(image[0]);
      setimagePreview(image[0].data);
    });
  };
  async function getAllData() {
    // AsyncStorage.clear();
    data = await AsyncStorage.getItem('contacts');
    setContactData(JSON.parse(data));
    return data;
  }
  console.log(contactData);

  async function addContact() {
    try {
      if ((!firstName && !lastName) || phoneNumbers.length === 1) {
        Alert.alert('Something went wrong', 'Please fill the all fields');
        return;
      }
      let jsonData = await getAllData();
      let dataArr = jsonData ? JSON.parse(jsonData) : [];

      console.log('******************', Date.now());
      const contactInfo = {
        id: Date.now() + 3600,
        displayName: firstName + ' ' + lastName,
        givenName: firstName + ' ' + lastName,
        company: company,
        phoneNumbers,
        profileImage: imagePreview,
        createdAt: new Date().toLocaleDateString(),
      };
      console.log(contactInfo);
      let newData = [...dataArr];
      newData.push(contactInfo);
      console.log('******************', contactInfo);
      await AsyncStorage.setItem('contacts', JSON.stringify(newData));
      setFirstName('');
      setLastName('');
      setCompany('');
      setPhoneNumbers('');
      navigation.navigate('MyContacts');
    } catch (err) {
      console.log(err);
    }
  }

  const [keyboardStatus, setKeyboardStatus] = useState(false);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  React.useEffect(() => {
    getAllData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.customText}>Add Your Contact Details</Text>
        <TouchableOpacity
          style={{display: 'flex', alignSelf: 'center', margin: 10}}
          onPress={() => handleImageUpload()}>
          <Image
            source={{
              uri: imagePreview
                ? `data:image/png;base64,${imagePreview}`
                : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
            }}
            style={{height: 100, width: 100}}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          label="First Name"
          placeholder="Firstname"
          placeholderTextColor="#fff"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Lastname"
          placeholderTextColor="#fff"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          placeholderTextColor="#fff"
          value={company}
          onChangeText={text => setCompany(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#fff"
          keyboardType="number-pad"
          value={phoneNumbers}
          onChangeText={text => setPhoneNumbers(text)}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.AddBtn} onPress={() => addContact()}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  inputContainer: {
    marginTop: 50,
    padding: 10,
    margin: 10,
  },
  input: {
    borderWidth: 1,
    margin: 20,
    color: 'white',
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  customText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  AddBtn: {
    padding: 10,
    backgroundColor: '#3498db',
    height: 35,
    width: 150,
    color: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    alignSelf: 'center',
  },
});
