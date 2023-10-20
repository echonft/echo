import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { findNonceForUser } from '@echo/firestore/crud/nonce/find-nonce-for-user'
import { type Nonce } from '@echo/firestore/types/model/nonce/nonce'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { getSiweMessage } from '@server/helpers/auth/get-siwe-message'
import { verifySiweMessage } from '@server/helpers/auth/verify-siwe-message'
import { ApiError } from '@server/helpers/error/api-error'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { addUserWallet } from '@server/helpers/user/add-user-wallet'
import { updateUserNfts } from '@server/helpers/user/update-user-nfts'
import { addWalletRequestHandler } from '@server/request-handlers/user/add-wallet-request-handler'
import { mockRequest } from '@server-mocks/request-response'
import { SiweMessage } from 'siwe'

jest.mock('@server/helpers/request/get-user-from-request')
jest.mock('@echo/firestore/crud/nonce/find-nonce-for-user')
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
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ data: {} as SiweMessage, success: false })
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the nonce is not the same as the user nonce', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(findNonceForUser).mockResolvedValueOnce({ nonce: 'another-nonce', expired: false } as Nonce)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ data: { nonce: 'nonce' } as SiweMessage, success: true })
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if the nonce is expired', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(findNonceForUser).mockResolvedValueOnce({ nonce: 'nonce', expired: true } as Nonce)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ data: { nonce: 'nonce' } as SiweMessage, success: true })
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the wallet is not already in the db and the nonce is valid', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(findNonceForUser).mockResolvedValueOnce({ nonce: 'nonce', expired: false } as Nonce)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ data: { nonce: 'nonce' } as SiweMessage, success: true })
    jest.mocked(addUserWallet).mockResolvedValueOnce()
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    const req = mockRequest<AddWalletRequest>(validRequest)
    const res = await addWalletRequestHandler(req)
    expect(addUserWallet).toHaveBeenCalledTimes(1)
    expect(updateUserNfts).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
