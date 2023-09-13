import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'

export enum ButtonAction {
  BUY = 'buy',
  REJECT = 'reject'
}

export const buttonIdPrefixes = Object.values(ButtonAction)

interface ButtonData {
  action: ButtonAction
}

export interface BuyButtonData extends ButtonData {
  offer: FirestoreOffer | undefined
}

export type ButtonWithData = BuyButtonData
