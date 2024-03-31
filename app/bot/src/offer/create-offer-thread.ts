import { getEchoChannel } from '@echo/bot/get-echo-channel'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import type { Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import { ChannelType, ThreadAutoArchiveDuration, userMention } from 'discord.js'
import i18next from 'i18next'

export async function createOfferThread(offer: Offer, senderId: string, receiverId: string) {
  const channel = await getEchoChannel()
  const thread = await channel.threads.create({
    name: i18next.t('offer.thread.name', { timestamp: now() }),
    autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
    type: ChannelType.PrivateThread
  })
  // FIXME try/catch this and send the appropriate message if one user is missing
  await thread.members.add(senderId)
  await thread.members.add(receiverId)
  await sendToThread(thread, {
    components: [buildOfferLinkButton(offer.id)],
    content: i18next.t('offer.thread.message', { sender: userMention(senderId), receiver: userMention(receiverId) })
  })
  return thread.id
}
