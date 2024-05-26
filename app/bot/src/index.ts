import { client } from '@echo/bot/constants/client'
import { getDiscordClientToken } from '@echo/bot/helpers/get-discord-client-token'
import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { listingChangeHandler } from '@echo/bot/listing/listing-change-handler'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { offerChangeHandler } from '@echo/bot/offer/offer-change-handler'
import { offerUpdateChangeHandler } from '@echo/bot/offer/offer-update-change-handler'
import { swapChangeHandler } from '@echo/bot/swap/swap-change-handler'
import { listenToListings } from '@echo/firestore/listeners/listen-to-listings'
import { listenToOfferUpdates } from '@echo/firestore/listeners/listen-to-offer-updates'
import { listenToOffers } from '@echo/firestore/listeners/listen-to-offers'
import { listenToSwaps } from '@echo/firestore/listeners/listen-to-swaps'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { guardAsyncFn } from '@echo/sentry/guard-async-fn'
import { initializeSentry } from '@echo/sentry/initialize-sentry'
import { Events } from 'discord.js'

// eslint-disable-next-line @typescript-eslint/no-misused-promises
client.once(Events.ClientReady, async (_client) => {
  initializeSentry('https://3b3f89c8f90990e4b35f5e194d109300@o4506149604098048.ingest.sentry.io/4506185901932544')
  initializeFirebase()
  await initializeTranslations()
  listenToListings((changeType, snapshot) => guardAsyncFn(listingChangeHandler)(changeType, snapshot))
  listenToOffers((changeType, snapshot) => guardAsyncFn(offerChangeHandler)(changeType, snapshot))
  listenToOfferUpdates((changeType, snapshot) => guardAsyncFn(offerUpdateChangeHandler)(changeType, snapshot))
  listenToSwaps((changeType, snapshot) => guardAsyncFn(swapChangeHandler)(changeType, snapshot))
  await guardAsyncFn(sendToEchoChannel)('Echo bot up and running')
})

//make sure this line is the last line
void client.login(getDiscordClientToken()) //login bot using token
