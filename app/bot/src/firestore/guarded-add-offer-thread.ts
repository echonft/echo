import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import type { OfferThreadDiscordGuild } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guardedAddOfferThread(offerId: string, guild: OfferThreadDiscordGuild) {
  try {
    await addOfferThread(offerId, guild)
  } catch (e) {
    logger.error(`Error adding thread for offer ${offerId}: ${errorMessage(e)}`)
  }
}
