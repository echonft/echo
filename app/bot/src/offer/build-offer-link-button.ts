import { linkProvider } from '@echo/api/routing/link-provider'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildOfferLinkButton(offerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('offer.button.label'))
      .setURL(linkProvider.profile.offer.getUrl({ offerId }))
      .setStyle(ButtonStyle.Link)
  )
}
