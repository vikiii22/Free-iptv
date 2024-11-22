import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ICardListProps } from "../cards.interface";
import config from "../../../../config.json"
import TextStyled from "../../Text/TextStyled";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CardList(props: ICardListProps) {
    const { name } = props

    const styles = StyleSheet.create({
        container: {
            width: Dimensions.get("screen").width - 40,
            backgroundColor: config.theme.colors.primary,
            padding: 10,
            borderRadius: config.theme.borderRadius.md,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })

    return (
        <View style={styles.container}>
            <TextStyled theme={'light'} size={'md'}>
                {name}
            </TextStyled>
            <TouchableOpacity>
                <Icon name="remove-circle-outline" size={30} color={config.theme.colors.light}/>
            </TouchableOpacity>
        </View>
    )
}
