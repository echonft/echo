import { Offer } from '@echo/firestore'

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
