import { nftMock } from './nft-mock'
import { Nft } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

export const getAllNftMocks = () => Object.values(nftMock) as NonEmptyArray<Nft>
