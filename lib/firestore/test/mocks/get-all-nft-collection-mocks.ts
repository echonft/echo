import { nftCollectionMock } from './nft-collection-mock'
import { NftCollection } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'

export const getAllNftCollectionMocks = () => Object.values(nftCollectionMock) as NonEmptyArray<NftCollection>
