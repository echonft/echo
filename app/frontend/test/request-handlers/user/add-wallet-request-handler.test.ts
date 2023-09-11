import { mockRequest } from '../../mocks/request-response'
import { AddWalletRequest } from '@echo/api'
import { User } from '@echo/firestore-types'
import { getSession } from '@server/helpers/auth/get-session'
import { getSiweMessage } from '@server/helpers/auth/get-siwe-message'
import { verifySiweMessage } from '@server/helpers/auth/verify-siwe-message'
import { ApiError } from '@server/helpers/error/api-error'
import { addUserWallet } from '@server/helpers/user/add-user-wallet'
import { getUserById } from '@server/helpers/user/get-user-by-id'
import { getUserByWallet } from '@server/helpers/user/get-user-by-wallet'
import { updateUserNfts } from '@server/helpers/user/update-user-nfts'
import { addWalletRequestHandler } from '@server/request-handlers/user/add-wallet-request-handler'
import { AuthOptions, Session } from 'next-auth'
import { SiweMessage } from 'siwe'

jest.mock('@server/helpers/auth/get-session')
jest.mock('@server/helpers/user/get-user-by-id')
jest.mock('@server/helpers/user/get-user-by-wallet')
jest.mock('@server/helpers/auth/verify-siwe-message')
jest.mock('@server/helpers/user/add-user-wallet')
jest.mock('@server/helpers/user/update-user-nfts')
jest.mock('@server/helpers/auth/get-siwe-message')

describe('request-handlers - user - addWalletRequestHandler', () => {
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
  const session = {
    user: {
      id: 'userId'
    }
  } as unknown as Session

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the user is not authenticated', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(null)
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if the request cannot be parsed', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    const req = mockRequest<AddWalletRequest>({} as AddWalletRequest)
    try {
      await addWalletRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the wallet is already linked to this account', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(getUserByWallet).mockResolvedValueOnce({ id: 'userId' } as User)
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the wallet is already linked to another account', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(getUserByWallet).mockResolvedValueOnce({ id: 'another-userId' } as User)
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if the siwe message cannot be validated', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(getUserByWallet).mockResolvedValueOnce(undefined)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ data: {} as SiweMessage, success: false })
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the nonce is not the same as the user nonce', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(getUserById).mockResolvedValueOnce({ nonce: 'another-nonce' } as User)
    jest.mocked(getUserByWallet).mockResolvedValueOnce(undefined)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ data: { nonce: 'nonce' } as SiweMessage, success: true })
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the wallet is not already in the db and the nonce is valid', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(getUserById).mockResolvedValueOnce({ nonce: 'nonce' } as User)
    jest.mocked(getUserByWallet).mockResolvedValueOnce(undefined)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ data: { nonce: 'nonce' } as SiweMessage, success: true })
    jest.mocked(addUserWallet).mockResolvedValueOnce()
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    const req = mockRequest<AddWalletRequest>(validRequest)
    const res = await addWalletRequestHandler(req, {} as AuthOptions)
    expect(addUserWallet).toHaveBeenCalledTimes(1)
    expect(updateUserNfts).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
