import { offerLink } from '@echo/bot/offer/offer-link'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

export function buildOfferLinkButton(offerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setLabel(i18next.t('offer.button.label')).setURL(offerLink(offerId)).setStyle(ButtonStyle.Link)
  )
}
