import { archiveThreadDelay } from '@echo/bot/constants/archive-thread-delay'
import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { getOfferThreadOnEchoChannel } from '@echo/bot/offer/get-offer-thread-on-echo-channel'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { Offer } from '@echo/model/types/offer'
import i18next from 'i18next'
import { setTimeout } from 'node:timers/promises'
import { isNil } from 'ramda'

export async function archiveOfferThread(offer: Offer) {
  const { offerThread, thread } = await getOfferThreadOnEchoChannel(offer)
  if (!isNil(thread) && !isNil(offerThread)) {
    await sendToThread(thread, {
      content: i18next.t('offer.thread.close')
    })
    await setTimeout(archiveThreadDelay)
    await deleteThread(thread)
    logger.info({ thread }, 'thread deleted')
    const archiveOfferThread = await firestoreArchiveOfferThread(offerThread.offerId)
    logger.info({ offerThread: archiveOfferThread }, 'archived thread in Firestore')
  }
}
