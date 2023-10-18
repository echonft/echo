import { type Offer } from '@echo/model/types/offer'

export enum ButtonAction {
  BUY = 'buy',
  REJECT = 'reject'
}

export const buttonIdPrefixes = Object.values(ButtonAction)

interface ButtonData {
  action: ButtonAction
}

export interface BuyButtonData extends ButtonData {
  offer: Offer | undefined
}

export type ButtonWithData = BuyButtonData
