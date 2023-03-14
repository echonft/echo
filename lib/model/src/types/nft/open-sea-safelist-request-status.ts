export enum OpenSeaSafelistRequestStatus {
  /** Verified collection. */
  VERIFIED = 'verified',
  /** Collections that are approved on open sea and can be found in search results. */
  APPROVED = 'approved',
  /** Collections that requested safelisting on OpenSea. */
  REQUESTED = 'requested',
  /** Brand new collections. */
  NOT_REQUESTED = 'not_requested'
}
