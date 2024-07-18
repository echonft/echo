import { pathProvider } from '@echo/api/routing/path-provider'
import type { Listing } from '@echo/model/types/listing'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildListingLinkButton(listing: Listing) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('listing.button'))
      .setURL(
        pathProvider.collection.listing.getUrl({ slug: listing.target.collection.slug, listingSlug: listing.slug })
      )
      .setStyle(ButtonStyle.Link)
  )
}
