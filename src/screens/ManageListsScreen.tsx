import React, { useEffect, useState } from 'react'
import { View, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import CardList from '../components/Cards/CardList/CardList'
import Header from '../components/Header/Header'
import TextStyled from '../components/Text/TextStyled'
import { useAppContext } from '../context/AppContext'
import { useChannels } from '../hooks/useChannels'
import MainLayout from '../layouts/MainLayout'
import config from '../../config.json'

export default function ManageListsScreen({ navigation }) {
    const { lists } = useAppContext()

    const [savedLists, setSavedLists] = useState<string[]>([])
    const [listName, setListName] = useState<string>('')
    const [m3u8Url, setM3u8Url] = useState<string>('')
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState<boolean>(false)

    const { clearChannelList, handleLoadList } = useChannels()
    // clearChannelList()

    useEffect(() => {
        setSavedLists(Object.keys(lists))
    }, [lists])

    const styles = StyleSheet.create({
        input: { borderWidth: 1, padding: 10, marginVertical: 10 },
        listContainer: {},
        formContainer: {
            backgroundColor: 'white',
            width: '100%',
            padding: 20,
            paddingBottom: 50,
            borderRadius: config.theme.borderRadius.lg,
            marginBottom: -20
        }
    })

    return (
        <MainLayout>
            <Header
                title='Mis listas'
                rightComponent={(
                    <TouchableOpacity onPress={() => navigation.navigate('Free IPTV')}>
                        <TextStyled>{"Live"}</TextStyled>
                    </TouchableOpacity>
                )}
            />
            <FlatList
                style={styles.listContainer}
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
                <View style={styles.formContainer}>
                    <TextStyled theme='dark'>Nombre de la lista:</TextStyled>
                    <TextInput
                        style={styles.input}
                        placeholder="Ejemplo: Mis Canales"
                        onChangeText={setListName}
                        value={listName}
                    />
                    <TextStyled theme='dark'>URL de la lista m3u8:</TextStyled>
                    <TextInput
                        style={styles.input}
                        placeholder="Ejemplo: http://example.com/playlist.m3u8"
                        onChangeText={setM3u8Url}
                        value={m3u8Url}
                    />
                    {loading ? (
                        <ActivityIndicator size="large" color={config.theme.colors.primary} />
                        ) : (
                        <Button
                            title="Cargar lista"
                            onPress={async () => {
                                setLoading(true);
                                try {
                                    await handleLoadList(listName, m3u8Url);
                                } catch (error) {
                                    console.error("Error al cargar la lista:", error);
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        />
                    )}
                </View>
            )}
        </MainLayout>
    )
}
