import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED } from '@echo/firestore/constants/offer/offer-state-update-trigger-reasons'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getPendingOffersPaginated } from '@echo/firestore/crud/offer/get-pending-offers-paginated'
import { PROMISE_POOL_CONCURRENCY } from '@echo/tasks/constants/promise-pool-concurrency'
import type { LoggerInterface } from '@echo/tasks/types/logger-interface'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { assertOfferValid } from '@echo/web3/helpers/offer/assert-offer-valid'
import { PromisePool } from '@supercharge/promise-pool'
import dayjs from 'dayjs'
import { inc, isNil } from 'ramda'

async function validateOffersForPage(page: number, logger?: LoggerInterface) {
  const { result: offers, hasNext } = await getPendingOffersPaginated({ page })
  await PromisePool.withConcurrency(PROMISE_POOL_CONCURRENCY)
    .for(offers)
    .process(async (offer) => {
      const result = await assertOfferValid(offer)
      if (!isNil(result.error)) {
        logger?.warn(`offer ${offer.id} is invalid: ${result.error}`)
        try {
          await cancelOffer({
            offerId: offer.id,
            updateArgs: {
              trigger: {
                by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM,
                reason: OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED
              }
            }
          })
          logger?.info(`offer ${offer.id} cancelled`)
        } catch (e) {
          logger?.error(`error cancelling offer ${offer.id}: ${errorMessage(e)}`)
        }
      }
    })
  if (hasNext) {
    return await validateOffersForPage(inc(page), logger)
  }
  return
}

export async function validateOffers(logger?: LoggerInterface) {
  const start = dayjs()
  logger?.info(`Starting validating offers`)
  await validateOffersForPage(0, logger)
  const finish = dayjs()
  logger?.info(`Finished validating offers (took ${finish.diff(start, 's')} seconds)`)
  return
}
