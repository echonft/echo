import type { OfferItem } from '@echo/model/types/offer-item'
import { mapOfferItemToContractOfferItem } from '@echo/web3-dom/mappers/map-offer-item-to-contract-offer-item'
import type { ContractOfferItems } from '@echo/web3-dom/types/contract-offer-items'
import { applySpec, map } from 'ramda'

export function mapOfferItemsToContractOfferItems(offerItems: OfferItem[], chainId: number): ContractOfferItems {
  return applySpec<ContractOfferItems>({
    chainId,
    offerItems: map(mapOfferItemToContractOfferItem)
  })(offerItems)
}
