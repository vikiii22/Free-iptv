import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IMainLayoutProps } from './layouts.interface'
import config from '../../config.json'
import { StatusBar } from 'expo-status-bar'

export default function MainLayout(props: IMainLayoutProps) {
    const { children } = props

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 10,
            backgroundColor: config.theme.colors.secondary
        }
    })

    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            {children}
        </View>
    )
}
