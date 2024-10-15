import { ARCHIVE_THREAD_DELAY } from '@echo/bot/constants/archive-thread-delay'
import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { AnyThreadChannel } from 'discord.js'
import i18next from 'i18next'
import { isNil } from 'ramda'

interface ArchiveOfferThreadArgs extends WithLogger {
  offerThread: OfferThreadDocumentData
  thread: AnyThreadChannel | undefined
}

export async function archiveOfferThread(args: ArchiveOfferThreadArgs) {
  const { offerThread, thread, logger } = args
  if (!isNil(thread)) {
    await sendToThread(thread, {
      content: i18next.t('offer.thread.close')
    })
    await delayPromise(deleteThread, ARCHIVE_THREAD_DELAY)(thread)
    logger?.info({ thread }, 'thread deleted')
    const archiveOfferThread = await firestoreArchiveOfferThread(offerThread.offerId)
    logger?.info({ offerThread: archiveOfferThread }, 'archived thread in Firestore')
  }
}
