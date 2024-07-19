import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNft } from '@echo/bot/helpers/embed/embed-value-for-nft'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
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
          counterparty: userMention(counterparty.discord.id)
        })
      )
      // TODO Maybe a color per collection via settings?
      .setColor(0x00ff66)
      .setFields(fields(offer.senderItems, offer.receiverItems))
  )
}

function fields(senderItems: Nft[], receiverItems: Nft[]): APIEmbedField[] {
  return flatten([
    embedSeparator(),
    senderItemsFields(senderItems),
    embedSeparator(),
    receiverItemsFields(receiverItems)
  ])
}

function senderItemsFields(items: Nft[]): APIEmbedField[] {
  const mapIndexed = addIndex<Nft>(map)
  return mapIndexed(
    (item: Nft, index: number) => ({
      name: index === 0 ? i18next.t('swap.embed.senderItems') : '\u200b',
      value: embedValueForNft(item),
      inline: true
    }),
    items
  )
}

function receiverItemsFields(items: Nft[]): APIEmbedField[] {
  const mapIndexed = addIndex<Nft>(map)
  return mapIndexed(
    (item: Nft, index) => ({
      name: index === 0 ? i18next.t('swap.embed.receiverItems') : '\u200b',
      value: embedValueForNft(item),
      inline: true
    }),
    items
  )
}
