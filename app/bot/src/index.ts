import { DEFAULT_THREAD_CLOSE_DELAY } from '@echo/bot/constants/default-thread-close-delay'
import { guardAsyncFn } from '@echo/bot/errors/guard'
import { listenToInteractions } from '@echo/bot/helpers/listen-to-interactions'
import { listenToListings } from '@echo/bot/listing/listen-to-listings'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { flushOfferThreadCloseRequests } from '@echo/bot/offer/flush-offer-thread-close-requests'
import { listenToOffers } from '@echo/bot/offer/listen-to-offers'
import { initializeSentry } from '@echo/bot/services/initialize-sentry'
import { getDiscordSecret } from '@echo/discord/admin/get-discord-secret'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { logger } from '@echo/utils/services/logger'
import { Client, Events, GatewayIntentBits } from 'discord.js'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client
const flushOfferThreadCloseRequestsInterval = setInterval(
  (client: Client) => {
    void guardAsyncFn(flushOfferThreadCloseRequests, void 0)(client)
  },
  (DEFAULT_THREAD_CLOSE_DELAY / 2) * 60 * 60 * 1000,
  client
)

client.once(Events.ClientReady, async (client) => {
  initializeSentry()
  initializeFirebase()
  await initializeTranslations()
  listenToListings(client)
  listenToOffers(client)
  flushOfferThreadCloseRequestsInterval.ref()
  logger.debug(`Ready! Logged in as ${client.user.tag}`)
})

client.on(Events.InteractionCreate, listenToInteractions)

//make sure this line is the last line
void client.login(getDiscordSecret().clientToken) //login bot using token
