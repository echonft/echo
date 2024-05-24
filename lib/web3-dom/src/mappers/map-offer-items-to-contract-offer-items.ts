import type { Nft } from '@echo/model/types/nft'
import { mapOfferItemToContractOfferItem } from '@echo/web3-dom/mappers/map-offer-item-to-contract-offer-item'
import type { ContractOfferItems } from '@echo/web3-dom/types/contract-offer-items'
import { map, modify } from 'ramda'

export interface MapOfferItemsToContractOfferItemsArgs {
  items: Nft[]
  chainId: number
}

export function mapOfferItemsToContractOfferItems(args: MapOfferItemsToContractOfferItemsArgs): ContractOfferItems {
  return modify('items', map(mapOfferItemToContractOfferItem))(args)
}
