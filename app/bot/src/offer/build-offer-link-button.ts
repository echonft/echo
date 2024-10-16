import type { Offer } from '@echo/model/types/offer/offer'
import { pathProvider } from '@echo/routing/path-provider'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildOfferLinkButton(offer: Offer) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('offer.button'))
      .setURL(pathProvider.profile.default.getUrl({ offer }))
      .setStyle(ButtonStyle.Link)
  )
}
