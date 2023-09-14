import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import { nftCollectionMock } from '@echo/firestore-mocks/nft-collection-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const getAllNftCollectionMocks = () => Object.values(nftCollectionMock) as NonEmptyArray<FirestoreNftCollection>
