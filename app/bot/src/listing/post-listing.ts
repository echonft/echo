import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { botLogger } from '@echo/bot/index'
import { buildListingEmbed } from '@echo/bot/listing/build-listing-embed'
import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Listing } from '@echo/model/types/listing'
import type { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function postListing(client: Client, listing: Listing & Record<'id', string>) {
  const {
    slug,
    creator: { username }
  } = listing
  const creator = await getUserByUsername(username)
  if (isNil(creator)) {
    botLogger.error({ listing }, `creator not found`)
    return
  }
  await sendToEchoChannel(client, {
    components: [buildListingLinkButton(slug)],
    embeds: [buildListingEmbed(listing, creator)]
  })
  botLogger.info({ listing }, 'listing posted to Discord')
}
