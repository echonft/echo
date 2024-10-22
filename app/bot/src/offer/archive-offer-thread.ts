import { archiveThreadDelay } from '@echo/bot/constants/archive-thread-delay'
import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { getThreadOnEchoChannel } from '@echo/bot/helpers/get-thread-on-echo-channel'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import type { WithClient } from '@echo/bot/types/with-client'
import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { WithLogger } from '@echo/utils/types/with-logger'
import i18next from 'i18next'
import { isNil, pipe } from 'ramda'

interface ArchiveOfferThreadArgs extends WithClient, WithLogger {
  offerThread: OfferThreadDocumentData
}

export async function archiveOfferThread(args: ArchiveOfferThreadArgs) {
  const { client, offerThread, logger } = args
  if (offerThread.state === OfferThreadState.Archived) {
    return
  }
  const thread = await getThreadOnEchoChannel({ client, threadId: offerThread.guild.threadId, logger })
  if (!isNil(thread)) {
    await sendToThread(thread, {
      content: i18next.t('offer.thread.close')
    })
    await pipe(deleteThread, delayPromise(archiveThreadDelay))(thread)
    logger?.info({ thread }, 'thread deleted')
    const archiveOfferThread = await firestoreArchiveOfferThread(offerThread.offerId)
    logger?.info({ offerThread: archiveOfferThread }, 'archived thread in Firestore')
  }
}
