import { nftCollectionMock } from './nft-collection-mock'
import { NftCollection } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

export const getAllNftCollectionMocks = () => Object.values(nftCollectionMock) as NonEmptyArray<NftCollection>
