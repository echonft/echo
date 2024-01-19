import { lowerCreatorWalletAddress } from '@echo/firestore/helpers/converters/listing/lower-creator-wallet-address'
import type { Listing } from '@echo/model/types/listing'
import type { User } from '@echo/model/types/user'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

type PartialListing = Partial<WithFieldValue<Listing>>
export function lowerCreatorWalletAddressIfExists(listing: PartialListing): PartialListing {
  return whenHas<'creator', PartialListing, User, PartialListing>('creator', lowerCreatorWalletAddress)(listing)
}
