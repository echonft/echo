import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import {
  OFFER_STATE_UPDATE_TRIGGER_REASON_APPROVAL_REVOKED,
  OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED
} from '@echo/firestore/constants/offer/offer-state-update-trigger-reasons'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { isOfferItemsApprovalValid } from '@echo/frontend/lib/helpers/offer/is-offer-items-approval-valid'
import { isOfferItemsOwnershipValid } from '@echo/frontend/lib/helpers/offer/is-offer-items-ownership-valid'
import type { Offer } from '@echo/model/types/offer'

/**
 * This function checks for the validity of an offer
 * that is, if all the items owners are still valid and,
 * if the offer has been accepted, if the receiver items have
 * all been approved.
 *
 * In case it is not valid, it cancels the offer and returns the
 * cancelled offer.
 * Otherwise, it returns the valid offer
 * @param {Offer} offer
 * @returns {Promise<Offer>}
 */
export async function validateOffer(offer: Offer) {
  if (!(await isOfferItemsApprovalValid(offer))) {
    return cancelOffer({
      offerId: offer.id,
      updateArgs: {
        trigger: {
          by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM,
          reason: OFFER_STATE_UPDATE_TRIGGER_REASON_APPROVAL_REVOKED
        }
      }
    })
  }
  if (!(await isOfferItemsOwnershipValid(offer))) {
    return cancelOffer({
      offerId: offer.id,
      updateArgs: {
        trigger: {
          by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM,
          reason: OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED
        }
      }
    })
  }
  return offer
}
