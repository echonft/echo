import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guardedAddOfferStateUpdate(offerId: string) {
  try {
    await addOfferStateUpdate(offerId)
  } catch (e) {
    logger.error(`Error adding state update for offer ${offerId}: ${errorMessage(e)}`)
  }
}
