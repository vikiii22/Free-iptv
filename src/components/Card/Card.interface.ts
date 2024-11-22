import { IChannel } from '../../interfaces/channels';

export interface ICardsProps extends IChannel {
    onPressChannel? : () => void,
    onToggleFavorite? : () => void
}