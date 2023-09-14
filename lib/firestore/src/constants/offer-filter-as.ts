import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const OfferFilterAsReceiver = 'receiver'
export const OfferFilterAsSender = 'sender'
export const OFFER_FILTER_AS: NonEmptyArray<string> = [OfferFilterAsReceiver, OfferFilterAsSender]
