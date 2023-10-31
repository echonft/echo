import { findOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/find-offer-thread-close-request'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guardedFindOfferThreadCloseRequest(offerThreadId: string) {
  try {
    return await findOfferThreadCloseRequest(offerThreadId)
  } catch (e) {
    logger.error(`Error fetching offer thread with id ${offerThreadId}: ${errorMessage(e)}`)
    return undefined
  }
}
