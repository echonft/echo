import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { getNonceForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { type Nonce } from '@echo/firestore/types/model/nonce/nonce'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import { getWalletDocumentDataMockById } from '@echo/firestore-mocks/wallet/get-wallet-document-data-mock-by-id'
import { getSiweMessage } from '@echo/frontend/lib/helpers/auth/get-siwe-message'
import { verifySiweMessage } from '@echo/frontend/lib/helpers/auth/verify-siwe-message'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { addWalletRequestHandler } from '@echo/frontend/lib/request-handlers/profile/add-wallet-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { CHAIN_NAMES } from '@echo/utils/constants/chain-names'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { toLower } from 'ramda'
import { SiweMessage } from 'siwe'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/nonce/get-nonce-for-user')
jest.mock('@echo/frontend/lib/helpers/auth/verify-siwe-message')
jest.mock('@echo/firestore/crud/wallet/add-wallet')
jest.mock('@echo/frontend/lib/helpers/auth/get-siwe-message')
jest.mock('@echo/firestore/crud/wallet/get-wallets-for-user')

describe('request-handlers - user - addWalletRequestHandler', () => {
  const address = toLower('0x12c63bbD266dB84e117356e664f3604055166CEc')
  const validSiweMessage = new SiweMessage({
    domain: 'echo.xyz',
    address: formatAddress({ address }),
    statement: 'Sign in to add this wallet to your account',
    uri: 'https://echo.xyz',
    version: '1',
    chainId: 1,
    nonce: 'noncenoncenoncenoncenonce'
  }).prepareMessage()
  const validSignature = '0x000'
  const validWallet = {
    chain: CHAIN_NAMES[0],
    address
  }
  const validRequest: AddWalletRequest = {
    message: validSiweMessage,
    signature: validSignature,
    wallet: validWallet
  }
  const user = getAuthUserMockByUsername(USER_MOCK_JOHNNY_USERNAME)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<AddWalletRequest>({} as AddWalletRequest)
    try {
      await addWalletRequestHandler(user, req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the siwe message cannot be validated', async () => {
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockRejectedValue({})
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(user, req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the nonce is not the same as the user nonce', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById('oE6yUEQBPn7PZ89yMjKn'))
    jest.mocked(getNonceForUser).mockResolvedValueOnce({ nonce: 'another-nonce', expired: false } as Nonce)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ nonce: 'nonce' } as SiweMessage)
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(user, req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if the nonce is expired', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById('oE6yUEQBPn7PZ89yMjKn'))
    jest.mocked(getNonceForUser).mockResolvedValueOnce({ nonce: 'nonce', expired: true } as Nonce)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ nonce: 'nonce' } as SiweMessage)
    const req = mockRequest<AddWalletRequest>(validRequest)
    try {
      await addWalletRequestHandler(user, req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the nonce is valid', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById('oE6yUEQBPn7PZ89yMjKn'))
    jest.mocked(getNonceForUser).mockResolvedValueOnce({ nonce: 'nonce', expired: false } as Nonce)
    jest.mocked(getSiweMessage).mockImplementationOnce(() => ({}) as SiweMessage)
    jest.mocked(verifySiweMessage).mockResolvedValueOnce({ nonce: 'nonce' } as SiweMessage)
    jest.mocked(addWallet).mockResolvedValueOnce({
      id: 'i28NWtlxElPXCnO0c6BC',
      data: getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC')
    })
    jest.mocked(getWalletsForUser).mockResolvedValueOnce([])
    const req = mockRequest<AddWalletRequest>(validRequest)
    const res = await addWalletRequestHandler(user, req)
    expect(addWallet).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
