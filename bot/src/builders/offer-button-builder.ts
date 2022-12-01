import { ButtonAction } from '../types/models/button-action'
import { Offer } from '@echo/model'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

/**
 * Build a buy offer button for an offer. This is called when new offers are created
 * @param offer The new offer created
 */
export function buildBuyOfferButton(offer: Offer) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId(`${ButtonAction.BUY}-${offer.id}`).setLabel('Buy').setStyle(ButtonStyle.Primary)
  )
}
