import { OfferState } from '@echo/ui-model'

// TODO Use T instead of returning a string
export const getOfferModalAcceptButtonTitleForState = (state: OfferState) => {
  switch (state) {
    case 'OPEN':
      return 'acceptBtn'
    case 'ACCEPTED':
      return 'approveBtn'
    // TODO Add the other cases
  }
  // Should not happen
  return undefined
}
