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
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import { getBaseLogger } from '@echo/utils/services/logger'
import { getSecret } from '@echo/utils/services/secret-manager'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { assoc, isNil, otherwise, pick, pipe } from 'ramda'

global.client = new Client({ intents: [GatewayIntentBits.Guilds] })
global.logger = getBaseLogger('Bot', {
  hideNetwork: true,
  serializers: [{ channel: pick(['id']), thread: pick(['id']) }, modelLoggerSerializers]
})
global.keepAliveTimer = setInterval(() => {
  global.logger.info('bot is still alive')
}, 60000)

client.once(Events.ClientReady, (client) => {
  listenToListings(
    pipe(
      assoc('client', client),
      assoc('logger', global.logger),
      listingChangeHandler,
      otherwise(captureAndLogException)
    )
  )
  listenToOffers(
    pipe(assoc('client', client), assoc('logger', global.logger), offerChangeHandler, otherwise(captureAndLogException))
  )
  listenToSwaps(
    pipe(assoc('client', client), assoc('logger', global.logger), swapChangeHandler, otherwise(captureAndLogException))
  )
})

async function main() {
  await initializeFirebase({ logger: global.logger })
  global.logger.info('firebase initialized')
  initializeSentry()
  await initializeTranslations()
  const clientToken = await getSecret({ name: 'DISCORD_CLIENT_TOKEN', logger: global.logger })
  if (isNil(clientToken)) {
    global.logger.error('DISCORD_CLIENT_TOKEN is not set')
    process.exit(1)
  }
  // Login to Discord with your client's token
  try {
    await client.login(clientToken)
    global.logger.info({ guild: getEchoDiscordGuild() }, 'logged in')
  } catch (err) {
    global.logger.fatal({ err }, 'login failed')
  }
}

// Run the main function
try {
  await main()
} catch (err) {
  global.logger.fatal({ err }, 'error while initializing')
}
