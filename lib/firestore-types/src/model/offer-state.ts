import { NonEmptyArray } from '@echo/utils'

export const OFFER_STATES: NonEmptyArray<string> = ['OPEN', 'ACCEPTED', 'CANCELLED', 'REJECTED', 'INVALID', 'COMPLETED']
export type OfferState = (typeof OFFER_STATES)[number]
