import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import ContactsCard from './ContactCard';
import {useIsFocused} from '@react-navigation/native';

export default function ViewContact({navigation}) {
  let [contactData, setContactData] = React.useState([]);
  const isFocused = useIsFocused();
  async function getAllData() {
    const data = await AsyncStorage.getItem('contacts');
    setContactData(JSON.parse(data));
    return data;
  }
  console.log('[View Contact Data]', contactData && contactData);
  React.useEffect(() => {
    getAllData();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <FlatList
        data={contactData}
        keyExtractor={item => item.id}
        renderItem={contactData => (
          <TouchableOpacity onPress={() => navigation.navigate()}>
            <ContactsCard contactInfo={contactData && contactData} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  addIcon: {
    bottom: 20,
    right: 20,
    position: 'absolute',
    zIndex: 1,
  },
});
