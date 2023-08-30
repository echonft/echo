import { getSiweMessage } from '../../../src/helpers/auth/get-siwe-message'
import { verifySiweMessage } from '../../../src/helpers/auth/verify-siwe-message'
import { ApiError } from '../../../src/helpers/error/api-error'
import { addUserWallet } from '../../../src/helpers/user/add-user-wallet'
import { findUserByWallet } from '../../../src/helpers/user/find-user-by-wallet'
import { updateUserNfts } from '../../../src/helpers/user/update-user-nfts'
import { addWalletRequestHandler } from '../../../src/request-handlers/user/add-wallet-request-handler'
import { mockRequestResponse } from '../../mocks/request-response'
import { AddWalletRequest, EmptyResponse } from '@echo/api-public'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { SiweMessage } from 'siwe'

jest.mock('../../../src/helpers/user/find-user-by-wallet')
jest.mock('../../../src/helpers/auth/verify-siwe-message')
jest.mock('../../../src/helpers/user/add-user-wallet')
jest.mock('../../../src/helpers/user/update-user-nfts')
jest.mock('../../../src/helpers/auth/get-siwe-message')

describe('request-handlers - user - handleAddWallet', () => {
  const validSiweMessage = new SiweMessage({
    domain: 'echo.xyz',
    address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
    statement: 'Sign in to add this wallet to your account',
    uri: 'https://echo.xyz',
    version: '1',
    chainId: 1,
    nonce: 'noncenoncenoncenoncenonce'
  })
  const validSignature = '0x000'
  const validWallet = {
    chainId: 1,
    address: '0x12c63bbD266dB84e117356e664f3604055166CEc'
  }
  const validRequest: AddWalletRequest = {
    message: validSiweMessage,
    signature: validSignature,
    wallet: validWallet
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const { req, res } = mockRequestResponse<AddWalletRequest, never, EmptyResponse>(
      'PUT',
      undefined,
      {} as AddWalletRequest
    )
    try {
      await addWalletRequestHandler(req, res, { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the wallet is already linked to this account', async () => {
    jest.mocked(findUserByWallet).mockResolvedValueOnce({ id: 'userId' } as User)
    const { req, res } = mockRequestResponse<AddWalletRequest, never, EmptyResponse>('PUT', undefined, validRequest)
    try {
      await addWalletRequestHandler(req, res, { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the wallet is already linked to another account', async () => {
    jest.mocked(findUserByWallet).mockResolvedValueOnce({ id: 'userId' } as User)
    const { req, res } = mockRequestResponse<AddWalletRequest, never, EmptyResponse>('PUT', undefined, validRequest)
    try {
      await addWalletRequestHandler(req, res, { id: 'another-id' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if the siwe message cannot be validated', async () => {
    jest.mocked(findUserByWallet).mockResolvedValueOnce(undefined)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ data: {} as SiweMessage, success: false })
    const { req, res } = mockRequestResponse<AddWalletRequest, never, EmptyResponse>('PUT', undefined, validRequest)
    try {
      await addWalletRequestHandler(req, res, { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the nonce is not the same as the user nonce', async () => {
    jest.mocked(findUserByWallet).mockResolvedValueOnce(undefined)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ data: { nonce: 'nonce' } as SiweMessage, success: true })
    const { req, res } = mockRequestResponse<AddWalletRequest, never, EmptyResponse>('PUT', undefined, validRequest)
    try {
      await addWalletRequestHandler(req, res, { id: 'userId', nonce: 'another-nonce' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the wallet is not already in the db and the nonce is valid', async () => {
    jest.mocked(findUserByWallet).mockResolvedValueOnce(undefined)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ data: { nonce: 'nonce' } as SiweMessage, success: true })
    jest.mocked(addUserWallet).mockResolvedValueOnce()
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    const { req, res } = mockRequestResponse<AddWalletRequest, never, EmptyResponse>('PUT', undefined, validRequest)
    await addWalletRequestHandler(req, res, { id: 'userId', nonce: 'nonce' } as User)
    expect(addUserWallet).toHaveBeenCalledTimes(1)
    expect(updateUserNfts).toHaveBeenCalledTimes(1)
    expect(res.statusCode).toBe(200)
  })
})
