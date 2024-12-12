import { archiveThreadDelay } from '@echo/bot/constants/archive-thread-delay'
import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { getSwapThreadOnEchoChannel } from '@echo/bot/swap/get-swap-thread-on-echo-channel'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import i18next from 'i18next'
import { setTimeout } from 'node:timers/promises'
import { isNil } from 'ramda'

export async function archiveSwapThread(swap: SwapDocument) {
  const { offerThread, thread } = await getSwapThreadOnEchoChannel(swap)
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
