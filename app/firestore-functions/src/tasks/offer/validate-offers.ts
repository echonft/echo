import { getPendingOffersPaginated } from '@echo/firestore/crud/offer/get-pending-offers-paginated'
import { PROMISE_POOL_CONCURRENCY } from '@echo/firestore-functions/constants/promise-pool-concurrency'
import { validateOffer } from '@echo/firestore-functions/tasks/offer/validate-offer'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import { PromisePool } from '@supercharge/promise-pool'
import dayjs from 'dayjs'
import { inc } from 'ramda'

async function validateOffersForPage(page: number, logger?: LoggerInterface) {
  const { result: offers, hasNext } = await getPendingOffersPaginated({ page })
  await PromisePool.withConcurrency(PROMISE_POOL_CONCURRENCY)
    .for(offers)
    .process(async (offer) => {
      await validateOffer(offer, logger)
    })
  if (hasNext) {
    return validateOffersForPage(inc(page), logger)
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
