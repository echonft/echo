import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { removeWalletRequestHandler } from '@echo/frontend/lib/request-handlers/user/remove-wallet-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { toLower } from 'ramda'

jest.mock('@echo/firestore/crud/user/find-user-by-username')
jest.mock('@echo/firestore/crud/wallet/remove-wallet')

describe('request-handlers - user - removeWalletRequestHandler', () => {
  const validWallet = {
    chainId: 1,
    address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc')
  }
  const validRequest: RemoveWalletRequest = {
    wallet: validWallet
  }
  const user = getAuthUserMockByUsername('johnnycagewins')

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
    jest.mocked(findUserByUsername).mockResolvedValueOnce(getUserMockById('oE6yUEQBPn7PZ89yMjKn'))
    jest.mocked(removeWallet).mockResolvedValueOnce()
    const req = mockRequest<RemoveWalletRequest>(validRequest)
    const res = await removeWalletRequestHandler(user, req)
    expect(removeWallet).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
