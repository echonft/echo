import { userMock } from './user-mock'
import { User } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

export const getAllUserMocks = () => Object.values(userMock) as NonEmptyArray<User>
