import { DEFAULT_THREAD_CLOSE_DELAY } from '@echo/bot/constants/default-thread-close-delay'
import { addOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/add-offer-thread-close-request'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import dayjs from 'dayjs'

export async function guarded_addOfferThreadCloseRequest(offerThreadId: string) {
  try {
    await addOfferThreadCloseRequest(offerThreadId, dayjs().add(DEFAULT_THREAD_CLOSE_DELAY, 'h').unix())
  } catch (e) {
    logger.error(`Error adding close request for offer thread ${offerThreadId}: ${errorMessage(e)}`)
  }
}
