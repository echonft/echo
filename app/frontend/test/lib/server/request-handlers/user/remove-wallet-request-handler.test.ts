import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { removeWalletRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/remove-wallet-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { toLower } from 'ramda'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/firestore/crud/wallet/remove-wallet')

describe('request-handlers - user - removeWalletRequestHandler', () => {
  const validWallet = {
    chainId: 1,
    address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc')
  }
  const validRequest: RemoveWalletRequest = {
    wallet: validWallet
  }
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<RemoveWalletRequest>({} as RemoveWalletRequest)
    try {
      await removeWalletRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('returns a 200 if the request is valid', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(removeWallet).mockResolvedValueOnce()
    const req = mockRequest<RemoveWalletRequest>(validRequest)
    const res = await removeWalletRequestHandler(req)
    expect(removeWallet).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
