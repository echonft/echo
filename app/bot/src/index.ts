import { listenToInteractions } from './listeners/interaction'
import { listenToOffers } from './listeners/offers'
import { discordSecret } from '@echo/discord'
import { errorMessage, logger } from '@echo/utils'
import { BaseInteraction, Client, Events, GatewayIntentBits } from 'discord.js'
import { isEmpty, isNil } from 'rambda'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client

client.once(Events.ClientReady, (c) => {
  logger.info(`Ready! Logged in as ${c.user.tag}`)
  logger.info(`Listening to Firebase offers`)
  listenToOffers(c)
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
void client.login(discordSecret.clientToken) //login bot using token
