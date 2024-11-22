import { IChannel } from "../../interfaces/channels"

export interface ICardListProps {
    name: string
}

export interface ICardsProps extends IChannel {
    onPressChannel? : () => void,
    onToggleFavorite? : () => void
}