import { pathProvider } from '@echo/api/routing/path-provider'
import type { Offer } from '@echo/model/types/offer'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildOfferLinkButton(offer: Offer) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18next.t('offer.button'))
      .setURL(pathProvider.user.offer.getUrl({ username: offer.sender.username, idContract: offer.idContract }))
      .setStyle(ButtonStyle.Link)
  )
}
