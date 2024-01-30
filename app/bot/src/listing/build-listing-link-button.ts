import { linkProvider } from '@echo/api/routing/link-provider'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildListingLinkButton(listingId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('listing.button'))
      .setURL(linkProvider.listing.details.getUrl({ listingId }))
      .setStyle(ButtonStyle.Link)
  )
}
