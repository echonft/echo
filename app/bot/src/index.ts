import { listenToInteractions } from '@echo/bot/listeners/listen-to-interactions'
import { listenToListings } from '@echo/bot/listeners/listen-to-listings'
import { listenToOffers } from '@echo/bot/listeners/listen-to-offers'
import { getDiscordSecret } from '@echo/discord/admin/get-discord-secret'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import { BaseInteraction, Client, Events, GatewayIntentBits } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client

client.once(Events.ClientReady, (c) => {
  initializeFirebase()
  logger.info(`Ready! Logged in as ${c.user.tag}`)
  listenToListings(c)
  logger.info(`Listening to Firebase listings`)
  listenToOffers(c)
  logger.info(`Listening to Firebase offers`)
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
