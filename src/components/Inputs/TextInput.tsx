import React from 'react'
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native'

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
            color: '#333',
            marginBottom: 5,
        },
        input: {
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
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
                style={[styles.input, style]} // Combina estilos del componente y los personalizados
                {...props} // Hereda todas las props de TextInput
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    )
}
