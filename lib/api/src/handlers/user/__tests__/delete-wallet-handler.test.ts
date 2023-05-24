import { WalletResponse } from '../../../types/model/responses/wallet-response'
import { mockRequestResponse } from '../../../utils/test/mocks/request-response'
import { deleteWalletHandler } from '../delete-wallet-handler'
import { updateUserWallets } from '@echo/firebase-admin'
import { users } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firebase-admin')

describe('handlers - user - deleteWalletHandler', () => {
  const mockedUpdateWallets = jest.mocked(updateUserWallets)
  const user = users['oE6yUEQBPn7PZ89yMjKn']!
  const wallet = user.wallets![0]!
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if error on update, returns 500', async () => {
    mockedUpdateWallets.mockRejectedValue(undefined)
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await deleteWalletHandler(user, [wallet], res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'User not found' })
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
    const singleWalletUser = { ...user, wallets: [user.wallets![0]!] }
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await deleteWalletHandler(singleWalletUser, [wallet], res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ wallets: [] })
  })
  it('if valid, returns user wallets minus the deleted wallet (multiple)', async () => {
    const newWallet = { ...wallet, address: 'test' }
    mockedUpdateWallets.mockResolvedValue(undefined)
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await deleteWalletHandler({ ...user, wallets: user.wallets?.concat(newWallet) }, user.wallets!, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ wallets: [newWallet] })
  })
})
