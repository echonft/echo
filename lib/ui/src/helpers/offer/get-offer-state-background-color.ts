import type { OfferState } from '@echo/model/types/offer-state'

export const getOfferStateBackgroundColor = (state: OfferState, expired?: boolean) => {
  if (expired) {
    return 'bg-red-400'
  }
  switch (state) {
    case 'OPEN':
      return 'bg-yellow-500'
    case 'COMPLETED':
    case 'ACCEPTED':
      return 'bg-green-500'
    case 'CANCELLED':
    case 'REJECTED':
      return 'bg-red-400'
  }
}
