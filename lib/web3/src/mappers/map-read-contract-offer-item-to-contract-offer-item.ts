import type { HexString } from '@echo/utils/types/hex-string'
import { formatAddress } from '@echo/web3/helpers/format-address'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import type { ReadContractOfferItem } from '@echo/web3/types/read-contract-offer-item'
import { applySpec, pipe, prop, toLower } from 'ramda'

export function mapReadContractOfferItemToContractOfferItem(
  readContractOfferItem: ReadContractOfferItem
): ContractOfferItem {
  return applySpec({
    tokenAddress: pipe(prop('tokenAddress'), formatAddress, toLower<HexString>),
    tokenId: pipe(prop('tokenId'), Number)
  })(readContractOfferItem)
}
