import { getOfferGuilds } from '@echo/firestore/helpers/offer/get-offer-guilds'
import type { Offer } from '@echo/model/types/offer'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guarded_getOfferGuilds(offer: Offer) {
  try {
    return await getOfferGuilds(offer)
  } catch (e) {
    logger.error(`Error fetching items guilds for offer ${offer.id}: ${errorMessage(e)}`)
    return []
  }
}
