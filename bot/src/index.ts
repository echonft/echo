import { listenToInteractions } from './listeners/interaction'
import { listenToOffers } from './listeners/offers'
import { discordSecret } from '@echo/discord/admin/config'
import { BaseInteraction, Client, Events, GatewayIntentBits } from 'discord.js'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
  console.log(`Listening to Firebase offers`)
  listenToOffers(c)
})

client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
  try {
    await listenToInteractions(interaction)
  } catch (error) {
    console.error(`Error responding to interaction ${interaction.toJSON()}: ${(error as Error).message}`)
  }
})

//make sure this line is the last line
client.login(discordSecret().clientToken) //login bot using token
