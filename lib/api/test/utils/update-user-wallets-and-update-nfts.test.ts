/* eslint-disable @typescript-eslint/ban-ts-comment */
import { updateUserNfts } from '../../src/utils/handler/update-user-nfts'
import { updateUserWalletsAndUpdateNfts } from '../../src/utils/handler/update-user-wallets-and-update-nfts'
import { mockRequestResponse, WalletResponse } from '@echo/api-public'
import { updateUserWallets } from '@echo/firebase-admin'
import { userFirestoreData } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/utils/handler/update-user-nfts')
jest.mock('@echo/firebase-admin')
jest.mock('@echo/alchemy', () => ({
  getNftsForOwner: () => {}
}))

describe('utils - handler - updateUserWalletsAndUpdateNfts', () => {
  const mockUser = userFirestoreData['6rECUMhevHfxABZ1VNOm']!

  // @ts-ignore
  const mockedUpdateUserWallets = jest.mocked(updateUserWallets).mockResolvedValue({})
  // @ts-ignore
  const mockedUpdateUserNfts = jest.mocked(updateUserNfts).mockResolvedValue({})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if updateUserWallets rejects, returns 500', async () => {
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    mockedUpdateUserWallets.mockRejectedValueOnce('')
    await updateUserWalletsAndUpdateNfts(mockUser, mockUser.wallets, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Error updating user wallets' })
  })

  it('if updateUserNfts rejects, returns 500', async () => {
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    mockedUpdateUserNfts.mockRejectedValueOnce('')
    await updateUserWalletsAndUpdateNfts(mockUser, mockUser.wallets, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Error updating user NFTs' })
  })

  it('if success, returns 200 with wallets', async () => {
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await updateUserWalletsAndUpdateNfts(mockUser, mockUser.wallets, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ wallets: mockUser.wallets })
  })
})
