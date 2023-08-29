// TODO Update function with the new offer state with swap
import { OfferState } from '@echo/ui-model'

export const getOfferModalDeclineButtonTitleForState = (state: OfferState, isReceiving: boolean) => {
  switch (state) {
    case 'OPEN':
      return isReceiving ? 'rejectBtn' : 'cancelBtn'
    case 'ACCEPTED':
      return 'cancelBtn'
  }
  return undefined
}
