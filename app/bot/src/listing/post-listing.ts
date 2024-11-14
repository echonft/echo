import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { buildListingEmbed } from '@echo/bot/listing/build-listing-embed'
import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Listing } from '@echo/model/types/listing'
import { isNil } from 'ramda'

export async function postListing(listing: Listing) {
  const {
    creator: { username }
  } = listing
  const creator = await getUserByUsername(username)
  if (isNil(creator)) {
    logger.error({ listing }, 'creator not found')
    return
  }
  await sendToEchoChannel({
    components: [buildListingLinkButton(listing)],
    embeds: [buildListingEmbed(listing, creator)]
  })
  logger.info({ listing }, 'listing posted to Discord')
}
