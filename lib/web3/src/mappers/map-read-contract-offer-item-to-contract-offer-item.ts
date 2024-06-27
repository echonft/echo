import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import type { ReadContractOfferItem } from '@echo/web3/types/read-contract-offer-item'
import { applySpec, pipe, prop } from 'ramda'

export function mapReadContractOfferItemToContractOfferItem(
  readContractOfferItem: ReadContractOfferItem
): ContractOfferItem {
  return applySpec({ tokenAddress: prop('tokenAddress'), tokenId: pipe(prop('tokenId', Number)) })(
    readContractOfferItem
  )
}
