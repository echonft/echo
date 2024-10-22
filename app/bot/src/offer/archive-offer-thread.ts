import { archiveThreadDelay } from '@echo/bot/constants/archive-thread-delay'
import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { getOfferThreadOnEchoChannel } from '@echo/bot/offer/get-offer-thread-on-echo-channel'
import type { WithClient } from '@echo/bot/types/with-client'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { Offer } from '@echo/model/types/offer/offer'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { WithLogger } from '@echo/utils/types/with-logger'
import i18next from 'i18next'
import { isNil, pipe } from 'ramda'

interface ArchiveOfferThreadArgs extends WithClient, WithLogger {
  offer: Offer
}

export async function archiveOfferThread(args: ArchiveOfferThreadArgs) {
  const { logger } = args
  const { offerThread, thread } = await getOfferThreadOnEchoChannel(args)
  if (!isNil(thread) && !isNil(offerThread)) {
    await sendToThread(thread, {
      content: i18next.t('offer.thread.close')
    })
    await pipe(deleteThread, delayPromise(archiveThreadDelay))(thread)
    logger?.info({ thread }, 'thread deleted')
    const archiveOfferThread = await firestoreArchiveOfferThread(offerThread.offerId)
    logger?.info({ offerThread: archiveOfferThread }, 'archived thread in Firestore')
  }
}
