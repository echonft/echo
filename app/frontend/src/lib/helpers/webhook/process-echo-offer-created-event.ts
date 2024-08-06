import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { mapContractOfferToBaseOffer } from '@echo/frontend/lib/mappers/map-contract-offer-to-base-offer'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getEchoOffer } from '@echo/web3/services/get-echo-offer'
import { andThen, assoc, isNil, objOf, pipe } from 'ramda'

export async function processEchoOfferCreatedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event, chain } = args
  const { offerId } = event
  const contractOffer = await getEchoOffer({
    chain,
    offerId
  })
  if (isNil(contractOffer)) {
    return Promise.reject(new NotFoundError({ message: 'contract offer not found', severity: 'warning' }))
  }
  const offer = await pipe(
    mapContractOfferToBaseOffer,
    andThen(pipe(objOf('baseOffer'), assoc('idContract', offerId), addOffer))
  )({
    logger,
    contractOffer
  })
  logger?.info({ offer }, 'created offer')
}
