import React from 'react'
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native'
import config from '../../../config.json'

interface InputProps extends TextInputProps {
    label?: string
    errorMessage?: string
}

export default function StyledTextInput(props: InputProps) {
    const { label, errorMessage, style } = props

    const styles = StyleSheet.create({
        container: {
            marginVertical: 10,
        },
        label: {
            fontSize: 14,
            color: config.theme.colors.dark,
            marginBottom: 5,
        },
        input: {
            height: 40,
            borderWidth: 1,
            borderColor: config.theme.colors.dark,
            borderRadius: config.theme.borderRadius.sm,
            paddingHorizontal: 10,
            backgroundColor: config.theme.colors.white,
            fontSize: config.theme.fontSize.md
        },
        error: {
            fontSize: 12,
            color: 'red',
            marginTop: 5,
        }
    })

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput 
                style={[styles.input, style]}
                {...props}
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    )
}
