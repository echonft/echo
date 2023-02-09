import { Contract } from '../contract'
import { NftTokenType } from './nft-token-type'
import { OpenSeaCollectionMetadata } from './open-sea-collection-metadata'

export interface NftCollection {
  contract: Contract
  tokenType: NftTokenType
  /** The name of the contract. */
  name: string | undefined
  /** The symbol of the contract. */
  symbol: string | undefined
  /**
   * The number of NFTs in the contract as an integer string. This field is only
   * available on ERC-721 contracts.
   */
  totalSupply: number | undefined
  /** OpenSea's metadata for the contract. */
  openSea: OpenSeaCollectionMetadata | undefined
}
