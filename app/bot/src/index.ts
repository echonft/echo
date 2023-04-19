import { listenToInteractions } from './listeners/interaction'
import { listenToListings } from './listeners/listings'
import { getDiscordSecret } from '@echo/discord'
import { errorMessage, logger } from '@echo/utils'
import { BaseInteraction, Client, Events, GatewayIntentBits } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client

client.once(Events.ClientReady, (c) => {
  logger.info(`Ready! Logged in as ${c.user.tag}`)
  listenToListings(c)
  logger.info(`Listening to Firebase listings`)
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
