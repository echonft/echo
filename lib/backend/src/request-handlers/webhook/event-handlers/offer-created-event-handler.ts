import { echoOfferToBaseOffer } from '@echo/backend/mappers/echo-offer-to-base-offer'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { HexString } from '@echo/model/types/hex-string'
import { alwaysVoid } from '@echo/utils/helpers/always-void'
import type { Nullable } from '@echo/utils/types/nullable'
import { getEchoOffer } from '@echo/web3/services/get-echo-offer'
import type { EchoOffer } from '@echo/web3/types/echo-offer'
import { always, andThen, assoc, isNil, otherwise, pipe, toLower } from 'ramda'

export async function offerCreatedEventHandler(offerId: HexString) {
  const echoOffer = await pipe(getEchoOffer, otherwise(always<Nullable<EchoOffer>>(undefined)))(offerId)
  if (!isNil(echoOffer)) {
    const existingOffer = await pipe(
      getOfferByIdContract,
      otherwise(always<Nullable<OfferDocument>>(undefined))
    )(offerId)
    if (isNil(existingOffer)) {
      await pipe(
        echoOfferToBaseOffer,
        andThen(pipe(assoc('idContract', toLower(offerId)), addOffer, otherwise(alwaysVoid))),
        otherwise(alwaysVoid)
      )(echoOffer)
    }
  }
}
