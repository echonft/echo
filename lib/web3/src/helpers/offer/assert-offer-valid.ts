import type { Offer } from '@echo/model/types/offer'
import { assertOfferItemsApproval } from '@echo/web3/helpers/offer/assert-offer-items-approval'
import { assertOfferItemsOwnership } from '@echo/web3/helpers/offer/assert-offer-items-ownership'
import type { OfferValidResult } from '@echo/web3/types/offer-valid-result'
import { isNil } from 'ramda'

export async function assertOfferValid(offer: Offer): Promise<OfferValidResult> {
  const approvalResult = await assertOfferItemsApproval(offer)
  if (!isNil(approvalResult.error)) {
    return approvalResult
  }
  return await assertOfferItemsOwnership(offer)
}
