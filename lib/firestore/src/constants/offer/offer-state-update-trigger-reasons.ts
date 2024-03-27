export const OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED = 'ownership-changed'
export const OFFER_STATE_UPDATE_TRIGGER_REASON_APPROVAL_REVOKED = 'approval-revoked'
export const OFFER_STATE_UPDATE_TRIGGER_REASONS = [
  OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED,
  OFFER_STATE_UPDATE_TRIGGER_REASON_APPROVAL_REVOKED
] as const
