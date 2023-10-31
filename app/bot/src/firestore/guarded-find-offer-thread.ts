import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guardedFindOfferThread(offerId: string) {
  try {
    return await findOfferThread(offerId)
  } catch (e) {
    logger.error(`Error fetching thread for offer ${offerId}: ${errorMessage(e)}`)
    return undefined
  }
}
