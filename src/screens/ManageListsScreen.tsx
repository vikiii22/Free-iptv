import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useChannels } from '../hooks/useChannels'

const ManageListsScreen = ({ navigation }) => {
    const [listName, setListName] = useState('')
    const [m3u8Url, setM3u8Url] = useState('')
    const [channels, setChannels] = useState([])

    const { clearChannelList, handleLoadList } = useChannels()

    return (
        <View style={styles.container}>
            {channels.length > 0 ? (
                <View>
                    <Button
                        title="Ver lista de canales guardada"
                        onPress={() => navigation.navigate('manage-lists', { listName, channels })}
                    />
                    <View style={{ height: 20 }} />
                    <Button 
                        title="Eliminar lista de canales"
                        onPress={() => {
                            clearChannelList()
                            setChannels([])
                        }}
                    />
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
                    <Button title="Cargar lista" onPress={() => handleLoadList(listName, m3u8Url)} />
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
