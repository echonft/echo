import { archiveThread } from '@echo/bot/helpers/archive-thread'
import { getChannel } from '@echo/bot/helpers/get-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { Client } from 'discord.js'
import i18next from 'i18next'
import { isNil } from 'ramda'

export async function archiveOfferThread(client: Client, offerThread: OfferThread) {
  const channel = await getChannel(client, offerThread.guild.channelId)
  const thread = await getThread(channel, offerThread.guild.threadId)
  if (!isNil(thread)) {
    await sendToThread(thread, {
      content: i18next.t('offer.thread.close')
    })
    await archiveThread(thread)
  }
  await firestoreArchiveOfferThread(offerThread.id)
}
