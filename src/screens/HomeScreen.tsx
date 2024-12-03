import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import Player from '../components/Player/Player'
import { useAppContext } from '../context/AppContext'
import { useChannels } from '../hooks/useChannels'
import { IChannel } from '../interfaces/channels'
import CardChannel from '../components/Cards/CardChannel/CardChannel'

export default function HomeScreen({}) {
    const { lists } = useAppContext()
    const { initLoad } = useChannels()

    const [searchTerm, setSearchTerm] = useState('')
    const [initialChannels, setInitialChannels] = useState<IChannel[]>([])
    const [filteredChannels, setFilteredChannels] = useState<IChannel[]>([])
    const [selectedChannel, setSelectedChannel] = useState<IChannel>(null)
    const [displayedChannels, setDisplayedChannels] = useState<IChannel[]>([])
    const itemsPerPage = 10

    useEffect(() => {
        initLoad()
    }, [])

    useEffect(() => {
        if (lists) {
            const firstListSaved = Object.keys(lists)[0]
            if (firstListSaved) {
                setFilteredChannels(lists[firstListSaved])
                setInitialChannels(lists[firstListSaved])
                setDisplayedChannels(lists[firstListSaved].slice(0, itemsPerPage))
                setSelectedChannel(lists[firstListSaved][0])
            }
        }
    }, [lists])

    useEffect(() => {
        const channels = initialChannels.filter(channel => 
            channel.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredChannels(searchTerm.length > 0 ? channels : initialChannels)
        setDisplayedChannels((searchTerm.length > 0 ? channels : initialChannels).slice(0, itemsPerPage))
    }, [searchTerm, initialChannels])

    const loadMoreChannels = () => {
        const currentCount = displayedChannels.length
        const nextChannels = filteredChannels.slice(currentCount, currentCount + itemsPerPage)
        if (nextChannels.length > 0) {
            setDisplayedChannels(prevChannels => [...prevChannels, ...nextChannels])
        }
    }

    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: '#212B4E'},
        title: { fontSize: 24, marginBottom: 20 },
        searchInput: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10, borderRadius: 10, marginLeft: 10, marginRight: 10 },
        channelItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
        logo: { width: 50, height: 50, marginRight: 10 },
        textContainer: { flex: 1 },
        channelText: { fontSize: 18 },
        groupText: { fontSize: 14, color: 'gray' },
    })

    return (
        <View style={styles.container}>
            <Player {...selectedChannel} />
            <Text style={styles.title}>Canales de {'listName'}</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar canal..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <FlatList
                data={displayedChannels}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={({ item, index }) => (
                    <CardChannel 
                        {...item} 
                        key={index} 
                        isSelected={selectedChannel.id === item.id}
                        onPressChannel={() => setSelectedChannel(item)} 
                        onToggleFavorite={() => console.log('Toggle favorite')}
                    />
                )}
                onEndReached={loadMoreChannels}
                onEndReachedThreshold={0.5}
            />
        </View>
    )
}
