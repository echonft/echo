import { captureAndLogException } from '@echo/bot/helpers/capture-and-log-exception'
import { initializeSentry } from '@echo/bot/helpers/initialize-sentry'
import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { listingChangeHandler } from '@echo/bot/listing/listing-change-handler'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { offerChangeHandler } from '@echo/bot/offer/offer-change-handler'
import { swapChangeHandler } from '@echo/bot/swap/swap-change-handler'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { listenToListings } from '@echo/firestore/services/listen-to-listings'
import { listenToOffers } from '@echo/firestore/services/listen-to-offers'
import { listenToSwaps } from '@echo/firestore/services/listen-to-swaps'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { Environment, environment } from '@echo/utils/constants/environment'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { Secret } from '@echo/utils/constants/secret'
import { echoDiscordGuild } from '@echo/utils/helpers/echo-discord-guild'
import { getBaseLogger } from '@echo/utils/services/logger'
import { getSecret } from '@echo/utils/services/secret-manager'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { otherwise, pick, pipe } from 'ramda'

global.client = new Client({ intents: [GatewayIntentBits.Guilds] })
global.logger = getBaseLogger('Bot', {
  serializers: [{ channel: pick(['id']), thread: pick(['id']) }, modelLoggerSerializers]
})
global.keepAliveTimer = setInterval(() => {
  logger.info('bot is still alive')
}, 60000)

client.once(Events.ClientReady, () => {
  listenToListings(pipe(listingChangeHandler, otherwise(captureAndLogException)))
  listenToOffers(pipe(offerChangeHandler, otherwise(captureAndLogException)))
  listenToSwaps(pipe(swapChangeHandler, otherwise(captureAndLogException)))
})

async function main() {
  await initializeFirebase()
  logger.info('firebase initialized')
  initializeSentry()
  await initializeTranslations()
  try {
    const clientToken = await getSecret(Secret.DiscordClientToken)
    await client.login(clientToken)
    logger.info({ guild: echoDiscordGuild() }, 'logged in')
    if (environment() === Environment.Development && nodeEnvironment() === NodeEnvironment.Production) {
      await sendToEchoChannel('Echo bot up and running')
    }
  } catch (err) {
    logger.fatal({ err }, 'login failed')
    process.exit(1)
  }
}

try {
  await main()
} catch (err) {
  logger.fatal({ err }, 'error while initializing')
}
