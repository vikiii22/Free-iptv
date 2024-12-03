import { Dimensions, StyleSheet, View } from "react-native";
import config from "../../../config.json";
import TextStyled from "../Text/TextStyled";
import { IHeaderProps } from "./header.interface";

export default function Header(props: IHeaderProps) {
    const { title, centerComponent, leftComponent, rightComponent } = props;

    const styles = StyleSheet.create({
        container: {
            width: Dimensions.get("screen").width - 20,
            marginBottom: 20,
            borderRadius: config.theme.borderRadius.md,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        sectionLeft: {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        sectionRight: {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center'
        },
        sectionCenter: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.sectionLeft}>
                {leftComponent || <View />}
            </View>
            <View style={styles.sectionCenter}>
                {title ? (
                    <TextStyled size={'lg'}>{title}</TextStyled>
                ) : centerComponent ? (
                    centerComponent
                ) : (
                    <View />
                )}
            </View>
            <View style={styles.sectionRight}>
                {rightComponent || <View />}
            </View>
        </View>
    );
}
