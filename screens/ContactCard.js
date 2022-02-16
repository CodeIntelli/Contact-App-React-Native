/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
export default function ContactsCard({contactInfo}) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <View style={{...styles.icon}}>
          {contactInfo.item.profileImage ? (
            <Image
              source={{
                uri: contactInfo.item.profileImage
                  ? `data:image/png;base64,${contactInfo.item.profileImage}`
                  : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
              }}
              style={{height: 35, width: 35}}
            />
          ) : (
            <Text style={styles.iconContent}>
              {contactInfo.item.displayName[0]}
            </Text>
          )}
        </View>
        <View
          style={{display: 'flex', flexDirection: 'column', color: 'white'}}>
          <Text style={{fontSize: 16, color: 'white'}}>
            {contactInfo.item.displayName}
          </Text>
          <Text style={{fontSize: 14, color: 'white'}}>
            {contactInfo.item.phoneNumbers}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  primaryText: {
    fontSize: 18,
    color: 'white',
  },
  iconContent: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 24,
    color: 'white',
    marginHorizontal: 10,
  },
  icon: {
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    padding: 1,
    backgroundColor: 'green',
  },
});
