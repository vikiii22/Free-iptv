import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import Player from '../components/Player/Player'
import { useAppContext } from '../context/AppContext'
import { useChannels } from '../hooks/useChannels'
import { IChannel } from '../interfaces/channels'
import CardChannel from '../components/Cards/CardChannel/CardChannel'
import MainLayout from '../layouts/MainLayout'
import TextStyled from '../components/Text/TextStyled'
import Header from '../components/Header/Header'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StyledTouchableOpacity from '../components/Buttons/StyledTouchableOpacity'
import config from '../../config.json'
import StyledTextInput from '../components/Inputs/StyledTextInput'

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
        const selectedList = session?.selectedList

        if (selectedList && lists[selectedList]) {
            setFilteredChannels(lists[selectedList])
            setInitialChannels(lists[selectedList])
            setDisplayedChannels(lists[selectedList].slice(0, itemsPerPage))
            setSelectedChannel(lists[selectedList][0])
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
        title: { marginTop: 10 },
        searchInput: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 20,
            paddingHorizontal: 10
        },
        channelItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
        logo: { width: 50, height: 50, marginRight: 10 },
        textContainer: { flex: 1 },
        channelText: { fontSize: 18 },
        groupText: { fontSize: 14, color: 'gray' },
        container: { display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' },
        noLists: { textAlign: 'center', marginBottom: 20, marginHorizontal: 20 },
        channelContainer: { width: '100%' }
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
            <View style={styles.container}>
                {(session && session.selectedList && lists) ? (
                    <>
                        <Player {...selectedChannel} />
                        <TextStyled style={styles.title} size={'md'}>Canales de {session.selectedList}</TextStyled>
                        <StyledTextInput
                            style={styles.searchInput}
                            placeholder="Buscar canal..."
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />
                        <FlatList
                            data={displayedChannels}
                            style={styles.channelContainer}
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
                    </>
                ) : (
                    <>
                        <TextStyled style={styles.noLists}>{'No se han encontrado listas de canales'}</TextStyled>
                        <StyledTouchableOpacity
                            onPress={() => navigation.navigate('Mis Listas')}
                            text={'Añade tu lista'}
                        />
                    </>
                )}
            </View>
        </MainLayout>
    )
}
