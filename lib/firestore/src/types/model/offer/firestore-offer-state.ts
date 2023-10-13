export const OFFER_STATES = ['OPEN', 'ACCEPTED', 'CANCELLED', 'REJECTED', 'INVALID', 'COMPLETED'] as const
export type FirestoreOfferState = (typeof OFFER_STATES)[number]
