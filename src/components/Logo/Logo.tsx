import { Image, StyleSheet } from 'react-native'

export default function Logo() {

    const styles = StyleSheet.create({
        logo: {
            width: 44,
            height: 44,
        },
    })

    return (
        <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
        />
    )
}
