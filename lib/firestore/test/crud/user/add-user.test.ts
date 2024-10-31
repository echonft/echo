import { addUser } from '@echo/firestore/crud/user/add-user'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import * as setReferenceModule from '@echo/firestore/helpers/reference/set-reference'
import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import type { Wallet } from '@echo/model/types/wallet'
import { deleteUser } from '@echo/test/firestore/crud/user/delete-user'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { isNotNil } from 'ramda'

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

  it('adds the user if it does not exist in the database', async () => {
    const wallet: Wallet = {
      address: '0xaddress',
      vm: VirtualMachine.Evm
    }
    newUserId = await addUser(wallet)
    const user = await getUserById(newUserId)
    expect(user).toStrictEqual({ wallet })
  })

  it('does not create the user if it already exists and returns the id', async () => {
    const wallet: Wallet = {
      address: '0xaddress',
      vm: VirtualMachine.Evm
    }
    newUserId = await addUser(wallet)
    setReferenceSpy.mockClear()
    const sameUserId = await addUser(wallet)
    expect(setReferenceSpy).not.toHaveBeenCalled()
    expect(sameUserId).toEqual(newUserId)
  })
})
