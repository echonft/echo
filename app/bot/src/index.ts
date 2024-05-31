import { client } from '@echo/bot/constants/client'
import { getDiscordClientToken } from '@echo/bot/helpers/get-discord-client-token'
import { guardAsyncFn } from '@echo/bot/helpers/guard-async-fn'
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
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { Events } from 'discord.js'

// eslint-disable-next-line @typescript-eslint/no-misused-promises
client.once(Events.ClientReady, async (_client) => {
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
pinoLogger.info(`Bot started`)
pinoLogger.info(`Guild: ${process.env.ECHO_DISCORD_GUILD_ID}`)
pinoLogger.info(`Channel: ${process.env.ECHO_DISCORD_GUILD_CHANNEL_ID}`)
