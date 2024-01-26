import { listingLink } from '@echo/bot/listing/listing-link'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildListingLinkButton(listingId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('listing.button.label'))
      .setURL(listingLink(listingId))
      .setStyle(ButtonStyle.Link)
  )
}
