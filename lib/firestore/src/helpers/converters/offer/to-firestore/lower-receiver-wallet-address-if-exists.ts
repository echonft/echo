import { lowerReceiverWalletAddress } from '@echo/firestore/helpers/converters/offer/lower-receiver-wallet-address'
import type { Offer } from '@echo/model/types/offer/offer'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function lowerReceiverWalletAddressIfExists(offer: WithFieldValue<Offer>): WithFieldValue<Offer> {
  return whenHas('receiver', lowerReceiverWalletAddress<WithFieldValue<Offer>>)(offer)
}
