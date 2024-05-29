import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { removeWalletRequestHandler } from '@echo/frontend/lib/request-handlers/profile/remove-wallet-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { CHAINS } from '@echo/utils/constants/chains/chains'
import { toLower } from 'ramda'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/wallet/remove-wallet')
jest.mock('@echo/firestore/crud/wallet/get-wallets-for-user')

describe('request-handlers - user - removeWalletRequestHandler', () => {
  const validWallet = {
    chain: CHAINS[0],
    address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc')
  }
  const validRequest: RemoveWalletRequest = {
    wallet: validWallet
  }
  const user = getAuthUserMockByUsername(USER_MOCK_JOHNNY_USERNAME)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<RemoveWalletRequest>({} as RemoveWalletRequest)
    try {
      await removeWalletRequestHandler(user, req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('returns a 200 if the request is valid', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById('oE6yUEQBPn7PZ89yMjKn'))
    jest.mocked(removeWallet).mockResolvedValueOnce()
    jest.mocked(getWalletsForUser).mockResolvedValueOnce([])
    const req = mockRequest<RemoveWalletRequest>(validRequest)
    const res = await removeWalletRequestHandler(user, req)
    expect(removeWallet).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
