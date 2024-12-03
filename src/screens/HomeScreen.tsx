import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TextInput } from 'react-native'
import Player from '../components/Player/Player'
import { useAppContext } from '../context/AppContext'
import { useChannels } from '../hooks/useChannels'
import { IChannel } from '../interfaces/channels'
import CardChannel from '../components/Cards/CardChannel/CardChannel'
import MainLayout from '../layouts/MainLayout'
import TextStyled from '../components/Text/TextStyled'
import Header from '../components/Header/Header'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function HomeScreen({ navigation }) {
    const { lists, session } = useAppContext()
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
        const selectedList = session?.selectedList ? Object.keys(lists)[session.selectedList] : Object.keys(lists)[0]

        if (selectedList && lists) {
            if (selectedList) {
                setFilteredChannels(lists[selectedList])
                setInitialChannels(lists[selectedList])
                setDisplayedChannels(lists[selectedList].slice(0, itemsPerPage))
                setSelectedChannel(lists[selectedList][0])
            }
        } else if (!selectedList  && !lists) {
            setFilteredChannels([])
            setInitialChannels([])
        }
    }, [lists, session])

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
        title: { fontSize: 24, marginBottom: 20 },
        searchInput: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 },
        channelItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
        logo: { width: 50, height: 50, marginRight: 10 },
        textContainer: { flex: 1 },
        channelText: { fontSize: 18 },
        groupText: { fontSize: 14, color: 'gray' },
    })

    return (
        <MainLayout>
            <Header
                title='Free IPTV'
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.navigate('Mis Listas')}>
                        <TextStyled>{'Mis Listas'}</TextStyled>
                    </TouchableOpacity>
                }
            />
            <Player {...selectedChannel} />
            <TextStyled style={styles.title}>Canales de {'listName'}</TextStyled>
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
                        onPressChannel={() => setSelectedChannel(item)} 
                        onToggleFavorite={() => console.log('Toggle favorite')}
                    />
                )}
                onEndReached={loadMoreChannels}
                onEndReachedThreshold={0.5}
            />
        </MainLayout>
    )
}
