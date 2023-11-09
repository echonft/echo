import { createOfferThread } from '@echo/bot/offer/create-offer-thread'
import { getOfferThreadChannel } from '@echo/bot/offer/get-offer-thread-channel'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { type Offer } from '@echo/model/types/offer'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles offer changes
 * @param client
 * @param changeType
 * @param offer
 */
export async function offerChangeHandler(client: Client, changeType: DocumentChangeType, offer: Offer) {
  if (changeType === 'added') {
    const thread = await findOfferThread(offer.id)
    if (isNil(thread)) {
      const sender = await findUserByUsername(offer.sender.username)
      if (isNil(sender)) {
        throw Error(`offer sender with username ${offer.sender.username} not found`)
      }
      const receiver = await findUserByUsername(offer.receiver.username)
      if (isNil(receiver)) {
        throw Error(`offer receiver with username ${offer.receiver.username} not found`)
      }
      const channel = await getOfferThreadChannel(client, offer, sender.discord.id, receiver.discord.id)
      if (isNil(channel)) {
        // TODO proper fallback
        throw Error(`No suitable channel found for offer ${offer.id}`)
      }
      const threadId = await createOfferThread(channel, offer, sender.discord.id, receiver.discord.id)
      await addOfferThread(offer.id, { discordId: channel.guildId, channelId: channel.id, threadId })
    }
  }
}
