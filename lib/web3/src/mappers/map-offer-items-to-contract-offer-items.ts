import type { Nft } from '@echo/model/types/nft/nft'
import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { mapOfferItemToContractOfferItem } from '@echo/web3/mappers/map-offer-item-to-contract-offer-item'
import type { ContractOfferItems } from '@echo/web3/types/contract-offer-items'
import { applySpec, head, map, path, pipe } from 'ramda'

export function mapOfferItemsToContractOfferItems(items: Nft[]): ContractOfferItems {
  return applySpec<ContractOfferItems>({
    chainId: pipe(head, path<Nft, 'collection', 'contract', 'chain'>(['collection', 'contract', 'chain']), getChainId),
    items: map(mapOfferItemToContractOfferItem)
  })(items)
}
