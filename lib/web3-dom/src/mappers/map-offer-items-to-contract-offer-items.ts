import type { OfferItem } from '@echo/model/types/offer-item'
import { mapOfferItemToContractOfferItem } from '@echo/web3-dom/mappers/map-offer-item-to-contract-offer-item'
import type { ContractOfferItems } from '@echo/web3-dom/types/contract-offer-items'
import { map, modify } from 'ramda'

export interface MapOfferItemsToContractOfferItemsArgs {
  items: OfferItem[]
  chainId: number
}

export function mapOfferItemsToContractOfferItems(args: MapOfferItemsToContractOfferItemsArgs): ContractOfferItems {
  return modify('items', map(mapOfferItemToContractOfferItem))(args)
}
