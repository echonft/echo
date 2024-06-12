import { ARCHIVE_THREAD_DELAY } from '@echo/bot/constants/archive-thread-delay'
import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { botLogger } from '@echo/bot/index'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { AnyThreadChannel } from 'discord.js'
import i18next from 'i18next'
import { isNil } from 'ramda'

interface ArchiveOfferThreadArgs {
  offerThread: OfferThread
  thread: AnyThreadChannel | undefined
}

export async function archiveOfferThread(args: ArchiveOfferThreadArgs) {
  const { offerThread, thread } = args
  if (!isNil(thread)) {
    await sendToThread(thread, {
      content: i18next.t('offer.thread.close')
    })
    await delayPromise(deleteThread, ARCHIVE_THREAD_DELAY)(thread)
    botLogger.info({ thread }, 'thread deleted')
    const archiveOfferThread = await firestoreArchiveOfferThread(offerThread.offerId)
    botLogger.info({ offerThread: archiveOfferThread }, 'archived thread in Firestore')
  }
}
