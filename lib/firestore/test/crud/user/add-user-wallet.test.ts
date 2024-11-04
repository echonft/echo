import { deleteNonce } from '@echo/firestore/crud/nonce/delete-nonce'
import { getNonce } from '@echo/firestore/crud/nonce/get-nonce'
import { addUser } from '@echo/firestore/crud/user/add-user'
import { addUserWallet } from '@echo/firestore/crud/user/add-user-wallet'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import * as updateReferenceModule from '@echo/firestore/helpers/reference/update-reference'
import { userDocumentMockCrew } from '@echo/firestore/mocks/user-document-mock'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { UserError } from '@echo/model/constants/errors/user-error'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import type { Address } from '@echo/model/types/address'
import { deleteUser } from '@echo/test/firestore/crud/user/delete-user'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, isNotNil, omit, pipe } from 'ramda'

type SpiedFn = typeof updateReferenceModule.updateReference
describe('addUserWallet', () => {
  let newNonceId: Nullable<string>
  let newUserIds: string[]
  let updateReferenceSpy: jest.MockedFunction<SpiedFn>

  beforeEach(() => {
    newNonceId = undefined
    newUserIds = []
    updateReferenceSpy = jest.spyOn(updateReferenceModule, 'updateReference') as jest.MockedFunction<SpiedFn>
    updateReferenceSpy.mockClear()
  })

  afterEach(async () => {
    if (isNotNil(newNonceId)) {
      await deleteNonce(newNonceId)
    }
    for (const userId of newUserIds) {
      await deleteUser(userId)
    }
    updateReferenceSpy.mockRestore()
  })

  it('throws if the user does not exist', async () => {
    await expect(addUserWallet({ userId: 'not-found', wallet: '0xaddress' })).rejects.toEqual(Error(UserError.NotFound))
  })

  it('throws if the user already has the wallet', async () => {
    const username = 'new-user'
    const data: UserDocument = assoc('username', username, userDocumentMockCrew)
    const {
      user: { id: userId }
    } = await addUser({ nonce: 'nonce', user: data })
    newUserIds = [userId]
    await expect(addUserWallet({ userId: newUserIds[0]!, wallet: '0xaddress' })).rejects.toEqual(
      Error(WalletError.Exists)
    )
  })

  it('throws if the wallet is already linked to another user', async () => {
    const username = 'new-user'
    const wallet: Address = '0xaddress'
    const data: UserDocument = pipe(omit(['wallet']), assoc('username', username))(userDocumentMockCrew)
    const {
      user: { id: userId },
      nonce
    } = await addUser({ nonce: 'nonce', user: data })
    newUserIds = [userId]
    newNonceId = nonce!.id
    const data2: UserDocument = pipe(assoc('username', 'another-user'), assoc('wallet', wallet))(userDocumentMockCrew)
    const {
      user: { id: user2Id }
    } = await addUser({ nonce: 'nonce', user: data2 })
    newUserIds.push(user2Id)
    await expect(addUserWallet({ userId: newUserIds[0]!, wallet: userDocumentMockCrew.wallet })).rejects.toEqual(
      Error(WalletError.Exists)
    )
  })

  it('adds the wallet to the user', async () => {
    const username = 'new-user'
    const wallet: Address = '0xaddress'
    const data: UserDocument = pipe(omit(['wallet']), assoc('username', username))(userDocumentMockCrew)
    const {
      user: { id: userId },
      nonce
    } = await addUser({ nonce: 'nonce', user: data })
    newUserIds = [userId]
    newNonceId = nonce!.id
    await addUserWallet({ userId: newUserIds[0]!, wallet })
    const user = await getUserById(newUserIds[0]!)
    expect(user).toStrictEqual(pipe(assoc('username', username), assoc('wallet', wallet))(userDocumentMockCrew))
    await expect(getNonce(newUserIds[0]!)).resolves.toBeUndefined()
  })
})
