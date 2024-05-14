import type { OfferItem } from '@echo/model/types/offer-item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { formatAddress } from '@echo/web3/helpers/format-address'
import type { ContractOfferItem } from '@echo/web3-dom/types/contract-offer-item'
import { applySpec, path, pipe } from 'ramda'

export function mapOfferItemToContractOfferItem(offerItem: OfferItem): ContractOfferItem {
  return applySpec<ContractOfferItem>({
    tokenAddress: pipe(nonNullableReturn(path(['nft', 'collection', 'contract'])), formatAddress),
    tokenId: path(['nft', 'tokenId'])
  })(offerItem)
}
