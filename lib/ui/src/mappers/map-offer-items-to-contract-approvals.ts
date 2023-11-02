import type { OfferItem } from '@echo/model/types/offer-item'
import { mapOfferItemToContractApproval } from '@echo/ui/mappers/map-offer-item-to-contract-approval'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { map, pipe, uniq } from 'ramda'

export function mapOfferItemsToContractApprovals(offerItems: OfferItem[]) {
  return pipe<[OfferItem[]], ContractApproval[], ContractApproval[]>(
    map<OfferItem, ContractApproval>(mapOfferItemToContractApproval),
    uniq<ContractApproval>
  )(offerItems)
}
