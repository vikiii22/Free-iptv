import { ReactElement } from "react"

export interface IHeaderProps {
    title?: string
    leftComponent?: ReactElement
    rightComponent?: ReactElement
    centerComponent?: ReactElement
}