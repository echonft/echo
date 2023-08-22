import { User } from '../../src/types/model/user'
import { userMock } from './user-mock'
import { NonEmptyArray } from '@echo/utils'

export const getAllUserMocks = () => Object.values(userMock) as NonEmptyArray<User>
