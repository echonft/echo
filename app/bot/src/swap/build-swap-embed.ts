import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNftItem } from '@echo/bot/helpers/embed/embed-value-for-nft-item'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import { offerReceiverItems } from '@echo/model/helpers/offer/offer-receiver-items'
import { offerSenderItems } from '@echo/model/helpers/offer/offer-sender-items'
import type { NftItem } from '@echo/model/types/item'
import type { Swap } from '@echo/model/types/swap'
import { type APIEmbedField, EmbedBuilder, userMention } from 'discord.js'
import i18next from 'i18next'
import { addIndex, flatten, map, pipe } from 'ramda'

export function buildSwapEmbed(swap: Swap, creator: UserDocument, counterparty: UserDocument) {
  return (
    new EmbedBuilder()
      .setTitle(i18next.t('swap.embed.title'))
      .setDescription(
        i18next.t('swap.embed.description', {
          creator: userMention(creator.discord.id),
          counterparty: userMention(counterparty.discord.id)
        })
      )
      .setColor(0x00ff66)
      // TODO support ERC20
      .setFields(fields(pipe(offerSenderItems, nftItems)(swap), pipe(offerReceiverItems, nftItems)(swap)))
  )
}

function fields(senderItems: NftItem[], receiverItems: NftItem[]): APIEmbedField[] {
  return flatten([
    embedSeparator(),
    senderItemsFields(senderItems),
    embedSeparator(),
    receiverItemsFields(receiverItems)
  ])
}

function senderItemsFields(items: NftItem[]): APIEmbedField[] {
  const mapIndexed = addIndex<NftItem>(map)
  return mapIndexed(
    (item: NftItem, index: number) => ({
      name: index === 0 ? i18next.t('swap.embed.senderItems') : '\u200b',
      value: embedValueForNftItem(item),
      inline: true
    }),
    items
  )
}

function receiverItemsFields(items: NftItem[]): APIEmbedField[] {
  const mapIndexed = addIndex<NftItem>(map)
  return mapIndexed(
    (item: NftItem, index) => ({
      name: index === 0 ? i18next.t('swap.embed.receiverItems') : '\u200b',
      value: embedValueForNftItem(item),
      inline: true
    }),
    items
  )
}
