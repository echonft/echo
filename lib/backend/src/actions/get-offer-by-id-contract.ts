'use server'
import { offerDocumentToModel } from '@echo/firestore/converters/offer-document-to-model'
import { getOfferByIdContract as firestoreGetOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import type { Offer } from '@echo/model/types/offer'
import type { HexString } from '@echo/model/types/hex-string'
import { isNil } from 'ramda'

export async function getOfferByIdContract(idContract: HexString): Promise<Offer> {
  await initializeFirebase()
  const offer = await firestoreGetOfferByIdContract(idContract)
  if (isNil(offer)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  return offerDocumentToModel(offer)
}
