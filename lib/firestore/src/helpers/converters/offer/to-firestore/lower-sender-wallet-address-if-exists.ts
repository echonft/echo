import { lowerSenderWalletAddress } from '@echo/firestore/helpers/converters/offer/lower-sender-wallet-address'
import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function lowerSenderWalletAddressIfExists(offer: WithFieldValue<Offer>): WithFieldValue<Offer> {
  return whenHas<'sender', WithFieldValue<Offer>, User, WithFieldValue<Offer>>(
    'sender',
    lowerSenderWalletAddress
  )(offer)
}
