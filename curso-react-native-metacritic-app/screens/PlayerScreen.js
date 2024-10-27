import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const PlayerScreen = ({ route }) => {
  const { channelName, channelUrl } = route.params;
  const videoRef = useRef(null); // Ref para manejar el video

  const handleError = (error) => {
    console.error('Error al cargar el video:', error);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{channelName}</Text>
      <Video
        ref={videoRef}
        source={{ uri: channelUrl }} // Asegúrate de que este sea un enlace HTTP válido
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        shouldPlay
        onError={handleError} // Maneja errores al cargar el video
      />
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
