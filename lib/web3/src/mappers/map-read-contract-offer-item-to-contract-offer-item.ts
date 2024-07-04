import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import type { ReadContractOfferItem } from '@echo/web3/types/read-contract-offer-item'
import { applySpec, pipe, prop, toLower } from 'ramda'

export function mapReadContractOfferItemToContractOfferItem(
  readContractOfferItem: ReadContractOfferItem
): ContractOfferItem {
  return applySpec({
    tokenAddress: pipe(prop('tokenAddress'), toLower<HexString>),
    tokenId: pipe(prop('tokenId'), Number)
  })(readContractOfferItem)
}
