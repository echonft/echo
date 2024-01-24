export const OFFER_STATE_OPEN = 'OPEN' as const
export const OFFER_STATE_ACCEPTED = 'ACCEPTED' as const
export const OFFER_STATE_CANCELLED = 'CANCELLED' as const
export const OFFER_STATE_REJECTED = 'REJECTED' as const
export const OFFER_STATE_COMPLETED = 'COMPLETED' as const
export const OFFER_STATE_EXPIRED = 'EXPIRED' as const
export const OFFER_STATES = [
  OFFER_STATE_OPEN,
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_REJECTED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED
] as const

export const READ_ONLY_OFFER_STATES = [
  OFFER_STATE_EXPIRED,
  OFFER_STATE_REJECTED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_CANCELLED
] as const
