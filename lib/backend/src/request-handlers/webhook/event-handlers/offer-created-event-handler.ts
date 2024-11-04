import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { info } from '@echo/backend/helpers/logger'
import { echoOfferToBaseOffer } from '@echo/backend/mappers/echo-offer-to-base-offer'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import type { HexString } from '@echo/utils/types/hex-string'
import { EchoContractError } from '@echo/web3/constants/errors/echo-contract-error'
import { getEchoOffer } from '@echo/web3/services/get-echo-offer'
import { andThen, assoc, isNil, pipe, toLower } from 'ramda'

export async function offerCreatedEventHandler(offerId: HexString) {
  const echoOffer = await getEchoOffer(offerId)
  if (isNil(echoOffer)) {
    return Promise.reject(new NotFoundError({ message: EchoContractError.OfferNotFound, severity: 'warning' }))
  }
  const existingOffer = await getOfferByIdContract(offerId)
  if (!isNil(existingOffer)) {
    return Promise.reject(new BadRequestError({ message: OfferError.Exists, severity: 'warning' }))
  }
  const offer = await pipe(
    echoOfferToBaseOffer,
    andThen(pipe(assoc('idContract', toLower(offerId)), addOffer))
  )(echoOffer)
  info({ offer }, 'created offer')
}
