/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createWalletHandler } from '../../src/handlers/user/create-wallet-handler'
import { WalletResponse } from '../../src/types/model/responses/wallet-response'
import { mockRequestResponse } from '../../src/utils/test/mocks/request-response'
import { findNonceForUser, findUserByWallet, updateUserWallets } from '@echo/firebase-admin'
import { userFirestoreData } from '@echo/firestore'
import { Signature } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import { SiweMessage } from 'siwe'

jest.mock('siwe')
jest.mock('@echo/firebase-admin')

describe('handlers - user - createWalletHandler', () => {
  const mockedMessage = jest.mocked(SiweMessage)
  const mockedFindNonce = jest.mocked(findNonceForUser)
  const mockedUpdateWallets = jest.mocked(updateUserWallets)
  const mockedFindUserByWallet = jest.mocked(findUserByWallet).mockResolvedValue(R.fromNullable(null, new Error()))
  const user = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  const wallet = user.wallets[0]!
  const signature = '0xtest'
  const nonce = 'nonce'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if wallet throws, returns 401', async () => {
    mockedFindUserByWallet.mockRejectedValueOnce(new Error())
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Could not validate wallet' })
  })
  it('if wallet already exists on another user, returns 401', async () => {
    mockedFindUserByWallet.mockResolvedValueOnce(R.fromNullable({ ...user, id: 'test' }, new Error()))
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Wallet is already linked to another account' })
  })
  it('if invalid signature, returns 401', async () => {
    mockedMessage.mockImplementation(() => ({
      domain: '',
      address: '0xtest',
      statement: 'test',
      uri: '',
      version: '1',
      chainId: 1,
      nonce: '',
      issuedAt: '',
      regexFromMessage: jest.fn(),
      toMessage: jest.fn(),
      signMessage: jest.fn(),
      prepareMessage: jest.fn(),
      validate: jest.fn(async (_signature, _provider) => Promise.reject<SiweMessage>())
    }))
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await createWalletHandler(
      user,
      wallet,
      { validate: (_signature: Signature) => Promise.reject<SiweMessage>() } as unknown as SiweMessage,
      signature,
      res
    )
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Could not validate message' })
  })
  describe('if valid signature', () => {
    beforeEach(() => {
      mockedMessage.mockImplementation(() => ({
        domain: '',
        address: '0xtest',
        statement: 'test',
        uri: '',
        version: '1',
        chainId: 1,
        nonce,
        issuedAt: '',
        regexFromMessage: jest.fn(),
        toMessage: jest.fn(),
        signMessage: jest.fn(),
        prepareMessage: jest.fn(),
        validate: jest.fn((_signature, _provider) => Promise.resolve({ nonce } as SiweMessage))
      }))
    })
    it('if nonce not found, returns 403', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy('', new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(403)
      expect(res._getJSONData()).toEqual({ error: 'No nonce found for user.' })
    })
    it('if nonce not found, returns 403', async () => {
      mockedFindNonce.mockRejectedValue(R.fromFalsy('', new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(403)
      expect(res._getJSONData()).toEqual({ error: 'No nonce found for user.' })
    })
    it('if nonce is invalid, returns 422', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy('test', new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(422)
      expect(res._getJSONData()).toEqual({ error: 'Invalid nonce.' })
    })
    it('if nonce is valid but error on update, returns 500', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      mockedUpdateWallets.mockRejectedValue(undefined)
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'User not found' })
    })
    it('if nonce is valid but no new wallet, returns wallets', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      mockedUpdateWallets.mockResolvedValue(undefined)
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: user.wallets })
    })
    it('if nonce is valid and adding wallet (empty), returns new wallets', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(
        { ...user, wallets: [] },
        wallet,
        mockedMessage as unknown as SiweMessage,
        signature,
        res
      )
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: [wallet] })
    })
    it('if nonce is valid and adding wallet (undefined), returns new wallets', async () => {
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(
        // @ts-ignore
        { ...user, wallets: undefined },
        wallet,
        mockedMessage as unknown as SiweMessage,
        signature,
        res
      )
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: [wallet] })
    })
    it('if nonce is valid and adding wallet (multiple), returns new wallets', async () => {
      const newWallet = { ...wallet, address: 'test' }
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, newWallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: [newWallet, ...user.wallets] })
    })
    it('if nonce is valid and user already has that wallet linked,  returns new wallets', async () => {
      const newWallet = { ...wallet, address: 'test' }
      mockedFindNonce.mockResolvedValue(R.fromFalsy(nonce, new Error()))
      mockedFindUserByWallet.mockResolvedValueOnce(R.fromFalsy(user, new Error()))
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, newWallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: [newWallet, ...user.wallets] })
    })
  })
})
