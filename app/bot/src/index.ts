import { getDiscordClientToken } from '@echo/bot/helpers/get-discord-client-token'
import { listenToListings } from '@echo/bot/listing/listen-to-listings'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { listenToOfferUpdates } from '@echo/bot/offer/listen-to-offer-updates'
import { listenToOffers } from '@echo/bot/offer/listen-to-offers'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { initializeSentry } from '@echo/sentry/initialize-sentry'
import { logger } from '@echo/utils/services/logger'
import { Client, Events, GatewayIntentBits } from 'discord.js'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client

client.once(Events.ClientReady, async (client) => {
  initializeSentry('https://3b3f89c8f90990e4b35f5e194d109300@o4506149604098048.ingest.sentry.io/4506185901932544')
  initializeFirebase()
  await initializeTranslations()
  listenToListings(client)
  listenToOffers(client)
  listenToOfferUpdates(client)
  logger.debug(`Ready! Logged in as ${client.user.tag}`)
})

//make sure this line is the last line
void client.login(getDiscordClientToken()) //login bot using token
