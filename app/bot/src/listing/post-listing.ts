import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { buildListingEmbed } from '@echo/bot/listing/build-listing-embed'
import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Listing } from '@echo/model/types/listing'
import { isNil } from 'ramda'

export async function postListing(listing: Listing) {
  const {
    id: listingId,
    creator: { username }
  } = listing
  const creator = await getUserByUsername(username)
  if (isNil(creator)) {
    throw Error(`listing creator with username ${username} not found`)
  }
  await sendToEchoChannel({
    components: [buildListingLinkButton(listingId)],
    embeds: [buildListingEmbed(listing, creator)]
  })
}
