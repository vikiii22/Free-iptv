// screens/PlayerScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const PlayerScreen = ({ route }) => {
  const { channelName, channelUrl } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{channelName}</Text>
      <Video
        source={{ uri: channelUrl }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        shouldPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  video: { width: '100%', height: 300 },
});

export default PlayerScreen;
