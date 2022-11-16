import { listenToInteractions } from '@echo/bot/listeners/interaction'
import { listenToOffers } from '@echo/bot/listeners/offers'
import { discordSecret } from '@echo/discord/admin/config'
import { BaseInteraction, Client, Events, GatewayIntentBits } from 'discord.js'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
  console.log(`Listening to Firebase offers`)
  listenToOffers(c)
})

client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
  await listenToInteractions(interaction)
})

//make sure this line is the last line
client.login(discordSecret().clientToken) //login bot using token
