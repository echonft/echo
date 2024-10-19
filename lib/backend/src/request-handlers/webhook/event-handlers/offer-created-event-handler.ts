import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { contractOfferToBaseOffer } from '@echo/backend/mappers/contract-offer-to-base-offer'
import type { EchoEventHandlerArgs } from '@echo/backend/request-handlers/webhook/event-handlers/echo-event-handler'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { EchoContractError } from '@echo/web3/constants/errors/echo-contract-error'
import { getEchoOffer } from '@echo/web3/services/get-echo-offer'
import { andThen, assoc, isNil, pipe, toLower } from 'ramda'

export async function offerCreatedEventHandler(args: EchoEventHandlerArgs) {
  const { logger, event, chain } = args
  const { offerId } = event
  const contractOffer = await getEchoOffer({
    chain,
    offerId
  })
  if (isNil(contractOffer)) {
    return Promise.reject(new NotFoundError({ message: EchoContractError.OfferNotFound, severity: 'warning' }))
  }
  const existingOffer = await getOfferByIdContract(offerId)
  if (!isNil(existingOffer)) {
    return Promise.reject(new BadRequestError({ message: OfferError.Exists, severity: 'warning' }))
  }
  const offer = await pipe(
    contractOfferToBaseOffer,
    andThen(pipe(assoc('idContract', toLower(offerId)), addOffer))
  )(contractOffer)
  logger?.info({ offer }, 'created offer')
}
