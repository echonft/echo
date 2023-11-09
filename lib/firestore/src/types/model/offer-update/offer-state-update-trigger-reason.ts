import { OFFER_STATE_UPDATE_TRIGGER_REASONS } from '@echo/firestore/constants/offer/offer-state-update-trigger-reasons'

export type OfferStateUpdateTriggerReason = (typeof OFFER_STATE_UPDATE_TRIGGER_REASONS)[number]
