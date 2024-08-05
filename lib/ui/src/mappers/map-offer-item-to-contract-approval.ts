import type { OwnedNft } from '@echo/model/types/nft'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { applySpec, path, pipe } from 'ramda'

export function mapOfferItemToContractApproval(item: OwnedNft) {
  return applySpec<ContractApproval>({
    contract: pipe(path(['collection', 'contract'])),
    name: path(['collection', 'name']),
    wallet: path(['owner', 'wallet'])
  })(item)
}
