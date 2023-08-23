import { OfferItem } from '../types/offer-item'
import { Wallet } from '../types/wallet'
import { head, path, pipe } from 'ramda'

export function getOfferItemsWallet(offerItems: OfferItem[]) {
  return pipe(head, path(['nft', 'owner', 'wallet']))(offerItems) as Wallet
}
