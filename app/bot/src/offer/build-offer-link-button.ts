import { linkProvider } from '@echo/api/routing/link-provider'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildOfferLinkButton(offerSlug: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('offer.button'))
      .setURL(linkProvider.offer.details.getUrl({ offerSlug }))
      .setStyle(ButtonStyle.Link)
  )
}
