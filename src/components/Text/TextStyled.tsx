import React from 'react'
import { Text } from 'react-native'
import { ITextProps } from './text.interface'
import config from '../../../config.json'

export default function TextStyled(props: ITextProps) {
    const { children, theme='light', size='md', style } = props

    return (
        <Text
            style={{
                color: theme === 'dark' ? config.theme.colors.dark : config.theme.colors.light,
                fontSize: size === 'sm' ? config.theme.fontSize.sm
                    : size === 'md' ? config.theme.fontSize.md
                    : size === 'lg' ? config.theme.fontSize.lg
                    : config.theme.fontSize.md
            }}
        >
            {children}
        </Text>
    )
}
