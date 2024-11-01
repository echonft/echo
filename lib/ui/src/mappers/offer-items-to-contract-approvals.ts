import type { OwnedNft } from '@echo/model/types/nft'
import { offerItemToContractApproval } from '@echo/ui/mappers/offer-item-to-contract-approval'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { map, type NonEmptyArray, pipe, uniq } from 'ramda'

export function offerItemsToContractApprovals(items: NonEmptyArray<OwnedNft>) {
  return pipe<[NonEmptyArray<OwnedNft>], ContractApproval[], ContractApproval[]>(
    map(offerItemToContractApproval),
    uniq<ContractApproval>
  )(items)
}
