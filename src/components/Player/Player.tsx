import { ResizeMode, Video } from 'expo-av'
import { Dimensions, StyleSheet } from 'react-native'
import { IPlayerProps } from './Player.interface'
import config from '../../../config.json'

export default function Player(props: IPlayerProps) {
    const { url } = props
    
    const styles = StyleSheet.create({
        video: {
            width: Dimensions.get("screen").width - 20,
            height: undefined,
            aspectRatio: 16 / 9,
            borderRadius: config.theme.borderRadius.md
        }
    })

    return (
        <Video
            source={{ uri: url }}
            style={styles.video}
            useNativeControls
            shouldPlay
            resizeMode={ResizeMode.CONTAIN}
            onError={(err) => console.log('Error:', err)}
        />
    )
}
