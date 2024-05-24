import type { Nft } from '@echo/model/types/nft'
import { mapOfferItemToContractApproval } from '@echo/ui/mappers/map-offer-item-to-contract-approval'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { map, pipe, uniq } from 'ramda'

export function mapOfferItemsToContractApprovals(offerItems: Nft[]) {
  return pipe<[Nft[]], ContractApproval[], ContractApproval[]>(
    map(mapOfferItemToContractApproval),
    uniq<ContractApproval>
  )(offerItems)
}
