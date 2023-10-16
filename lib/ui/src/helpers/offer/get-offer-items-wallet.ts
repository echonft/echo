import type { OfferItem } from '@echo/model/types/offer-item'
import type { Wallet } from '@echo/model/types/wallet'
import { head, path, pipe } from 'ramda'

export function getOfferItemsWallet(offerItems: OfferItem[]) {
  return pipe(head, path(['nft', 'owner', 'wallet']))(offerItems) as Wallet
}
