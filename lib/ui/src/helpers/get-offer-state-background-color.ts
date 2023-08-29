import { OfferState } from '@echo/ui-model'

export const getOfferStateBackgroundColor = (state: OfferState) => {
  switch (state) {
    case 'OPEN':
      return 'bg-yellow-500'
    case 'COMPLETED':
    case 'ACCEPTED':
      return 'bg-green-500'
    case 'INVALID':
    case 'CANCELLED':
    case 'REJECTED':
      return 'bg-red-400'
  }
}
