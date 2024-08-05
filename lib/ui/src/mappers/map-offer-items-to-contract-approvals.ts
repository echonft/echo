import type { OwnedNft } from '@echo/model/types/nft'
import { mapOfferItemToContractApproval } from '@echo/ui/mappers/map-offer-item-to-contract-approval'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { map, type NonEmptyArray, pipe, uniq } from 'ramda'

export function mapOfferItemsToContractApprovals(items: NonEmptyArray<OwnedNft>) {
  return pipe<[NonEmptyArray<OwnedNft>], ContractApproval[], ContractApproval[]>(
    map(mapOfferItemToContractApproval),
    uniq<ContractApproval>
  )(items)
}
