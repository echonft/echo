import { OfferState } from '@echo/model/constants/offer-state'

/**
 * Returns `true` if an offer should be locked following a state transition.
 * Offers never transition to OfferState.Open, but we can in Storybook, so we add it here.
 * @param toState
 */
export function shouldLockOffer(toState: OfferState): boolean {
  return toState !== OfferState.Accepted && toState !== OfferState.Open
}
