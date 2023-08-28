import { OfferState } from '@echo/ui-model'

export const getOfferModalAcceptButtonTitleForState = (state: OfferState) => {
  switch (state) {
    case 'OPEN':
      return 'acceptBtn'
    case 'ACCEPTED':
      return 'approveBtn'
    // TODO Add the other cases
  }
  // Should not happen
  return null
}
