import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import { getOfferThreadOnEchoChannel } from '@echo/bot/offer/get-offer-thread-on-echo-channel'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import type { NftItem } from '@echo/model/types/item'
import type { Offer } from '@echo/model/types/offer'
import { userMention } from 'discord.js'
import i18next from 'i18next'
import { always, andThen, complement, isNil, type NonEmptyArray, otherwise, pipe, prop } from 'ramda'

async function getUserDiscordId(username: string) {
  const user = await getUserByUsername(username)
  if (isNil(user)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  return user.discord.id
}

async function isNftFromItemInEscrow(item: NftItem): Promise<boolean> {
  const nftSnapshot = await getNftSnapshot(item.token)
  if (!isNil(nftSnapshot)) {
    return pipe(prop('id'), getEscrowedNftSnapshot, andThen(complement(isNil)), otherwise(always(false)))(nftSnapshot)
  }
  return false
}

async function areNftsFromItemsInEscrow(items: NonEmptyArray<NftItem>): Promise<boolean> {
  for (const item of items) {
    const inEscrow = await isNftFromItemInEscrow(item)
    if (inEscrow) {
      return true
    }
  }
  return false
}

export async function postEscrowMessage(offer: Offer) {
  const { offerThread, thread } = await getOfferThreadOnEchoChannel(offer)
  if (!isNil(thread) && !isNil(offerThread)) {
    const senderNftsInEscrow = await pipe(offerSenderNftItems, areNftsFromItemsInEscrow)(offer)
    const receiverNftsInEscrow = await pipe(offerReceiverNftItems, areNftsFromItemsInEscrow)(offer)
    if (senderNftsInEscrow && receiverNftsInEscrow) {
      const senderId = await getUserDiscordId(offer.sender.username)
      const receiverId = await getUserDiscordId(offer.receiver.username)
      await sendToThread(thread, {
        components: [buildOfferLinkButton(offer)],
        content: i18next.t('offer.thread.redeemable.multiple', {
          sender: userMention(senderId),
          receiver: userMention(receiverId)
        })
      })
      logger.info({ offer, offerThread }, 'posted escrow update to thread')
      return
    }
    if (senderNftsInEscrow) {
      const senderId = await getUserDiscordId(offer.sender.username)
      await sendToThread(thread, {
        components: [buildOfferLinkButton(offer)],
        content: i18next.t('offer.thread.redeemable.single', { redeemer: userMention(senderId) })
      })
      logger.info({ offer, offerThread }, 'posted escrow update to thread')
      return
    }
  }
}
