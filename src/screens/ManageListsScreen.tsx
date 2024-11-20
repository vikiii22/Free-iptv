import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { IChannel } from '../interfaces/channels'

const ManageListsScreen = ({ navigation }) => {
    const [listName, setListName] = useState('')
    const [m3u8Url, setM3u8Url] = useState('')
    const [channels, setChannels] = useState([])

    const saveChannelList = async (listName: string, channels: IChannel[]) => {
        try {
          const storedLists = await SecureStore.getItemAsync('lists')
          const lists = storedLists ? JSON.parse(storedLists) : {}
      
          lists[listName] = channels

          await SecureStore.setItemAsync('lists', JSON.stringify(lists))
          console.log(`Lista "${listName}" guardada correctamente.`)
        } catch (error) {
          console.error('Error al guardar la lista de canales:', error)
        }
    }

    const clearChannelList = async () => {
        try {
            await SecureStore.deleteItemAsync('lists')
            setChannels([])
            console.log('Lista de canales eliminada correctamente.')
        } catch (error) {
            console.error('Error al eliminar la lista de canales:', error)
        }
    }

    const handleLoadList = async () => {
        if (!listName || !m3u8Url) {
            Alert.alert('Error', 'Por favor, completa todos los campos.')
            return
        }

        try {
            const response = await axios.get(m3u8Url)
            const parsedChannels = parseM3U8(response.data)
            setChannels(parsedChannels)
            saveChannelList(listName, parsedChannels)
            navigation.navigate('manage-lists', { listName, channels: parsedChannels })
        } catch (error) {
            Alert.alert('Error', 'No se pudo cargar la lista m3u8.')
        }
    }

    const parseM3U8 = (data) => {
        const channels = [] 
        const lines = data.split('\n')
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('#EXTINF')) {
                const nameMatch = lines[i].match(/,(.*)/)
                const name = nameMatch ? nameMatch[1].trim() : 'Desconocido'
    
                const idMatch = lines[i].match(/id="(.*?)"/)
                const id = idMatch ? idMatch[1] : null
    
                const logoMatch = lines[i].match(/logo="(.*?)"/)
                const logo = logoMatch ? logoMatch[1] : null
    
                const groupMatch = lines[i].match(/title="(.*?)"/)
                const group = groupMatch ? groupMatch[1] : null
    
                const url = lines[i + 1] ? lines[i + 1].trim() : null

                if (url) {
                    channels.push({
                        name,
                        url,
                        id,
                        logo,
                        group
                    })
                }
            }
        }

        return channels
    }

    return (
        <View style={styles.container}>
            {channels.length > 0 ? (
                <View>
                    <Button
                        title="Ver lista de canales guardada"
                        onPress={() => navigation.navigate('manage-lists', { listName, channels })}
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
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginVertical: 10 },
})

export default ManageListsScreen
