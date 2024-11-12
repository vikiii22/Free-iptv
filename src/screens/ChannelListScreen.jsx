import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';

const ChannelListScreen = ({ route, navigation }) => {
  const { listName, channels } = route.params;
  const [searchText, setSearchText] = useState('');

  const uniqueChannels = Array.from(new Set(channels.map(channel => channel.url)))
    .map(url => {
      return channels.find(channel => channel.url === url);
    });

  const filteredChannels = uniqueChannels.filter(channel =>
    channel.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Canales de {listName}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar canal..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredChannels}
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
  searchInput: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 },
  channelItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  logo: { width: 50, height: 50, marginRight: 10 },
  textContainer: { flex: 1 },
  channelText: { fontSize: 18 },
  groupText: { fontSize: 14, color: 'gray' },
});

export default ChannelListScreen;