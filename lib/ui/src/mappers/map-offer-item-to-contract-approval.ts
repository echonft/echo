import type { Nft } from '@echo/model/types/nft'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { applySpec, path, pipe } from 'ramda'

export function mapOfferItemToContractApproval(offerItem: Nft) {
  return applySpec<ContractApproval>({
    contract: pipe(path(['collection', 'contract'])),
    name: path(['nft', 'collection', 'name']),
    wallet: path(['nft', 'owner', 'wallet'])
  })(offerItem)
}
