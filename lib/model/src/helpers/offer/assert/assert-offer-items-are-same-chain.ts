import type { OfferItem } from '@echo/model/types/offer-item'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { all, pathEq } from 'ramda'

export function assertOfferItemsAreSameChain(offerItems: OfferItem[]) {
  if (isNilOrEmpty(offerItems)) {
    throw Error('offerItems cannot be nil or empty')
  }
  const chainId = offerItems[0]!.nft.collection.contract.chainId
  if (!all(pathEq(chainId, ['nft', 'collection', 'contract', 'chainId']))(offerItems)) {
    throw Error('offerItems are not all from the same chain')
  }
}
