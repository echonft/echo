import { DEFAULT_THREAD_CLOSE_DELAY } from '@echo/bot/constants/default-thread-close-delay'
import { guardAsyncFn } from '@echo/bot/errors/guard-async-fn'
import { getDiscordClientToken } from '@echo/bot/helpers/get-discord-client-token'
import { listenToInteractions } from '@echo/bot/helpers/listen-to-interactions'
import { listenToListings } from '@echo/bot/listing/listen-to-listings'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { flushOfferThreadCloseRequests } from '@echo/bot/offer/flush-offer-thread-close-requests'
import { listenToOfferUpdates } from '@echo/bot/offer/listen-to-offer-updates'
import { listenToOffers } from '@echo/bot/offer/listen-to-offers'
import { initializeSentry } from '@echo/bot/services/initialize-sentry'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { logger } from '@echo/utils/services/logger'
import { CronJob } from 'cron'
import { Client, Events, GatewayIntentBits } from 'discord.js'

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) //create new client

CronJob.from({
  cronTime: `* * */${DEFAULT_THREAD_CLOSE_DELAY} * *`,
  onTick: function () {
    logger.info(`starting flushOfferThreadCloseRequests`)
    void guardAsyncFn(flushOfferThreadCloseRequests, void 0)(client)
  },
  start: true,
  timeZone: 'America/New_York'
})

client.once(Events.ClientReady, async (client) => {
  initializeSentry()
  initializeFirebase()
  await initializeTranslations()
  listenToListings(client)
  listenToOffers(client)
  listenToOfferUpdates(client)
  logger.debug(`Ready! Logged in as ${client.user.tag}`)
})

client.on(Events.InteractionCreate, listenToInteractions)

//make sure this line is the last line
void client.login(getDiscordClientToken()) //login bot using token
