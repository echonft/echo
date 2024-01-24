export const LISTING_STATE_OPEN = 'OPEN' as const
export const LISTING_STATE_OFFERS_PENDING = 'OFFERS_PENDING' as const
export const LISTING_STATE_PARTIALLY_FULFILLED = 'PARTIALLY_FULFILLED' as const
export const LISTING_STATE_FULFILLED = 'FULFILLED' as const
export const LISTING_STATE_CANCELLED = 'CANCELLED' as const
export const LISTING_STATE_EXPIRED = 'EXPIRED' as const

export const LISTING_STATES = [
  LISTING_STATE_OPEN,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_PARTIALLY_FULFILLED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED
] as const

export const READ_ONLY_LISTING_STATES = [
  LISTING_STATE_EXPIRED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_CANCELLED
] as const
