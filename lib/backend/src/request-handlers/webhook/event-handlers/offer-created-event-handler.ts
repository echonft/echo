import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { mapContractOfferToBaseOffer } from '@echo/backend/mappers/map-contract-offer-to-base-offer'
import type { EchoEventHandlerArgs } from '@echo/backend/request-handlers/webhook/event-handlers/echo-event-handler'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { getEchoOffer } from '@echo/web3/services/get-echo-offer'
import { andThen, assoc, isNil, objOf, pipe } from 'ramda'

export async function offerCreatedEventHandler(args: EchoEventHandlerArgs) {
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
  )(contractOffer)
  logger?.info({ offer }, 'created offer')
}
