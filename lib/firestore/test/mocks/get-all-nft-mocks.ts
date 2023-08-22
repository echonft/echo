import { Nft } from '../../src/types/model/nft'
import { nftMock } from './nft-mock'
import { NonEmptyArray } from '@echo/utils'

export const getAllNftMocks = () => Object.values(nftMock) as NonEmptyArray<Nft>
