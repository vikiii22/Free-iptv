import { Dimensions, StyleSheet, Text, View } from "react-native";
import config from "../../../config.json"
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextStyled from "../Text/TextStyled";
import { IHeaderProps } from "./header.interface";
import Logo from "../Logo/Logo";

export default function Header(props: IHeaderProps) {
    const { title } = props

    const styles = StyleSheet.create({
        container: {
            width: Dimensions.get("screen").width - 40,
            marginBottom: 20,
            borderRadius: config.theme.borderRadius.md,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })

    return (
        <View style={styles.container}>
            <Logo/>
            <TextStyled size={'lg'}>
                {title}
            </TextStyled>
            <TouchableOpacity>
                <Icon
                    name="add-circle-outline"
                    size={30}
                    color={config.theme.colors.light}
                />
            </TouchableOpacity>
        </View>
    )
}
