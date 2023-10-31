import { findOfferThreadById } from '@echo/firestore/crud/offer-thread/find-offer-thread-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guardedFindOfferThreadById(offerThreadId: string) {
  try {
    return await findOfferThreadById(offerThreadId)
  } catch (e) {
    logger.error(`Error fetching thread ${offerThreadId}: ${errorMessage(e)}`)
    return undefined
  }
}
