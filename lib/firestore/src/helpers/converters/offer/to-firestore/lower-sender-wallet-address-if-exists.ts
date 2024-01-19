import { lowerSenderWalletAddress } from '@echo/firestore/helpers/converters/offer/lower-sender-wallet-address'
import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

const key = 'sender' as const
type Key = typeof key
type PartialOffer = Partial<WithFieldValue<Offer>>
export function lowerSenderWalletAddressIfExists(offer: PartialOffer): PartialOffer {
  return whenHas<Key, PartialOffer, User, PartialOffer>(key, lowerSenderWalletAddress)(offer)
}
