import type { Nft } from '@echo/model/types/nft/nft'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import { applySpec, path, prop } from 'ramda'

export function mapOfferItemToContractOfferItem(item: Nft): ContractOfferItem {
  return applySpec<ContractOfferItem>({
    tokenAddress: path(['collection', 'contract', 'address']),
    tokenId: prop('tokenId')
  })(item)
}
