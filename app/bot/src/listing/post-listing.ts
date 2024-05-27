import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { buildListingEmbed } from '@echo/bot/listing/build-listing-embed'
import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Listing } from '@echo/model/types/listing'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

export async function postListing(listing: Listing, listingId: string) {
  const {
    slug,
    creator: { username }
  } = listing
  const creator = await getUserByUsername(username)
  if (isNil(creator)) {
    pinoLogger.error(`[LISTING ${listingId}] creator ${username} not found`)
    return
  }
  await sendToEchoChannel({
    components: [buildListingLinkButton(slug)],
    embeds: [buildListingEmbed(listing, creator)]
  })
  pinoLogger.info(`[LISTING ${listingId}] posted to Discord`)
}
