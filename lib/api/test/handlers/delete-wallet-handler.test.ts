import { deleteWalletHandler } from '../../src/handlers/user/delete-wallet-handler'
import { updateUserNfts } from '../../src/utils/handler/update-user-nfts'
import { mockRequestResponse, WalletResponse } from '@echo/api-public'
import { updateUserWallets } from '@echo/firebase-admin'
import { userFirestoreData } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/utils/handler/update-user-nfts')
jest.mock('@echo/firebase-admin')
jest.mock('@echo/alchemy', () => ({
  getNftsForOwner: () => Promise.resolve([])
}))

describe('handlers - user - deleteWalletHandler', () => {
  const mockedUpdateWallets = jest.mocked(updateUserWallets)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  jest.mocked(updateUserNfts).mockResolvedValue(true)
  const user = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  const wallet = user.wallets[0]!

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if error on update, returns 500', async () => {
    mockedUpdateWallets.mockRejectedValue(new Error())
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await deleteWalletHandler(user, [wallet], res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Error updating user wallets' })
  })
  it('if valid but wrong wallet to remove, returns wallets', async () => {
    mockedUpdateWallets.mockResolvedValue(undefined)
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await deleteWalletHandler(user, [{ ...wallet, address: 'test' }], res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ wallets: user.wallets })
  })
  it('if valid but no wallet (undefined), returns empty array', async () => {
    mockedUpdateWallets.mockResolvedValue(undefined)
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await deleteWalletHandler({ ...user, wallets: undefined }, [wallet], res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ wallets: [] })
  })
  it('if valid but no wallet (empty), returns empty array', async () => {
    mockedUpdateWallets.mockResolvedValue(undefined)
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await deleteWalletHandler({ ...user, wallets: [] }, [wallet], res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ wallets: [] })
  })
  it('if valid, returns user wallets minus the deleted wallet (single)', async () => {
    mockedUpdateWallets.mockResolvedValue(undefined)
    const singleWalletUser = { ...user, wallets: [user.wallets[0]!] }
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await deleteWalletHandler(singleWalletUser, [wallet], res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ wallets: [] })
  })
  it('if valid, returns user wallets minus the deleted wallet (multiple)', async () => {
    const newWallet = { ...wallet, address: 'test' }
    mockedUpdateWallets.mockResolvedValue(undefined)
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await deleteWalletHandler({ ...user, wallets: user.wallets?.concat(newWallet) }, user.wallets, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ wallets: [newWallet] })
  })
})
