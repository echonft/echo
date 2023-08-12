import { FirestoreOfferData } from '@echo/firestore'

export enum ButtonAction {
  BUY = 'buy',
  REJECT = 'reject'
}

export const buttonIdPrefixes = Object.values(ButtonAction)

interface ButtonData {
  action: ButtonAction
}

export interface BuyButtonData extends ButtonData {
  offer: FirestoreOfferData | undefined
}

export type ButtonWithData = BuyButtonData
