/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createWalletHandler } from '../../src/handlers/user/create-wallet-handler'
import { updateUserNfts } from '../../src/utils/handler/update-user-nfts'
import { mockRequestResponse } from '../mocks/request-response'
import { userFirestoreData } from '../mocks/user-firestore-data'
import { WalletResponse } from '@echo/api-public'
import { findNonceForUser, findUserByWallet, FirestoreNonceData, updateUserWallets } from '@echo/firestore'
import { Signature } from '@echo/ui'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { SiweMessage, SiweResponse, VerifyOpts, VerifyParams } from 'siwe'

jest.mock('../../src/utils/handler/update-user-nfts')
jest.mock('siwe')
jest.mock('@echo/firestore')
jest.mock('@echo/alchemy', () => ({
  getNftsForOwner: () => Promise.resolve([])
}))

describe('handlers - user - createWalletHandler', () => {
  const user = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  const wallet = user.wallets[0]!
  const signature = '0xtest'
  const nonce = 'nonce'
  const mockedMessage = jest.mocked(SiweMessage)
  const mockedFindNonce = jest.mocked(findNonceForUser)
  const mockedUpdateWallets = jest.mocked(updateUserWallets)
  // @ts-ignore
  const mockedFindUserByWallet = jest.mocked(findUserByWallet).mockResolvedValue(user)
  // @ts-ignore
  jest.mocked(updateUserNfts).mockResolvedValue(true)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if wallet throws, returns 401', async () => {
    mockedFindUserByWallet.mockRejectedValueOnce(new Error('test'))
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot find wallet' })
  })
  it('if wallet already exists on another user, returns 401', async () => {
    mockedFindUserByWallet.mockResolvedValueOnce({ ...user, id: 'test' })
    const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
    await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Wallet is already linked to another account' })
  })
  it('if signature throws, returns 401', async () => {
    // @ts-ignore
    mockedMessage.mockImplementation(() => ({
      domain: '',
      address: '0xtest',
      statement: 'test invalid signature',
      uri: '',
      version: '1',
      chainId: 1,
      nonce: '',
      issuedAt: '',
      regexFromMessage: jest.fn(),
      toMessage: jest.fn(),
      signMessage: jest.fn(),
      prepareMessage: jest.fn(),
      verify: jest.fn((_params: VerifyParams, _opts?: VerifyOpts | undefined) => Promise.reject<SiweResponse>())
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

  it('if invalid signature, returns 401', async () => {
    // @ts-ignore
    mockedMessage.mockImplementation(() => ({
      domain: '',
      address: '0xtest',
      statement: 'test invalid signature',
      uri: '',
      version: '1',
      chainId: 1,
      nonce: '',
      issuedAt: '',
      regexFromMessage: jest.fn(),
      toMessage: jest.fn(),
      signMessage: jest.fn(),
      prepareMessage: jest.fn(),
      verify: jest.fn((_params: VerifyParams, _opts?: VerifyOpts | undefined) =>
        // @ts-ignore
        Promise.resolve<SiweResponse>({ data: { nonce: nonce }, success: false })
      )
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
      // @ts-ignore
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
        verify: jest.fn((_params: VerifyParams, _opts?: VerifyOpts | undefined) =>
          // @ts-ignore
          Promise.resolve<SiweResponse>({ data: { nonce: nonce }, success: true })
        )
      }))
    })
    it('if nonce not found, returns 403', async () => {
      mockedFindNonce.mockRejectedValue(new Error())
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(403)
      expect(res._getJSONData()).toEqual({ error: 'No nonce found for user.' })
    })
    it('if nonce is invalid, returns 422', async () => {
      mockedFindNonce.mockResolvedValue({ nonce: 'test' } as FirestoreNonceData)
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(422)
      expect(res._getJSONData()).toEqual({ error: 'Invalid nonce.' })
    })
    it('if nonce is valid but error on update, returns 500', async () => {
      mockedFindNonce.mockResolvedValue({ nonce } as FirestoreNonceData)
      mockedUpdateWallets.mockRejectedValue(new Error())
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Error updating user wallets' })
    })
    it('if nonce is valid but no new wallet, returns wallets', async () => {
      mockedFindNonce.mockResolvedValue({ nonce } as FirestoreNonceData)
      mockedUpdateWallets.mockResolvedValue(undefined)
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, wallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: user.wallets })
    })
    it('if nonce is valid and adding wallet (empty), returns new wallets', async () => {
      mockedFindNonce.mockResolvedValue({ nonce } as FirestoreNonceData)
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
      mockedFindNonce.mockResolvedValue({ nonce } as FirestoreNonceData)
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
      mockedFindNonce.mockResolvedValue({ nonce } as FirestoreNonceData)
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, newWallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: [newWallet, ...user.wallets] })
    })
    it('if nonce is valid and user already has that wallet linked,  returns new wallets', async () => {
      const newWallet = { ...wallet, address: 'test' }
      mockedFindNonce.mockResolvedValue({ nonce } as FirestoreNonceData)
      mockedFindUserByWallet.mockResolvedValueOnce(user)
      const { res } = mockRequestResponse<never, never, WalletResponse>('GET')
      await createWalletHandler(user, newWallet, mockedMessage as unknown as SiweMessage, signature, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ wallets: [newWallet, ...user.wallets] })
    })
  })
})
