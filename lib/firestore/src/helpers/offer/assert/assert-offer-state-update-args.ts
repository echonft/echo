import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { type Offer } from '@echo/model/types/offer'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function assertOfferStateUpdateArgs(offer: Offer, args: OfferStateUpdateArgs) {
  const { id, receiver, sender } = offer
  const {
    state,
    trigger: { by, reason }
  } = args
  switch (state) {
    case 'OPEN':
      throw Error(`invalid offer state update: there is no update for OPEN state`)
    case 'CANCELLED':
      if (by !== receiver.username && by !== sender.username && by !== OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM) {
        throw Error(
          `offer ${id} state update to CANCELLED not allowed: ${by} is neither the sender, the receiver, nor the system`
        )
      }
      if (by === OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM && isNilOrEmpty(reason)) {
        throw Error(
          `offer ${id} state update to CANCELLED not allowed: trigger reason is needed when trigger is system`
        )
      }
      break
    // TODO change the check to OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM when the system does it
    case 'COMPLETED':
      if (by !== sender.username) {
        throw Error(`offer ${id} state update to COMPLETED not allowed: ${by} is not the sender`)
      }
      break
    case 'ACCEPTED':
    case 'REJECTED':
      if (by !== receiver.username) {
        throw Error(`offer ${id} state update to ${state} not allowed: ${by} is not the receiver`)
      }
      break
  }
}
