import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { mapOfferItemToContractOfferItem } from '@echo/web3-dom/mappers/map-offer-item-to-contract-offer-item'
import type { ContractOfferItems } from '@echo/web3-dom/types/contract-offer-items'
import { applySpec, head, map, path, pipe } from 'ramda'

export function mapOfferItemsToContractOfferItems(items: Nft[]): ContractOfferItems {
  return applySpec<ContractOfferItems>({
    chainId: pipe(head, nonNullableReturn(path(['collection', 'contract', 'chain'])), getChainId),
    items: map(mapOfferItemToContractOfferItem)
  })(items)
}
