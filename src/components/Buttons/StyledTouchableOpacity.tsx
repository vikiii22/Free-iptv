import React from 'react'
import { StyleSheet, TouchableOpacityProps, TouchableOpacity } from 'react-native'
import TextStyled from '../Text/TextStyled'
import config from '../../../config.json'

interface StyledTouchableOpacityProps extends TouchableOpacityProps {
    label?: string
    errorMessage?: string
    text?: string
}

export default function StyledTouchableOpacity(props: StyledTouchableOpacityProps) {
    const { text, style, onPress } = props

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            height: 44,
            width: 300,
            borderRadius: config.theme.borderRadius.sm,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}
        >
            <TextStyled theme='dark'>{text}</TextStyled>
        </TouchableOpacity>
    )
}
