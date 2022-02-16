import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-customized-image-picker';
export default function UploadImage({navigation}) {
  const [imagePreview, setimagePreview] = React.useState('');
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
      storeImage(image[0].data);
    });
  };
  async function storeImage(data) {
    await AsyncStorage.setItem('Imagesdata', data);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.customText}>Image Uploading Screen</Text>
      <TouchableOpacity onPress={() => handleImageUpload()}>
        <Image
          source={{
            uri: imagePreview
              ? `data:image/png;base64,${imagePreview}`
              : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
          }}
          style={{height: 100, width: 100}}
        />
      </TouchableOpacity>
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
  tinyLogo: {
    height: 40,
  },
});
