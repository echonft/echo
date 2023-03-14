export interface NftTokenUri {
  /**
   * URI for the location of the NFT's original metadata blob (ex: the original
   * IPFS link).
   */
  raw: URL
  /** Public gateway URI for the raw URI. Generally offers better performance. */
  gateway: URL
}
