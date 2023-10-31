import { DEFAULT_THREAD_CLOSE_DELAY } from '@echo/bot/constants/default-thread-close-delay'
import { listenToInteractions } from '@echo/bot/helpers/listen-to-interactions'
import { listenToListings } from '@echo/bot/listing/listen-to-listings'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { flushOfferThreadCloseRequests } from '@echo/bot/offer/flush-offer-thread-close-requests'
import { listenToOffers } from '@echo/bot/offer/listen-to-offers'
import { getDiscordSecret } from '@echo/discord/admin/get-discord-secret'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { BaseInteraction, Client, Events, GatewayIntentBits } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client
const flushOfferThreadCloseRequestsInterval = setInterval(
  (client: Client) => {
    void flushOfferThreadCloseRequests(client)
  },
  (DEFAULT_THREAD_CLOSE_DELAY / 2) * 60 * 60 * 1000,
  client
)

client.once(Events.ClientReady, async (client) => {
  initializeFirebase()
  await initializeTranslations()
  logger.info(`Ready! Logged in as ${client.user.tag}`)
  listenToListings(client)
  logger.info(`Listening to Firebase listings`)
  listenToOffers(client)
  logger.info(`Listening to Firebase offers`)
  flushOfferThreadCloseRequestsInterval.ref()
})

client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
  try {
    await listenToInteractions(interaction)
  } catch (error) {
    const { type, channelId, user } = interaction
    logger.error(
      `Error responding to interaction ${type}${
        isNil(channelId) || isEmpty(channelId) ? '' : ` in channel ${channelId}`
      } for user ${user.id}: ${errorMessage(error)}`
    )
  }
})

//make sure this line is the last line
void client.login(getDiscordSecret().clientToken) //login bot using token
