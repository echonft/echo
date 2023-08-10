import { createWalletHandler } from '../../src/handlers/user/create-wallet-handler'
import { deleteWalletHandler } from '../../src/handlers/user/delete-wallet-handler'
import { walletHandler } from '../../src/handlers/user/wallet-handler'
import { mockRequestResponse, mockSession, WalletRequest, WalletResponse } from '@echo/api-public'
import { FirestoreUserData, userFirestoreData } from '@echo/firestore'
import { Wallet } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { SiweMessage } from 'siwe'

jest.mock('../../src/handlers/user/create-wallet-handler')
jest.mock('../../src/handlers/user/delete-wallet-handler')
jest.mock('@echo/alchemy', () => ({
  getNftsForOwner: () => Promise.resolve([])
}))

describe('handlers - user - walletHandler', () => {
  const mockedCreateWallet = jest.mocked(createWalletHandler)
  const mockedDeleteWallet = jest.mocked(deleteWalletHandler)
  const message: SiweMessage = new SiweMessage({
    domain: 'domain',
    address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
    statement: 'test',
    uri: 'https://bleh.com',
    version: '1',
    chainId: 1,
    nonce: 'nonce1234567'
  })
  const wallet = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!.wallets[0]!
  const signature = '0x0000'
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const session = mockSession
  it('if no session, returns 401', async () => {
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('GET')
    await walletHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if no user, returns 401', async () => {
    const noUserSession = { ...mockSession, user: undefined as unknown as FirestoreUserData }
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('GET')
    await walletHandler(req, res, noUserSession)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User not found' })
  })
  it('if wrong method, returns 500', async () => {
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('GET')
    await walletHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Unhandled error' })
  })
  it('if wrong body (PUT), returns 400', async () => {
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('PUT')
    await walletHandler(req, res, session)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
  })
  it('if wrong body (DELETE), returns 400', async () => {
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('PUT', undefined, {
      wallet: undefined as unknown as Wallet
    })
    await walletHandler(req, res, session)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
  })
  it('if PUT correct, calls create handler', async () => {
    mockedCreateWallet.mockResolvedValue(undefined)
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('PUT', undefined, {
      wallet,
      signature,
      message
    })
    await walletHandler(req, res, session)
    expect(mockedCreateWallet).toBeCalled()
  })
  it('if DELETE correct, calls delete handler', async () => {
    mockedDeleteWallet.mockResolvedValue(undefined)
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('DELETE', undefined, {
      wallet: [wallet]
    })
    await walletHandler(req, res, session)
    expect(mockedDeleteWallet).toBeCalled()
  })
})
