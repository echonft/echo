import { pathProvider } from '@echo/api/routing/path-provider'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildListingLinkButton(slug: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('listing.button'))
      .setURL(pathProvider.listing.details.getUrl({ slug }))
      .setStyle(ButtonStyle.Link)
  )
}
