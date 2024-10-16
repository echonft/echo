import { lowerAddress } from '@echo/firestore/helpers/converters/wallet/lower-address'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import type { Offer } from '@echo/model/types/offer/offer'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modifyPath } from 'ramda'

export function lowerSenderWalletAddress<T extends OfferDocumentData | WithFieldValue<Offer>>(offer: T): T {
  return modifyPath(['sender', 'wallet'], lowerAddress, offer)
}
