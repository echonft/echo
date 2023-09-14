import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import { nftMock } from '@echo/firestore-mocks/nft-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const getAllNftMocks = () => Object.values(nftMock) as NonEmptyArray<FirestoreNft>
