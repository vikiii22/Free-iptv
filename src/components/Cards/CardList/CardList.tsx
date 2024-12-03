import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ICardListProps } from "../cards.interface";
import config from "../../../../config.json"
import TextStyled from "../../Text/TextStyled";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useChannels } from "../../../hooks/useChannels";

export default function CardList(props: ICardListProps) {
    const { name } = props

    const { deleteChannelListFromStore } = useChannels()

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
        }
    })

    return (
        <View style={styles.container}>
            <TextStyled theme={'light'} size={'md'}>
                {name}
            </TextStyled>
            <TouchableOpacity onPress={() => deleteChannelListFromStore(name)}>
                <Icon name="remove-circle-outline" size={30} color={config.theme.colors.light}/>
            </TouchableOpacity>
        </View>
    )
}
