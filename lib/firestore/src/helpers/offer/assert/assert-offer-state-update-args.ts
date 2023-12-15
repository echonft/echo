import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function assertOfferStateUpdateArgs(offer: Offer, args: OfferStateUpdateArgs) {
  const { id, receiver, sender } = offer
  const {
    state,
    trigger: { by, reason }
  } = args
  switch (state) {
    case OFFER_STATE_OPEN:
      throw Error(`invalid offer state update: there is no update for OPEN state`)
    case OFFER_STATE_CANCELLED:
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
    case OFFER_STATE_COMPLETED:
      if (by !== OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM) {
        throw Error(`offer ${id} state update to COMPLETED not allowed: ${by} is not the system`)
      }
      break
    case OFFER_STATE_ACCEPTED:
    case OFFER_STATE_REJECTED:
      if (by !== receiver.username) {
        throw Error(`offer ${id} state update to ${state} not allowed: ${by} is not the receiver`)
      }
      break
  }
}
