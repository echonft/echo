import { lowerAddress } from '@echo/firestore/helpers/converters/wallet/lower-address'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import type { Listing } from '@echo/model/types/listing'
import type { User } from '@echo/model/types/user'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modifyPath } from 'ramda'

const key = 'creator'
type Key = typeof key
export function lowerCreatorWalletAddress<
  T extends ListingDocumentData | (Partial<WithFieldValue<Listing>> & Record<Key, User>)
>(listing: T): T {
  return modifyPath(['creator', 'wallet'], lowerAddress, listing)
}
