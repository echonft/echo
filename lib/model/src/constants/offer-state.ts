export enum OfferState {
  Open = 'OPEN',
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Rejected = 'REJECTED',
  Completed = 'COMPLETED',
  Expired = 'EXPIRED'
}

export const notReadOnlyOfferStates = [OfferState.Open, OfferState.Accepted] as const
export const readOnlyOfferStates = [
  OfferState.Rejected,
  OfferState.Completed,
  OfferState.Cancelled,
  OfferState.Expired
] as const
