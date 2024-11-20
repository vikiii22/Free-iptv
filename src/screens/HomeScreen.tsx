import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native'
import Player from '../components/Player/Player'
import { useAppContext } from '../context/AppContext'
import { useChannels } from '../hooks/useChannels'
import { IChannel } from '../interfaces/channels'

export default function HomeScreen({}) {
    const { lists } = useAppContext()
    const { initLoad } = useChannels()

    const [searchTerm, setSearchTerm] = useState('')
    const [initialChannels, setInitialChannels] = useState<IChannel[]>([])
    const [filteredChannels, setFilteredChannels] = useState<IChannel[]>([])
    const [selectedChannel, setSelectedChannel] = useState<IChannel>(null)

    useEffect(() => {
        initLoad()
    }, [])

    useEffect(() => {
        if (lists) {
            const firstListSaved = Object.keys(lists)[0]
            if (firstListSaved) {
                setFilteredChannels(lists[firstListSaved])
                setInitialChannels(lists[firstListSaved])
                setSelectedChannel(lists[firstListSaved][0])
            }
        }
    }, [lists])

    useEffect(() => {
        const channels = initialChannels.filter(channel => channel.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredChannels(searchTerm.length > 0 ? channels : initialChannels)
    }, [searchTerm])

    const styles = StyleSheet.create({
        container: { flex: 1},
        title: { fontSize: 24, marginBottom: 20 },
        searchInput: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 },
        channelItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
        logo: { width: 50, height: 50, marginRight: 10 },
        textContainer: { flex: 1 },
        channelText: { fontSize: 18 },
        groupText: { fontSize: 14, color: 'gray' },
        scrollView: { height: 100 }
    })

    return (
        <View style={styles.container}>
            <Player {...selectedChannel}/>
            <Text style={styles.title}>Canales de {'listName'}</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar canal..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <ScrollView style={styles.scrollView}>
                <FlatList
                    data={filteredChannels.slice(0, 10)}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.channelItem}
                            onPress={() => setSelectedChannel(item)}
                        >
                            <Image source={{ uri: item.logo }} style={styles.logo} />
                            <View style={styles.textContainer}>
                                <Text style={styles.channelText}>{item.name}</Text>
                                <Text style={styles.groupText}>{item.group}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </View>
    )
}
