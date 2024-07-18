import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import type { Offer } from '@echo/model/types/offer'
import { type WithFieldValue } from 'firebase-admin/firestore'
import { is, modify, propSatisfies, toLower, when } from 'ramda'

export function lowerIdContract<T extends OfferDocumentData | WithFieldValue<Offer>>(offer: T): T {
  return when(propSatisfies(is(String), 'idContract'), modify('idContract', toLower))(offer) as T
}
