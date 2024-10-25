import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { Item } from '@echo/model/types/item'
import { mapOfferItemToContractOfferItem } from '@echo/web3/mappers/map-offer-item-to-contract-offer-item'
import type { ContractOfferItems } from '@echo/web3/types/contract-offer-items'
import { applySpec, head, map, type NonEmptyArray, path, pipe } from 'ramda'

export function mapOfferItemsToContractOfferItems(items: NonEmptyArray<Item>): ContractOfferItems {
  return applySpec<ContractOfferItems>({
    chainId: pipe(head, path<Item, 'token', 'contract', 'chain'>(['token', 'contract', 'chain']), chainId),
    items: map(mapOfferItemToContractOfferItem)
  })(items)
}
