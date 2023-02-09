export interface NftMedia {
  /**
   * URI for the location of the NFT's original metadata blob for media (ex: the
   * original IPFS link).
   */
  raw: URL
  /** Public gateway URI for the raw URI. Generally offers better performance. */
  gateway: URL
  /** URL for a resized thumbnail of the NFT media asset. */
  thumbnail: URL | undefined
  /**
   * The media format (ex: jpg, gif, png) of the {@link gateway} and
   * {@link thumbnail} assets.
   */
  format: string | undefined
  /** The size of the media asset in bytes. */
  bytes: number | undefined
}
