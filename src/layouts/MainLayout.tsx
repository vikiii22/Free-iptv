import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IMainLayoutProps } from './layouts.interface'
import config from '../../config.json'

export default function MainLayout(props: IMainLayoutProps) {
    const { children } = props

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: config.theme.colors.background
        }
    })

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}
