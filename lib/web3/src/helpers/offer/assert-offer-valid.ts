import type { Offer } from '@echo/model/types/offer'
import { assertOfferItemsApproval } from '@echo/web3/helpers/offer/assert-offer-items-approval'
import { assertOfferItemsOwnership } from '@echo/web3/helpers/offer/assert-offer-items-ownership'
import type { OfferValidResult } from '@echo/web3/types/offer-valid-result'

export async function assertOfferValid(offer: Offer): Promise<OfferValidResult> {
  const approved = await assertOfferItemsApproval(offer)
  if (!approved) {
    return {
      valid: false,
      reason: 'approval-revoked'
    }
  }
  const ownershipValid = await assertOfferItemsOwnership(offer)
  if (!ownershipValid) {
    return {
      valid: false,
      reason: 'ownership-changed'
    }
  }
  return { valid: true }
}
