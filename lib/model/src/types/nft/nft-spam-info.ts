import { NftSpamClassification } from './nft-spam-classification'

export interface NftSpamInfo {
  isSpam: boolean
  /** A list of reasons why an NFT contract was marked as spam. */
  classifications: NftSpamClassification[]
}
