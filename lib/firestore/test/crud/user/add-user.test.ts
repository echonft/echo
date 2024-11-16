import { addUser } from '@echo/firestore/crud/user/add-user'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import * as setReferenceModule from '@echo/firestore/helpers/reference/set-reference'
import { userDocumentMockCrew } from '@echo/firestore/mocks/user-document-mock'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { deleteUser } from '@echo/test/firestore/crud/user/delete-user'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, isNotNil } from 'ramda'

type SpiedFn = typeof setReferenceModule.setReference
describe('addUser', () => {
  let newUserId: Nullable<string>
  let setReferenceSpy: jest.MockedFunction<SpiedFn>

  beforeEach(() => {
    newUserId = undefined
    setReferenceSpy = jest.spyOn(setReferenceModule, 'setReference') as jest.MockedFunction<SpiedFn>
    setReferenceSpy.mockClear()
  })

  afterEach(async () => {
    if (isNotNil(newUserId)) {
      await deleteUser(newUserId)
    }
    setReferenceSpy.mockRestore()
  })

  it('adds the user', async () => {
    const data: UserDocument = assoc('username', 'new-user', userDocumentMockCrew)
    const { id } = await addUser(data)
    newUserId = id
    const user = await getUserById(newUserId)
    expect(user).toStrictEqual(data)
  })

  it('does not create the user if it already exists', async () => {
    const data = assoc('username', 'new-user', userDocumentMockCrew)
    const { id } = await addUser(data)
    newUserId = id
    setReferenceSpy.mockClear()
    const newDocument = await addUser(data)
    expect(setReferenceSpy).not.toHaveBeenCalled()
    expect(newDocument.id).toEqual(newUserId)
    expect(newDocument.data).toStrictEqual(data)
  })
})
