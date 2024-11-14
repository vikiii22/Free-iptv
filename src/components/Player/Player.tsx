import { ResizeMode, Video } from 'expo-av'
import { Dimensions, StyleSheet } from 'react-native'
import { IPlayerProps } from './player.interface'

export default function Player(props: IPlayerProps) {
    const { url } = props
    
    const styles = StyleSheet.create({
        video: {
            width: Dimensions.get("screen").width,
            height: undefined,
            aspectRatio: 16 / 9
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
