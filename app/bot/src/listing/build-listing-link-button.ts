import type { Listing } from '@echo/model/types/listing'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildListingLinkButton(listing: Listing) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('listing.button'))
      .setURL(frontendRoutes.listing.details.getUrl({ slug: listing.slug }))
      .setStyle(ButtonStyle.Link)
  )
}
