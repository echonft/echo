import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import {
  OFFER_STATE_UPDATE_TRIGGER_REASON_APPROVAL_REVOKED,
  OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED
} from '@echo/firestore/constants/offer/offer-state-update-trigger-reasons'
// eslint-disable-next-line camelcase
import { unchecked_cancelOffer } from '@echo/firestore/crud/offer/unchecked_cancel-offer'
import type { Offer } from '@echo/model/types/offer'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import { assertOfferValid } from '@echo/web3/helpers/offer/assert-offer-valid'

export async function validateOffer(offer: Offer, logger?: LoggerInterface): Promise<Offer> {
  const result = await assertOfferValid(offer, logger)
  if (result.valid) {
    return offer
  }
  logger?.warn(`offer ${offer.slug} is invalid: ${result.reason}`)
  try {
    const cancelledOffer = await unchecked_cancelOffer({
      slug: offer.slug,
      updateArgs: {
        trigger: {
          by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM,
          reason:
            result.reason === 'approval-revoked'
              ? OFFER_STATE_UPDATE_TRIGGER_REASON_APPROVAL_REVOKED
              : OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED
        }
      }
    })
    logger?.info(`offer ${offer.slug} cancelled`)
    return cancelledOffer
  } catch (e) {
    logger?.error(`error cancelling offer ${offer.slug}: ${errorMessage(e)}`)
    return offer
  }
}
