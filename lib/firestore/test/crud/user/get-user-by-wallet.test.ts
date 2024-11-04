import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { userDocumentMockCrew } from '@echo/firestore/mocks/user-document-mock'
import { userMockCrew } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - getUserByWallet', () => {
  it('returns undefined if the wallet does not exist', async () => {
    const owner = await getUserByWallet('0xnotfound')
    expect(owner).toBeUndefined()
  })
  it('returns the wallet owner if wallet exists', async () => {
    const owner = await getUserByWallet(userMockCrew.wallet)
    expect(owner).toStrictEqual(userDocumentMockCrew)
  })
})
