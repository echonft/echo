import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { type Nonce } from '@echo/firestore/types/model/nonce/nonce'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { guarded_getSiweMessage } from '@echo/frontend/lib/server/helpers/auth/guarded_get-siwe-message'
import { guarded_verifySiweMessage } from '@echo/frontend/lib/server/helpers/auth/guarded_verify-siwe-message'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { guarded_addWallet } from '@echo/frontend/lib/server/helpers/user/guarded_add-wallet'
import { guarded_findNonceForUser } from '@echo/frontend/lib/server/helpers/user/guarded_find-nonce-for-user'
import { guarded_updateUserNfts } from '@echo/frontend/lib/server/helpers/user/guarded_update-user-nfts'
import { addWalletRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/add-wallet-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { SiweMessage } from 'siwe'

jest.mock('@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/user/guarded_find-nonce-for-user')
jest.mock('@echo/frontend/lib/server/helpers/auth/guarded_verify-siwe-message')
jest.mock('@echo/frontend/lib/server/helpers/user/guarded_add-wallet')
jest.mock('@echo/frontend/lib/server/helpers/user/guarded_update-user-nfts')
jest.mock('@echo/frontend/lib/server/helpers/auth/guarded_get-siwe-message')

describe('request-handlers - user - addWalletRequestHandler', () => {
  const validSiweMessage = new SiweMessage({
    domain: 'echo.xyz',
    address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
    statement: 'Sign in to add this wallet to your account',
    uri: 'https://echo.xyz',
    version: '1',
    chainId: 1,
    nonce: 'noncenoncenoncenoncenonce'
  }).prepareMessage()
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
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<AddWalletRequest>({} as AddWalletRequest)
    try {
      await addWalletRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the siwe message cannot be validated', async () => {
    jest.mocked(guarded_getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(guarded_getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(guarded_verifySiweMessage).mockResolvedValueOnce({ data: {} as SiweMessage, success: false })
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the nonce is not the same as the user nonce', async () => {
    jest.mocked(guarded_getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(guarded_findNonceForUser).mockResolvedValueOnce({ nonce: 'another-nonce', expired: false } as Nonce)
    jest.mocked(guarded_getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest
      .mocked(guarded_verifySiweMessage)
      .mockResolvedValueOnce({ data: { nonce: 'nonce' } as SiweMessage, success: true })
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if the nonce is expired', async () => {
    jest.mocked(guarded_getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(guarded_findNonceForUser).mockResolvedValueOnce({ nonce: 'nonce', expired: true } as Nonce)
    jest.mocked(guarded_getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest
      .mocked(guarded_verifySiweMessage)
      .mockResolvedValueOnce({ data: { nonce: 'nonce' } as SiweMessage, success: true })
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the wallet is not already in the db and the nonce is valid', async () => {
    jest.mocked(guarded_getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(guarded_findNonceForUser).mockResolvedValueOnce({ nonce: 'nonce', expired: false } as Nonce)
    jest.mocked(guarded_getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest
      .mocked(guarded_verifySiweMessage)
      .mockResolvedValueOnce({ data: { nonce: 'nonce' } as SiweMessage, success: true })
    jest.mocked(guarded_addWallet).mockResolvedValueOnce()
    jest.mocked(guarded_updateUserNfts).mockResolvedValueOnce()
    const req = mockRequest<AddWalletRequest>(validRequest)
    const res = await addWalletRequestHandler(req)
    expect(guarded_addWallet).toHaveBeenCalledTimes(1)
    expect(guarded_updateUserNfts).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
