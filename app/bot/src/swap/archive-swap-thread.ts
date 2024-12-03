import { archiveThreadDelay } from '@echo/bot/constants/archive-thread-delay'
import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { getSwapThreadOnEchoChannel } from '@echo/bot/swap/get-swap-thread-on-echo-channel'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { Swap } from '@echo/model/types/swap'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import i18next from 'i18next'
import { isNil, pipe } from 'ramda'

export async function archiveSwapThread(swap: Swap) {
  const { offerThread, thread } = await getSwapThreadOnEchoChannel(swap)
  if (!isNil(thread) && !isNil(offerThread)) {
    await sendToThread(thread, {
      content: i18next.t('offer.thread.close')
    })
    await pipe(deleteThread, delayPromise(archiveThreadDelay))(thread)
    logger.info({ thread }, 'thread deleted')
    const archiveOfferThread = await firestoreArchiveOfferThread(offerThread.offerId)
    logger.info({ offerThread: archiveOfferThread }, 'archived thread in Firestore')
  }
}
