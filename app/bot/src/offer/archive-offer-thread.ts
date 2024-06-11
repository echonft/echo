import { ARCHIVE_THREAD_DELAY } from '@echo/bot/constants/archive-thread-delay'
import { botLogger } from '@echo/bot/constants/bot-logger'
import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { AnyThreadChannel } from 'discord.js'
import i18next from 'i18next'
import { isNil } from 'ramda'

export async function archiveOfferThread(args: { offerThread: OfferThread; thread: AnyThreadChannel | undefined }) {
  const { offerThread, thread } = args
  if (!isNil(thread)) {
    await sendToThread(thread, {
      content: i18next.t('offer.thread.close')
    })
    await delayPromise(deleteThread, ARCHIVE_THREAD_DELAY)(thread)
    await firestoreArchiveOfferThread(offerThread.offerId)
    botLogger.info({ msg: `[OFFER ${offerThread.offerId}] archived thread in Firestore` })
  }
}
