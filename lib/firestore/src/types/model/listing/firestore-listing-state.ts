export const LISTING_STATES = ['OPEN', 'FULFILLED', 'CANCELLED', 'INVALID']
export type FirestoreListingState = (typeof LISTING_STATES)[number]
