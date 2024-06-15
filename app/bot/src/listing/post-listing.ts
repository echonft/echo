import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { buildListingEmbed } from '@echo/bot/listing/build-listing-embed'
import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Listing } from '@echo/model/types/listing'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { Client } from 'discord.js'
import { isNil } from 'ramda'

interface PostListingArgs extends WithLogger {
  client: Client
  listing: Listing & Record<'id', string>
}

export async function postListing(args: PostListingArgs) {
  const { client, listing, logger } = args
  const {
    slug,
    creator: { username }
  } = listing
  const creator = await getUserByUsername(username)
  if (isNil(creator)) {
    logger?.error({ listing }, `creator not found`)
    return
  }
  await sendToEchoChannel({
    client,
    payload: {
      components: [buildListingLinkButton(slug)],
      embeds: [buildListingEmbed(listing, creator)]
    },
    logger
  })
  logger?.info({ listing }, 'listing posted to Discord')
}
