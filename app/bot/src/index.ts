import { botLogger } from '@echo/bot/constants/bot-logger'
import { client } from '@echo/bot/constants/client'
import { guardAsyncFn } from '@echo/bot/helpers/guard-async-fn'
import { initializeSentry } from '@echo/bot/helpers/initialize-sentry'
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
import { getSecret } from '@echo/utils/services/secret-manager'
import { Events } from 'discord.js'
import { equals } from 'ramda'

await initializeFirebase()
initializeSentry()
await initializeTranslations()
listenToListings((changeType, snapshot) => guardAsyncFn(listingChangeHandler)(changeType, snapshot))
listenToOffers((changeType, snapshot) => guardAsyncFn(offerChangeHandler)(changeType, snapshot))
listenToOfferUpdates((changeType, snapshot) => guardAsyncFn(offerUpdateChangeHandler)(changeType, snapshot))
listenToSwaps((changeType, snapshot) => guardAsyncFn(swapChangeHandler)(changeType, snapshot))

client.once(Events.ClientReady, (_client) => {
  void guardAsyncFn(sendToEchoChannel)('Echo bot up and running')
})

//make sure this line is the last line
const clientToken = await getSecret('DISCORD_CLIENT_TOKEN')
void client.login(clientToken) //login bot using token
botLogger.info({ msg: `Echo bot started` })
botLogger.info({ msg: `build env: ${process.env.NODE_ENV}` })
botLogger.info({ msg: `env: ${process.env.ENV}` })
botLogger.info({ msg: `network: ${equals(process.env.NEXT_PUBLIC_IS_TESTNET, '1') ? 'testnet' : 'mainnet'}` })
// Keep the process running indefinitely
process.stdin.resume()
