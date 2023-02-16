import { Contract } from '../contract'
import { OpenSeaCollectionMetadata } from './open-sea-collection-metadata'

export interface NftCollection {
  id: string
  contract: Contract
  /**
   * The number of NFTs in the contract as an integer string. This field is only
   * available on ERC-721 contracts.
   */
  totalSupply: number | undefined
  /** OpenSea's metadata for the contract. */
  openSea: OpenSeaCollectionMetadata | undefined
}
