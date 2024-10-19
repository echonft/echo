import type { Item } from '@echo/model/types/item/item'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import { applySpec, path } from 'ramda'

export function mapOfferItemToContractOfferItem(item: Item): ContractOfferItem {
  return applySpec<ContractOfferItem>({
    tokenAddress: path(['token', 'contract', 'address']),
    tokenId: path(['token', 'tokenId'])
  })(item)
}
