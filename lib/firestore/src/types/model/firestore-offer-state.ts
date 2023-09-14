import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const OFFER_STATES: NonEmptyArray<string> = ['OPEN', 'ACCEPTED', 'CANCELLED', 'REJECTED', 'INVALID', 'COMPLETED']
export type FirestoreOfferState = (typeof OFFER_STATES)[number]
