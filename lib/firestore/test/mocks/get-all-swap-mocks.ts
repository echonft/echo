import { Swap } from '../../src/types/model/swap'
import { swapMock } from './swap-mock'
import { NonEmptyArray } from '@echo/utils'

export const getAllSwapMocks = () => Object.values(swapMock) as NonEmptyArray<Swap>
