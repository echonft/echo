import type { NonEmptyArray } from '@echo/utils/types'

export const OFFER_STATES: NonEmptyArray<string> = ['OPEN', 'ACCEPTED', 'CANCELLED', 'REJECTED', 'INVALID', 'COMPLETED']
export type OfferState = (typeof OFFER_STATES)[number]
