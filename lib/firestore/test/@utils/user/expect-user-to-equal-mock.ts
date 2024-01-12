import type { User } from '@echo/firestore/types/model/user/user'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { expect } from '@jest/globals'
import { omit } from 'ramda'

export function expectUserToEqualMock(user: User | undefined) {
  expect(user).toBeDefined()
  expect(omit(['createdAt', 'updatedAt'], getUserMockById(user!.id))).toStrictEqual(
    omit(['createdAt', 'updatedAt'], user)
  )
}
