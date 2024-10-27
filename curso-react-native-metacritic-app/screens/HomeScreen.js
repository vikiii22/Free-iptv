// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [listName, setListName] = useState('');
    const [m3u8Url, setM3u8Url] = useState('');

    const handleLoadList = async () => {
        if (!listName || !m3u8Url) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await axios.get(m3u8Url);
            const channels = parseM3U8(response.data);
            navigation.navigate('ChannelList', { listName, channels });
        } catch (error) {
            Alert.alert('Error', 'No se pudo cargar la lista m3u8.');
        }
    };

    const parseM3U8 = (data) => {
        // Expresión regular ajustada para permitir valores opcionales y coincidir con el formato proporcionado
        const channels = [];
        const lines = data.split('\n'); // Divide el archivo en líneas

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('#EXTINF')) {
                // Extrae el nombre del canal entre comillas después de tvg-name=
                const nameMatch = lines[i].match(/tvg-name="([^"]*)"/);
                const name = nameMatch ? nameMatch[1] : 'Desconocido';

                // La URL está en la línea siguiente a #EXTINF
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default HomeScreen;
