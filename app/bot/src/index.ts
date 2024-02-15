import { getDiscordClientToken } from '@echo/bot/helpers/get-discord-client-token'
import { sendToChannel } from '@echo/bot/helpers/send-to-channel'
import { listenToListings } from '@echo/bot/listing/listen-to-listings'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { listenToOfferUpdates } from '@echo/bot/offer/listen-to-offer-updates'
import { listenToOffers } from '@echo/bot/offer/listen-to-offers'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { guardAsyncFn } from '@echo/sentry/guard-async-fn'
import { initializeSentry } from '@echo/sentry/initialize-sentry'
import { logger } from '@echo/utils/services/logger'
import { listenToEchoTrades } from '@echo/web3/helpers/viem/listen-to-echo-trades'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { isNotNil } from 'ramda'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client

client.once(Events.ClientReady, async (client) => {
  initializeSentry('https://3b3f89c8f90990e4b35f5e194d109300@o4506149604098048.ingest.sentry.io/4506185901932544')
  initializeFirebase()
  await initializeTranslations()
  listenToListings(client)
  listenToOffers(client)
  listenToOfferUpdates(client)
  listenToEchoTrades(
    guardAsyncFn(async function (offerId: string, transactionId: string) {
      logger.info(`trade executed: offerId ${offerId} transactionId ${transactionId}`)
      const offer = await findOfferById(offerId)
      if (isNotNil(offer)) {
        await completeOffer({
          offerId,
          transactionId,
          updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
        })
      }
    })
  )
  logger.debug(`Ready! Logged in as ${client.user.tag}`)
  const echoGuildChannelId = process.env.ECHO_DISCORD_GUILD_CHANNEL_ID
  await sendToChannel(client, echoGuildChannelId, 'Echo bot up and running')
})

//make sure this line is the last line
void client.login(getDiscordClientToken()) //login bot using token
