export interface OfferValidResult {
  valid: boolean
  reason?: 'approval-revoked' | 'ownership-changed'
}
