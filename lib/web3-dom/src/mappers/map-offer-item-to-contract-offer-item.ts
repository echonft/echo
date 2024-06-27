import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import { applySpec, path, pipe, prop } from 'ramda'

export function mapOfferItemToContractOfferItem(item: Nft): ContractOfferItem {
  return applySpec<ContractOfferItem>({
    tokenAddress: pipe(nonNullableReturn(path(['collection', 'contract'])), formatWalletAddress),
    tokenId: prop('tokenId')
  })(item)
}
