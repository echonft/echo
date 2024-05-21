import type { OfferItem } from '@echo/model/types/offer-item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { OfferItemAbi } from '@echo/web3/types/offer-item-abi'
import { applySpec, path } from 'ramda'

export function mapOfferItemToAbiParams(offerItem: OfferItem): OfferItemAbi {
  return applySpec({
    tokenAddress: nonNullableReturn(path(['nft', 'collection', 'contract', 'address'])),
    tokenId: nonNullableReturn(path(['nft', 'tokenId']))
  })(offerItem)
}
