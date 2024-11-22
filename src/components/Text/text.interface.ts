import { TextProps } from "react-native/types";

export interface ITextProps extends TextProps {
    theme?: 'light'|'dark'
    size?: 'sm'|'md'|'lg'
}