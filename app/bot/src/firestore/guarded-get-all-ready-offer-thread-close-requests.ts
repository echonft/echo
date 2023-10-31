import { getAllReadyOfferThreadCloseRequests } from '@echo/firestore/crud/offer-thread-close-request/get-all-ready-offer-thread-close-requests'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guardedGetAllReadyOfferThreadCloseRequests() {
  try {
    return await getAllReadyOfferThreadCloseRequests()
  } catch (e) {
    logger.error(`Error fetching all offer thread close requests: ${errorMessage(e)}`)
    return []
  }
}
