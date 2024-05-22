import { lowerCreatorWalletAddress } from '@echo/firestore/helpers/converters/listing/lower-creator-wallet-address'
import type { Listing } from '@echo/model/types/listing'
import type { User } from '@echo/model/types/user'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function lowerCreatorWalletAddressIfExists(listing: WithFieldValue<Listing>): WithFieldValue<Listing> {
  return whenHas<'creator', WithFieldValue<Listing>, User, WithFieldValue<Listing>>(
    'creator',
    lowerCreatorWalletAddress
  )(listing)
}
