import { lowerSenderItemsAddresses } from '@echo/firestore/helpers/converters/offer/lower-sender-items-addresses'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

const key = 'senderItems'
type Key = typeof key
type PartialOffer = Partial<WithFieldValue<Offer>>
export function lowerSenderItemsAddressesIfExists(offer: PartialOffer): PartialOffer {
  return whenHas<Key, PartialOffer, OfferItem[], PartialOffer>(key, lowerSenderItemsAddresses)(offer)
}
