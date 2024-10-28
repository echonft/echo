import type { Listing } from '@echo/model/types/listing'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildListingLinkButton(listing: Listing) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('listing.button'))
      .setURL(
        pathProvider.collection.default.withQuery({ listing: listing }).getUrl({ slug: listing.target.collection.slug })
      )
      .setStyle(ButtonStyle.Link)
  )
}
