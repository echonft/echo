import { captureAndLogException } from '@echo/bot/helpers/capture-and-log-exception'
import { initializeSentry } from '@echo/bot/helpers/initialize-sentry'
import { listingChangeHandler } from '@echo/bot/listing/listing-change-handler'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { offerChangeHandler } from '@echo/bot/offer/offer-change-handler'
import { swapChangeHandler } from '@echo/bot/swap/swap-change-handler'
import { listenToListings } from '@echo/firestore/listeners/listen-to-listings'
import { listenToOffers } from '@echo/firestore/listeners/listen-to-offers'
import { listenToSwaps } from '@echo/firestore/listeners/listen-to-swaps'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { Secret } from '@echo/utils/constants/secret'
import { echoDiscordGuild } from '@echo/utils/helpers/echo-discord-guild'
import { getBaseLogger } from '@echo/utils/services/logger'
import { getSecret } from '@echo/utils/services/secret-manager'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { assoc, otherwise, pick, pipe } from 'ramda'

global.client = new Client({ intents: [GatewayIntentBits.Guilds] })
logger = getBaseLogger('Bot', {
  hideNetwork: true,
  serializers: [{ channel: pick(['id']), thread: pick(['id']) }, modelLoggerSerializers]
})
global.keepAliveTimer = setInterval(() => {
  logger.info('bot is still alive')
}, 60000)

client.once(Events.ClientReady, (client) => {
  listenToListings(pipe(assoc('client', client), listingChangeHandler, otherwise(captureAndLogException)))
  listenToOffers(pipe(assoc('client', client), offerChangeHandler, otherwise(captureAndLogException)))
  listenToSwaps(pipe(assoc('client', client), swapChangeHandler, otherwise(captureAndLogException)))
})

async function main() {
  await initializeFirebase()
  logger.info('firebase initialized')
  initializeSentry()
  await initializeTranslations()
  // Login to Discord with your client's token
  try {
    const clientToken = await getSecret(Secret.DiscordClientToken)
    await client.login(clientToken)
    logger.info({ guild: echoDiscordGuild() }, 'logged in')
  } catch (err) {
    logger.fatal({ err }, 'login failed')
    process.exit(1)
  }
}

// Run the main function
try {
  await main()
} catch (err) {
  logger.fatal({ err }, 'error while initializing')
}
