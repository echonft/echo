import { DEFAULT_THREAD_CLOSE_DELAY } from '@echo/bot/constants/default-thread-close-delay'
import { getDiscordClientToken } from '@echo/bot/helpers/get-discord-client-token'
import { listenToListings } from '@echo/bot/listing/listen-to-listings'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { flushOfferThreadCloseRequests } from '@echo/bot/offer/flush-offer-thread-close-requests'
import { listenToOfferUpdates } from '@echo/bot/offer/listen-to-offer-updates'
import { listenToOffers } from '@echo/bot/offer/listen-to-offers'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { guardAsyncFn } from '@echo/sentry/guard-async-fn'
import { initializeSentry } from '@echo/sentry/initialize-sentry'
import { logger } from '@echo/utils/services/logger'
import { CronJob } from 'cron'
import { Client, Events, GatewayIntentBits } from 'discord.js'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client

CronJob.from({
  cronTime: `* * */${DEFAULT_THREAD_CLOSE_DELAY} * *`,
  onTick: function () {
    logger.info(`starting flushOfferThreadCloseRequests`)
    void guardAsyncFn(flushOfferThreadCloseRequests)(client)
  },
  start: true,
  timeZone: 'America/New_York'
})

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
