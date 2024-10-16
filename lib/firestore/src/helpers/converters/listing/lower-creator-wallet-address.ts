import { lowerAddress } from '@echo/firestore/helpers/converters/wallet/lower-address'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import type { Listing } from '@echo/model/types/listing/listing'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modifyPath } from 'ramda'

export function lowerCreatorWalletAddress<T extends ListingDocumentData | WithFieldValue<Listing>>(listing: T): T {
  return modifyPath(['creator', 'wallet'], lowerAddress, listing)
}
