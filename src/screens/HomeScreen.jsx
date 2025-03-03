import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [listName, setListName] = useState('');
    const [m3u8Url, setM3u8Url] = useState('');
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const loadSavedList = async () => {
            try {
                const savedChannels = await AsyncStorage.getItem('channelList');
                if (savedChannels) {
                    setChannels(JSON.parse(savedChannels));
                    console.log('Lista de canales cargada desde almacenamiento local');
                }
            } catch (error) {
                console.error('Error al cargar la lista de canales:', error);
            }
        };

        loadSavedList();
    }, []);

    const saveChannelList = async (channels) => {
        try {
            await AsyncStorage.setItem('channelList', JSON.stringify(channels));
            console.log('Lista de canales guardada correctamente.');
        } catch (error) {
            console.error('Error al guardar la lista de canales:', error);
        }
    };

    const clearChannelList = async () => {
        try {
            await AsyncStorage.removeItem('channelList');
            setChannels([]);
            console.log('Lista de canales eliminada correctamente.');
        } catch (error) {
            console.error('Error al eliminar la lista de canales:', error);
        }
    }

    const handleLoadList = async () => {
        if (!listName || !m3u8Url) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await axios.get(m3u8Url);
            const parsedChannels = parseM3U8(response.data);
            setChannels(parsedChannels);
            saveChannelList(parsedChannels);
            navigation.navigate('ChannelList', { listName, channels: parsedChannels });
        } catch (error) {
            Alert.alert('Error', 'No se pudo cargar la lista m3u8.');
        }
    };

    const parseM3U8 = (data) => {
        const channels = [];
        const lines = data.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('#EXTINF')) {
                const nameMatch = lines[i].match(/,(.*)/);
                const name = nameMatch ? nameMatch[1] : 'Desconocido';

                const url = lines[i + 1] ? lines[i + 1].trim() : null;

                if (url) {
                    channels.push({ name, url });
                }
            }
        }

        return channels;
    };

    return (
        <View style={styles.container}>
            {channels.length > 0 ? (
                <View>
                    <Button
                        title="Ver lista de canales guardada"
                        onPress={() => navigation.navigate('ChannelList', { listName, channels })}
                    />
                    <View style={{ height: 20 }} />
                    <Button title="Eliminar lista de canales" onPress={clearChannelList} />
                </View>
            ) : (
                <>
                    <Text>Nombre de la lista:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ejemplo: Mis Canales"
                        onChangeText={setListName}
                        value={listName}
                    />
                    <Text>URL de la lista m3u8:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ejemplo: http://example.com/playlist.m3u8"
                        onChangeText={setM3u8Url}
                        value={m3u8Url}
                    />
                    <Button title="Cargar lista" onPress={handleLoadList} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default HomeScreen;
