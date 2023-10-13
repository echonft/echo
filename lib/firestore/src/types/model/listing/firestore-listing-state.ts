export const LISTING_STATES = ['OPEN', 'FULFILLED', 'CANCELLED', 'INVALID'] as const
export type FirestoreListingState = (typeof LISTING_STATES)[number]
