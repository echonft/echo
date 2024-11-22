import type { Offer } from '@echo/model/types/offer'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildOfferLinkButton(offer: Offer) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('offer.button'))
      .setURL(frontendRoutes.offer.details.withQuery({ offer }).getUrl({ username: offer.sender.username }))
      .setStyle(ButtonStyle.Link)
  )
}
