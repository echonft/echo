import { userMock } from './user-mock'
import { User } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'

export const getAllUserMocks = () => Object.values(userMock) as NonEmptyArray<User>
