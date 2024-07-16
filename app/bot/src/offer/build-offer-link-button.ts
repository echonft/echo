import { pathProvider } from '@echo/api/routing/path-provider'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildOfferLinkButton(offerSlug: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('offer.button'))
      .setURL(pathProvider.offer.details.getUrl({ slug: offerSlug }))
      .setStyle(ButtonStyle.Link)
  )
}
