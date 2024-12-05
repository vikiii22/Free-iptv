import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ICardListProps } from "../cards.interface";
import config from "../../../../config.json"
import TextStyled from "../../Text/TextStyled";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useChannels } from "../../../hooks/useChannels";
import { useAppContext } from "../../../context/AppContext";
import * as SecureStore from 'expo-secure-store';

export default function CardList(props: ICardListProps) {
    const { name } = props

    const { deleteChannelListFromStore } = useChannels()
    const { session, actionSetSelectedList } = useAppContext()

    const styles = StyleSheet.create({
        container: {
            width: Dimensions.get("screen").width - 20,
            backgroundColor: config.theme.colors.primary,
            padding: 10,
            borderRadius: config.theme.borderRadius.md,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10
        },
        options: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }
    })

    return (
        <View style={styles.container}>
            <TextStyled theme={'light'} size={'md'}>
                {name}
            </TextStyled>
            <View style={styles.options}>
                <TouchableOpacity
                    onPress={async() => {
                        const list = session?.selectedList !== name ? name : ''
                        actionSetSelectedList(list)
                        await SecureStore.setItemAsync('lastListSelected', list)
                    }}
                >
                    <Icon name={session?.selectedList === name ? 'check-box' : 'check-box-outline-blank'} size={30} color={config.theme.colors.light}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteChannelListFromStore(name)}>
                    <Icon name="remove-circle-outline" size={30} color={config.theme.colors.light}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
