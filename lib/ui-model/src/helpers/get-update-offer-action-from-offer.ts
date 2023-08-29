import { OfferState } from '../types/offer-state'
import { UpdateOfferAction } from '@echo/api-public'

/**
 * Get the proper UpdateOfferAction (API) based on Offer state
 * TODO We should add the other cases here (approve, complete)
 * TODO Should it return undefined when state is invalid?
 * @param state The state of the offer
 * @param isReceiver Whether the user is the receiver or not
 * @param isDeclining Whether the user is declining the offer or not
 */
export const getUpdateOfferActionFromOffer = (
  state: OfferState,
  isReceiver: boolean,
  isDeclining: boolean
): UpdateOfferAction | undefined => {
  switch (state) {
    case 'ACCEPTED':
      if (isDeclining) {
        return UpdateOfferAction.CANCEL
      }
      if (isReceiver) {
        return UpdateOfferAction.COMPLETE
      }
      return undefined
    case 'OPEN':
      if (isDeclining) {
        return isReceiver ? UpdateOfferAction.REJECT : UpdateOfferAction.CANCEL
      }
      return isReceiver ? UpdateOfferAction.ACCEPT : undefined
    default:
      return undefined
  }
}
