import { botLogger } from '@echo/bot/constants/bot-logger'
import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { buildListingEmbed } from '@echo/bot/listing/build-listing-embed'
import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Listing } from '@echo/model/types/listing'
import { isNil } from 'ramda'

export async function postListing(listing: Listing, listingId: string) {
  const {
    slug,
    creator: { username }
  } = listing
  const creator = await getUserByUsername(username)
  if (isNil(creator)) {
    botLogger.error({ msg: `[LISTING ${listingId}] creator ${username} not found` })
    return
  }
  await sendToEchoChannel({
    components: [buildListingLinkButton(slug)],
    embeds: [buildListingEmbed(listing, creator)]
  })
  botLogger.info({ msg: `[LISTING ${listingId}] posted to Discord` })
}
