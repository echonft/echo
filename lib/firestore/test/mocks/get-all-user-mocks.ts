import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { userMock } from '@echo/firestore-mocks/user-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const getAllUserMocks = () => Object.values(userMock) as NonEmptyArray<FirestoreUser>
