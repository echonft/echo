import { NftAttribute } from './nft-attribute'
import { NftCollection } from './nft-collection'
import { NftMedia } from './nft-media'
import { NftSpamInfo } from './nft-spam-info'
import { NftTokenUri } from './nft-token-uri'
import { Dayjs } from 'dayjs'
import { BigNumber } from 'ethers'

export interface Nft {
  id: string
  tokenId: BigNumber
  collection: NftCollection
  title: string | undefined
  description: string | undefined
  attributes: NftAttribute[]
  tokenUri: NftTokenUri | undefined
  media: NftMedia[]
  spamInfo: NftSpamInfo | undefined
  timeLastUpdated: Dayjs
}
