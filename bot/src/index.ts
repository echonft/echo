import { buildBuyOfferButton } from '@builders/offer-button-builder'
import { discordConfig } from '@echo/discord/config/config'
import { listenToOffers } from '@echo/firebase/listeners/offer'
import { listenToInteractions } from '@listeners/interaction'
import { BaseInteraction, Client, Events, GatewayIntentBits } from 'discord.js'
import { isNil } from 'ramda'
import { getDiscordChannel } from 'src/utils/discord'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
  console.log(`Listening to Firebase offers`)
  listenToOffers(async (offer, change) => {
    const channel = getDiscordChannel(client, offer.collection.channelId)
    if (change.type === 'added' && isNil(offer.postedAt)) {
      await channel?.send({
        content: `New offer from <@${offer.seller.discordId}>: ${offer.selling}`,
        components: [buildBuyOfferButton(offer)],
      })
      await change.doc.ref.set({ ...change.doc.data(), postedAt: new Date().getTime() })
    }
  })
})

client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
  await listenToInteractions(interaction)
})

//make sure this line is the last line
client.login(discordConfig().clientToken) //login bot using token
