import { NftCollection } from '../../src/types/model/nft-collection'
import { nftCollectionMock } from './nft-collection-mock'
import { NonEmptyArray } from '@echo/utils'

export const getAllCollectionMocks = () => Object.values(nftCollectionMock) as NonEmptyArray<NftCollection>
