import type { Nft } from '@echo/model/types/nft'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { applySpec, path, pipe } from 'ramda'

export function mapOfferItemToContractApproval(offerItem: Nft) {
  return applySpec<ContractApproval>({
    contract: pipe(path(['collection', 'contract'])),
    name: path(['collection', 'name']),
    wallet: path(['owner', 'wallet'])
  })(offerItem)
}
