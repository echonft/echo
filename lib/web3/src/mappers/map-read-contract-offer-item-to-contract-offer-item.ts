import { formatAddress } from '@echo/web3/helpers/format-address'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import type { ReadContractOfferItem } from '@echo/web3/types/read-contract-offer-item'
import { applySpec, pipe, prop, toLower } from 'ramda'

export function mapReadContractOfferItemToContractOfferItem(
  readContractOfferItem: ReadContractOfferItem
): ContractOfferItem {
  // FIXME Typing
  return applySpec({
    tokenAddress: pipe(prop('tokenAddress'), formatAddress, toLower),
    tokenId: pipe(prop('tokenId'), Number)
  })(readContractOfferItem)
}
