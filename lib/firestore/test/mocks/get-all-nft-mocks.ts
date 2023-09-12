import { nftMock } from './nft-mock'
import { Nft } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'

export const getAllNftMocks = () => Object.values(nftMock) as NonEmptyArray<Nft>
