import { OfferState } from '@echo/ui-model'

/**
 * Get the proper UpdateOfferAction (API) based on Offer state
 * @param state The state of the offer
 * @param isReceiver Whether the user is the receiver or not
 * @param isDeclining Whether the user is declining the offer or not
 */
export const getUpdateOfferActionFromOffer = (state: OfferState, isReceiver: boolean, isDeclining: boolean): number => {
  switch (state) {
    case 'ACCEPTED':
      if (isDeclining) {
        return 0
      }
      throw new Error('Invalid Offer State')
    case 'OPEN':
      if (isDeclining) {
        return isReceiver ? 1 : 0
      }
      if (isReceiver) {
        return 2
      }
      throw new Error('Invalid Offer State')
    default:
      throw new Error('Invalid Offer State')
  }
}
