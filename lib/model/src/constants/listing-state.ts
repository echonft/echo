export enum ListingState {
  Open = 'OPEN',
  OffersPending = 'OFFERS_PENDING',
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  Fulfilled = 'FULFILLED',
  Cancelled = 'CANCELLED',
  Expired = 'EXPIRED'
}

export const readOnlyListingStates = [
  ListingState.PartiallyFulfilled,
  ListingState.Fulfilled,
  ListingState.Cancelled,
  ListingState.Expired
] as const
