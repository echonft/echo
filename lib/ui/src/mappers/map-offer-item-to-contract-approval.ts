import type { OfferItem } from '@echo/model/types/offer-item'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { applySpec, F, path } from 'ramda'

export function mapOfferItemToContractApproval(offerItem: OfferItem) {
  return applySpec<ContractApproval>({
    approved: F,
    contract: path(['nft', 'collection', 'contract']),
    name: path(['nft', 'collection', 'name']),
    wallet: path(['nft', 'owner', 'wallet'])
  })(offerItem)
}
