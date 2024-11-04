import { deleteNonce } from '@echo/firestore/crud/nonce/delete-nonce'
import { getNonce } from '@echo/firestore/crud/nonce/get-nonce'
import { addUser } from '@echo/firestore/crud/user/add-user'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import * as setReferenceModule from '@echo/firestore/helpers/reference/set-reference'
import { userDocumentMockCrew } from '@echo/firestore/mocks/user-document-mock'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { deleteUser } from '@echo/test/firestore/crud/user/delete-user'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, isNotNil, omit, pipe } from 'ramda'

type SpiedFn = typeof setReferenceModule.setReference
describe('addUser', () => {
  let newNonceId: Nullable<string>
  let newUserId: Nullable<string>
  let setReferenceSpy: jest.MockedFunction<SpiedFn>

  beforeEach(() => {
    newNonceId = undefined
    newUserId = undefined
    setReferenceSpy = jest.spyOn(setReferenceModule, 'setReference') as jest.MockedFunction<SpiedFn>
    setReferenceSpy.mockClear()
  })

  afterEach(async () => {
    if (isNotNil(newNonceId)) {
      await deleteNonce(newNonceId)
    }
    if (isNotNil(newUserId)) {
      await deleteUser(newUserId)
    }
    setReferenceSpy.mockRestore()
  })

  it('adds the user and nonce', async () => {
    const nonce = 'nonce'
    const data: UserDocument = pipe(omit(['wallet']), assoc('username', 'new-user'))(userDocumentMockCrew)
    const {
      user: { id },
      nonce: addedNonce
    } = await addUser({ nonce, user: data })
    newUserId = id
    newNonceId = addedNonce!.id
    const user = await getUserById(newUserId)
    expect(user).toStrictEqual(data)
    const addedNonceDocument = await getNonce(newUserId)
    expect(addedNonceDocument).toStrictEqual({ userId: newUserId, nonce })
  })

  it('does not create the user if it already exists', async () => {
    const nonce = 'nonce'
    const data = assoc('username', 'new-user', userDocumentMockCrew)
    const {
      user: { id },
      nonce: addedNonce
    } = await addUser({ nonce, user: data })
    newUserId = id
    newNonceId = addedNonce!.id
    setReferenceSpy.mockClear()
    const {
      user: { id: sameUserId, data: sameUserData }
    } = await addUser({ nonce, user: data })
    expect(setReferenceSpy).not.toHaveBeenCalled()
    expect(sameUserId).toEqual(newUserId)
    expect(sameUserData).toStrictEqual(data)
  })
})
