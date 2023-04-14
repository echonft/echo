import { WalletResponse } from '../../../types/models/responses/wallet-response'
import { mockRequestResponse } from '../../../utils/test/mocks/request-response'
import { createWalletHandler } from '../create-wallet-handler'
import { findNonceForUser, updateUserWallets } from '@echo/firebase-admin'
import { generateMockWallet, mockUser, mockWallet } from '@echo/model'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import { SiweMessage } from 'siwe'

jest.mock('siwe')
jest.mock('@echo/firebase-admin')

describe('handlers - user - createWalletHandler', () => {
  const mockedMessage = jest.mocked(SiweMessage)
  const mockedFindNonce = jest.mocked(findNonceForUser)
  const mockedUpdateWallets = jest.mocked(updateUserWallets)
  const message: SiweMessage = {
    domain: '',
    address: '0xtest',
    statement: 'test',
    uri: '',
    version: '1',
    chainId: 1,
    nonce: '',
    issuedAt: '',
    regexFromMessage: function (_message: string): RegExpExecArray {
      throw new Error('Function not implemented.')
    },
    toMessage: function (): string {
      throw new Error('Function not implemented.')
    },
    signMessage: function (): string {
      throw new Error('Function not implemented.')
    },
    prepareMessage: function (): string {
      throw new Error('Function not implemented.')
    },
    validate: function (_signature?: string, _provider?: never): Promise<SiweMessage> {
      throw new Error('Function not implemented.')
    }
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
    it('if nonce is valid but error on update, returns 500', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      mockedUpdateWallets.mockRejectedValue(undefined)
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, message, signature, res)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'User not found' })
    })
    it('if nonce is valid but no new wallet, returns wallets', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      mockedUpdateWallets.mockResolvedValue(undefined)
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, message, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: user.wallets })
    })
    it('if nonce is valid and adding wallet (empty), returns new wallets', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler({ ...user, wallets: [] }, wallet, message, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: [wallet] })
    })
    it('if nonce is valid and adding wallet (undefined), returns new wallets', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler({ ...user, wallets: undefined }, wallet, message, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: [wallet] })
    })
    it('if nonce is valid and adding wallet (multiple), returns new wallets', async () => {
      const newWallet = generateMockWallet({ address: 'test' })
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, newWallet, message, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: user.wallets?.concat(newWallet) })
    })
  })
})
