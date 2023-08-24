import { NftCollection } from '../../src/types/model/nft-collection'
import { nftCollectionMock } from './nft-collection-mock'
import { NonEmptyArray } from '@echo/utils'

export const getAllNftCollectionMocks = () => Object.values(nftCollectionMock) as NonEmptyArray<NftCollection>
