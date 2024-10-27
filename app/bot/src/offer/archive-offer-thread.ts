import { archiveThreadDelay } from '@echo/bot/constants/archive-thread-delay'
import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { getOfferThreadOnEchoChannel } from '@echo/bot/offer/get-offer-thread-on-echo-channel'
import { archiveOfferThread as firestoreArchiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import type { Offer } from '@echo/model/types/offer'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { Client } from 'discord.js'
import i18next from 'i18next'
import { isNil, pipe } from 'ramda'

interface ArchiveOfferThreadArgs {
  readonly client: Client
  readonly offer: Offer
}

export async function archiveOfferThread(args: ArchiveOfferThreadArgs) {
  const { offerThread, thread } = await getOfferThreadOnEchoChannel(args)
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
