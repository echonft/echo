import { addUser } from '@echo/firestore/crud/user/add-user'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { UserError } from '@echo/model/constants/errors/user-error'
import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import type { Wallet } from '@echo/model/types/wallet'
import { deleteUser } from '@echo/test/firestore/crud/user/delete-user'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNotNil } from 'ramda'

describe('updateUser', () => {
  let newUserId: Nullable<string>

  beforeEach(() => {
    newUserId = undefined
  })

  afterEach(async () => {
    if (isNotNil(newUserId)) {
      await deleteUser(newUserId)
    }
  })

  it('throws if the user does not exist', async () => {
    const updateData: Record<'id', string> & Pick<UserDocument, 'discord'> = {
      id: 'not-found',
      discord: {
        id: 'discord-id',
        globalName: 'global-name',
        avatarUrl: 'avatar-url',
        username: 'username'
      }
    }
    await expect(updateUser(updateData)).rejects.toEqual(Error(UserError.NotFound))
  })

  it('updates the user if it exists', async () => {
    const wallet: Wallet = {
      address: '0xaddress',
      vm: VirtualMachine.Evm
    }
    const updateData: Pick<UserDocument, 'discord'> = {
      discord: {
        id: 'discord-id',
        globalName: 'global-name',
        avatarUrl: 'avatar-url',
        username: 'username'
      }
    }
    newUserId = await addUser(wallet)
    await updateUser(assoc('id', newUserId, updateData))
    const user = await getUserById(newUserId)
    expect(user).toStrictEqual({
      discord: {
        id: 'discord-id',
        globalName: 'global-name',
        avatarUrl: 'avatar-url',
        username: 'username'
      },
      username: 'username',
      wallet: {
        address: '0xaddress',
        vm: VirtualMachine.Evm
      }
    })
  })
})
