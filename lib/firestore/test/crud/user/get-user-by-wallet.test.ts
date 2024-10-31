import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { userDocumentMockCrew } from '@echo/firestore/mocks/user-document-mock'
import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - getUserByWallet', () => {
  it('returns undefined if the wallet does not exist', async () => {
    const owner = await getUserByWallet({ address: '0xnotfound', vm: VirtualMachine.Evm })
    expect(owner).toBeUndefined()
  })
  it('returns the wallet owner if wallet exists', async () => {
    const owner = await getUserByWallet(walletMockCrew)
    expect(owner).toStrictEqual(userDocumentMockCrew)
  })
})
