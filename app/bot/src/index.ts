import { guardAsyncFn } from '@echo/bot/helpers/guard-async-fn'
import { initializeSentry } from '@echo/bot/helpers/initialize-sentry'
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
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { getBaseLogger } from '@echo/utils/services/logger'
import { getSecret } from '@echo/utils/services/secret-manager'
import type { Logger } from '@echo/utils/types/logger'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { assoc, isNil, pick, pipe } from 'ramda'

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const botLogger: Logger = getBaseLogger('Bot', {
  serializers: [{ channel: pick(['id']), thread: pick(['id']) }, modelLoggerSerializers]
})

client.once(Events.ClientReady, (client) => {
  listenToListings(pipe(assoc('client', client), assoc('logger', botLogger), guardAsyncFn(listingChangeHandler)))
  listenToOffers(pipe(assoc('client', client), assoc('logger', botLogger), guardAsyncFn(offerChangeHandler)))
  listenToOfferUpdates(
    pipe(assoc('client', client), assoc('logger', botLogger), guardAsyncFn(offerUpdateChangeHandler))
  )
  listenToSwaps(pipe(assoc('client', client), assoc('logger', botLogger), guardAsyncFn(swapChangeHandler)))
})

async function main() {
  await initializeFirebase({ logger: botLogger })
  botLogger.info('firebase initialized')
  initializeSentry()
  await initializeTranslations()
  const clientToken = await getSecret({ name: 'DISCORD_CLIENT_TOKEN', logger: botLogger })
  if (isNil(clientToken)) {
    botLogger.error('DISCORD_CLIENT_TOKEN is not set')
    process.exit(1)
  }
  // Login to Discord with your client's token
  try {
    await client.login(clientToken)
    botLogger.info('logged in')
  } catch (err) {
    botLogger.fatal({ err }, 'login failed')
  }
}

// Run the main function
try {
  await main()
} catch (err) {
  botLogger.fatal({ err }, 'error while initializing')
}
