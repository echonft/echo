import type { OfferItem } from '@echo/ui/types/model/offer-item'
import type { Wallet } from '@echo/ui/types/model/wallet'
import { head, path, pipe } from 'ramda'

export function getOfferItemsWallet(offerItems: OfferItem[]) {
  return pipe(head, path(['nft', 'owner', 'wallet']))(offerItems) as Wallet
}
