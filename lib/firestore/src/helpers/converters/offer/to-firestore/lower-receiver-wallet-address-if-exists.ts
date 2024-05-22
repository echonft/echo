import { lowerReceiverWalletAddress } from '@echo/firestore/helpers/converters/offer/lower-receiver-wallet-address'
import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function lowerReceiverWalletAddressIfExists(offer: WithFieldValue<Offer>): WithFieldValue<Offer> {
  return whenHas<'receiver', WithFieldValue<Offer>, User, WithFieldValue<Offer>>(
    'receiver',
    lowerReceiverWalletAddress
  )(offer)
}
