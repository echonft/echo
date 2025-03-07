'use server'
import { offerDocumentToModel } from '@echo/firestore/converters/offer-document-to-model'
import { getOfferByIdContract as firestoreGetOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { initializeFirestore } from '@echo/firestore/services/initialize-firestore'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import type { HexString } from '@echo/model/types/hex-string'
import type { Offer } from '@echo/model/types/offer'
import { backOff } from 'exponential-backoff'
import { isNil } from 'ramda'

export async function getOfferByIdContract(idContract: HexString): Promise<Offer> {
  await initializeFirestore()
  const offer = await backOff(
    async () => {
      const offer = await firestoreGetOfferByIdContract(idContract)
      if (isNil(offer)) {
        return Promise.reject(Error(OfferError.NotFound))
      }
      return offer
    },
    {
      startingDelay: 1100
    }
  )
  if (isNil(offer)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  return offerDocumentToModel(offer)
}
