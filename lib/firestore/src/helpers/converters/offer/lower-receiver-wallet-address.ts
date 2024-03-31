import { lowerAddress } from '@echo/firestore/helpers/converters/wallet/lower-address'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modifyPath } from 'ramda'

const key = 'receiver'
type Key = typeof key
export function lowerReceiverWalletAddress<
  T extends OfferDocumentData | Partial<WithFieldValue<Offer> & Record<Key, User>>
>(offer: T): T {
  return modifyPath(['receiver', 'wallet'], lowerAddress, offer)
}
