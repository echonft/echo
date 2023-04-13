import { WalletResponse } from '../../../types/models/responses/wallet-response'
import { mockRequestResponse } from '../../../utils/test/mocks/request-response'
import { createWalletHandler } from '../create-wallet-handler'
import { findNonceForUser } from '@echo/firebase-admin'
import { mockUser, mockWallet } from '@echo/model'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import { SiweMessage } from 'siwe'

jest.mock('siwe')
jest.mock('@echo/firebase-admin')

describe('handlers - user - walletHandler', () => {
  const mockedMessage = jest.mocked(SiweMessage)
  const mockedFindNonce = jest.mocked(findNonceForUser)
  const message: SiweMessage = {
    domain: '',
    address: '0xtest',
    statement: 'test',
    uri: '',
    version: '1',
    chainId: 1
  }
  const user = mockUser
  const wallet = mockWallet
  const signature = '0xtest'
  const nonce = 'nonce'
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('if invalid signature, returns 401', async () => {
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await createWalletHandler(user, wallet, message, signature, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Could not validate message' })
  })
  it('if invalid signature, returns 401', async () => {
    mockedMessage.mockImplementation(() => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validate: async () => Promise.reject({ nonce })
    }))
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await createWalletHandler(user, wallet, message, signature, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Could not validate message' })
  })
  describe('if valid signature', () => {
    beforeEach(() => {
      mockedMessage.mockImplementation(() => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        validate: async () => Promise.resolve({ nonce })
      }))
    })
    it('if nonce not found, returns 403', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy('', new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, message, signature, res)
      expect(res.statusCode).toBe(403)
      expect(res._getJSONData()).toEqual({ error: 'No nonce found for user.' })
    })
    it('if nonce is invalid, returns 422', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy('test', new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, message, signature, res)
      expect(res.statusCode).toBe(422)
      expect(res._getJSONData()).toEqual({ error: 'Invalid nonce.' })
    })
    it('if nonce is valid but no new wallet, returns wallets', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, message, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: user.wallets })
    })
    it('if nonce is valid and adding wallet, returns new wallets', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler({ ...user, wallets: [] }, wallet, message, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: [wallet] })
    })
  })
})
