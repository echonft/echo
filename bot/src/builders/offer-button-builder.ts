import { ButtonAction } from '../types/models/button-action'
import { linkForOffer } from '../utils/offer'
import { Offer } from '@echo/model'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

/**
 * Build a buy offer button for an offer. This is called when new offers are created
 * @param offer The new offer created
 */
function buildBuyOfferButton(offer: Offer) {
  return new ButtonBuilder()
    .setCustomId(`${ButtonAction.BUY}-${offer.id}`)
    .setLabel('Trade')
    .setStyle(ButtonStyle.Primary)
}

function buildOfferLinkButton(offer: Offer) {
  return new ButtonBuilder().setLabel('View on Echo').setURL(linkForOffer(offer)).setStyle(ButtonStyle.Link)
}

export function buildNewOfferButtons(offer: Offer) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(buildBuyOfferButton(offer), buildOfferLinkButton(offer))
}
