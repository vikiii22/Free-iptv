import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ChannelListScreen = ({ route, navigation }) => {
  const { listName, channels } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Canales de {listName}</Text>
      <FlatList
        data={channels}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.channelItem}
            onPress={() => navigation.navigate('Player', { channelName: item.name, channelUrl: item.url })}
          >
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <View style={styles.textContainer}>
              <Text style={styles.channelText}>{item.name}</Text>
              <Text style={styles.groupText}>{item.group}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  channelItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  logo: { width: 50, height: 50, marginRight: 10 },
  textContainer: { flexDirection: 'column' },
  channelText: { fontSize: 18 },
  groupText: { fontSize: 14, color: '#777' },
});

export default ChannelListScreen;
