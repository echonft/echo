export type FirestoreSwapState =
  | 'PENDING_APPROVALS'
  | 'SENDER_APPROVED'
  | 'RECEIVER_APPROVED'
  | 'COMPLETED'
  | 'REJECTED'
  | 'EXPIRED'
