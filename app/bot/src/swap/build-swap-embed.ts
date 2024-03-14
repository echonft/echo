import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNft } from '@echo/bot/helpers/embed/embed-value-for-nft'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { type ListingItem } from '@echo/model/types/listing-item'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { type APIEmbedField, EmbedBuilder, userMention } from 'discord.js'
import i18next from 'i18next'
import { addIndex, flatten, map } from 'ramda'

export function buildSwapEmbed(offer: Offer, creator: UserDocumentData, counterparty: UserDocumentData) {
  return (
    new EmbedBuilder()
      .setTitle(i18next.t('swap.embed.title'))
      .setDescription(
        i18next.t('swap.embed.description', {
          creator: userMention(creator.discord.id),
          counterpart: userMention(counterparty.discord.id)
        })
      )
      // TODO Maybe a color per collection via settings?
      .setColor(0x00ff66)
      .setFields(fields(offer.senderItems, offer.receiverItems))
  )
}

function fields(creatorItems: OfferItem[], counterpartyItems: OfferItem[]): APIEmbedField[] {
  return flatten([
    embedSeparator(),
    offerItemsFields(creatorItems, true),
    embedSeparator(),
    offerItemsFields(counterpartyItems, false)
  ])
}

function offerItemsFields(items: OfferItem[], isCreatorItems: boolean): APIEmbedField[] {
  const mapIndexed = addIndex<OfferItem>(map)
  return mapIndexed(
    (item: ListingItem, index) => ({
      name:
        index === 0 ? i18next.t(`swap.embed.${isCreatorItems ? 'creatorItems' : 'counterpartyItems'}.name`) : '\u200b',
      value: embedValueForNft(item.nft),
      inline: true
    }),
    items
  )
}
