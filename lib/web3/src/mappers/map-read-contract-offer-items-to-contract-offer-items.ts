import { mapReadContractOfferItemToContractOfferItem } from '@echo/web3/mappers/map-read-contract-offer-item-to-contract-offer-item'
import type { ContractOfferItems } from '@echo/web3/types/contract-offer-items'
import type { ReadContractOfferItems } from '@echo/web3/types/read-contract-offer-items'
import { applySpec, map, pipe, prop } from 'ramda'

export function mapReadContractOfferItemsToContractOfferItems(
  readContractOfferItems: ReadContractOfferItems
): ContractOfferItems {
  return applySpec<ContractOfferItems>({
    chainId: pipe(prop('chainId'), Number),
    items: pipe(prop('items'), map(mapReadContractOfferItemToContractOfferItem))
  })(readContractOfferItems)
}
