import React from 'react';
import { Platform, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const PlayerScreen = ({ route }) => {
  const { channelName, channelUrl } = route.params;
  const isHTTP = channelUrl.startsWith('http://');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{channelName}</Text>
      {Platform.OS === 'ios' && isHTTP ? (
        console.log('channelUrl', channelUrl),
        <Video
          source={{ uri: channelUrl }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          onError={err => console.log('Error:', err)}
        />
      ) : (
        <Video
          source={{ uri: channelUrl }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          shouldPlay
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
  },
});

export default PlayerScreen;
