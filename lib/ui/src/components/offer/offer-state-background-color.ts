import { OfferState } from '@echo/ui-model'

export const offerStateBackgroundColor = (state: OfferState) => {
  switch (state) {
    case 'OPEN':
      return 'bg-yellow-500'
    case 'ACCEPTED':
      return 'bg-green-500'
    case 'INVALID':
    case 'CANCELLED':
    case 'REJECTED':
      return 'bg-red-400'
  }
}
