import { client } from '@echo/bot/constants/client'
import { getDiscordClientToken } from '@echo/bot/helpers/get-discord-client-token'
import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { listingChangeHandler } from '@echo/bot/listing/listing-change-handler'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { offerChangeHandler } from '@echo/bot/offer/offer-change-handler'
import { offerUpdateChangeHandler } from '@echo/bot/offer/offer-update-change-handler'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { listenToListings } from '@echo/firestore/listeners/listen-to-listings'
import { listenToOfferUpdates } from '@echo/firestore/listeners/listen-to-offer-updates'
import { listenToOffers } from '@echo/firestore/listeners/listen-to-offers'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { guardAsyncFn } from '@echo/sentry/guard-async-fn'
import { initializeSentry } from '@echo/sentry/initialize-sentry'
import { logger } from '@echo/utils/services/logger'
import { listenToEchoTrades } from '@echo/web3/helpers/viem/listen-to-echo-trades'
import { Events } from 'discord.js'
import { isNil } from 'ramda'

client.once(Events.ClientReady, async (_client) => {
  initializeSentry('https://3b3f89c8f90990e4b35f5e194d109300@o4506149604098048.ingest.sentry.io/4506185901932544')
  initializeFirebase()
  await initializeTranslations()
  listenToListings((changeType, listing) => guardAsyncFn(listingChangeHandler)(changeType, listing))
  listenToOffers((changeType, offer) => guardAsyncFn(offerChangeHandler)(changeType, offer))
  listenToOfferUpdates((changeType, update) => guardAsyncFn(offerUpdateChangeHandler)(changeType, update))
  listenToEchoTrades(
    guardAsyncFn(async function (offerId: string, transactionId: string) {
      logger.info(`trade executed: offer ${offerId} transaction ${transactionId}`)
      const offer = await findOfferById(offerId)
      if (isNil(offer)) {
        logger.error(`received trade executed for offer ${offerId} but the offer does not exist`)
        return
      }
      await completeOffer({
        offerId,
        transactionId,
        updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
      })
      logger.info(`succesfully completed offer ${offerId} transaction ${transactionId}`)
    })
  )
  await guardAsyncFn(sendToEchoChannel)('Echo bot up and running')
})

//make sure this line is the last line
void client.login(getDiscordClientToken()) //login bot using token
