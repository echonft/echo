import type { Offer } from '@echo/model/types/offer'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildOfferLinkButton(offer: Offer) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('offer.button'))
      .setURL(pathProvider.profile.default.withQuery({ offer }).getUrl())
      .setStyle(ButtonStyle.Link)
  )
}
