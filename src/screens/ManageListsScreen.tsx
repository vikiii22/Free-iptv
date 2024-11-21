import React, { useEffect, useState } from 'react'
import { View, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import CardList from '../components/Cards/CardList/CardList'
import Header from '../components/Header/Header'
import TextStyled from '../components/Text/TextStyled'
import { useAppContext } from '../context/AppContext'
import { useChannels } from '../hooks/useChannels'
import MainLayout from '../layouts/MainLayout'

export default function ManageListsScreen({ navigation }) {
    const { lists } = useAppContext()

    const [savedLists, setSavedLists] = useState<string[]>([])
    const [listName, setListName] = useState('')
    const [m3u8Url, setM3u8Url] = useState('')
    const [channels, setChannels] = useState([])

    const { clearChannelList, handleLoadList } = useChannels()

    useEffect(() => {
        setSavedLists(Object.keys(lists))
    }, [])

    const styles = StyleSheet.create({
        input: { borderWidth: 1, padding: 10, marginVertical: 10 },
    })

    return (
        <MainLayout>
            <Header title='Mis listas'/>
            <FlatList
                data={savedLists}
                keyExtractor={(item) => item.toLocaleLowerCase()}
                renderItem={({ item }) => (
                    <CardList name={item}/>
                )}
            />
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
                    <TextStyled>Nombre de la lista:</TextStyled>
                    <TextInput
                        style={styles.input}
                        placeholder="Ejemplo: Mis Canales"
                        onChangeText={setListName}
                        value={listName}
                    />
                    <TextStyled>URL de la lista m3u8:</TextStyled>
                    <TextInput
                        style={styles.input}
                        placeholder="Ejemplo: http://example.com/playlist.m3u8"
                        onChangeText={setM3u8Url}
                        value={m3u8Url}
                    />
                    <Button title="Cargar lista" onPress={() => handleLoadList(listName, m3u8Url)} />
                </>
            )}
        </MainLayout>
    )
}
