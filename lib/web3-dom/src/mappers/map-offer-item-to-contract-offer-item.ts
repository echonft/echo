import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { formatAddress } from '@echo/web3/helpers/format-address'
import type { ContractOfferItem } from '@echo/web3-dom/types/contract-offer-item'
import { applySpec, path, pipe, prop } from 'ramda'

export function mapOfferItemToContractOfferItem(item: Nft): ContractOfferItem {
  return applySpec<ContractOfferItem>({
    tokenAddress: pipe(nonNullableReturn(path(['collection', 'contract'])), formatAddress),
    tokenId: prop('tokenId')
  })(item)
}
