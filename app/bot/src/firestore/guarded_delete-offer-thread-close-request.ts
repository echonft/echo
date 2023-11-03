import { deleteOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/delete-offer-thread-close-request'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guarded_deleteOfferThreadCloseRequest(id: string) {
  try {
    await deleteOfferThreadCloseRequest(id)
  } catch (e) {
    logger.error(`Error deleting offer thread close request ${id}: ${errorMessage(e)}`)
  }
}
