import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { guarded_removeWallet } from '@echo/frontend/lib/server/helpers/user/guarded_remove-wallet'
import { updateUserNfts } from '@echo/frontend/lib/server/helpers/user/update-user-nfts'
import { removeWalletRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/remove-wallet-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/user/guarded_remove-wallet')
jest.mock('@echo/frontend/lib/server/helpers/user/update-user-nfts')

describe('request-handlers - user - removeWalletRequestHandler', () => {
  const validWallet = {
    chainId: 1,
    address: '0x12c63bbD266dB84e117356e664f3604055166CEc'
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
    jest.mocked(guarded_removeWallet).mockResolvedValueOnce()
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    const req = mockRequest<RemoveWalletRequest>(validRequest)
    const res = await removeWalletRequestHandler(req)
    expect(guarded_removeWallet).toHaveBeenCalledTimes(1)
    expect(updateUserNfts).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
