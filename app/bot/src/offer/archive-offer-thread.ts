import { archiveThread } from '@echo/bot/helpers/archive-thread'
import { getThreadOnEchoChannel } from '@echo/bot/helpers/get-thread-on-echo-channel'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import i18next from 'i18next'
import { isNil } from 'ramda'

export async function archiveOfferThread(offerThread: OfferThread) {
  const thread = await getThreadOnEchoChannel(offerThread.guild.threadId)
  if (!isNil(thread)) {
    await sendToThread(thread, {
      content: i18next.t('offer.thread.close')
    })
    await archiveThread(thread)
  }
  await firestoreArchiveOfferThread(offerThread.id)
}
