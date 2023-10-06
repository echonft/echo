import type { RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@server/helpers/error/api-error'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { removeUserWallet } from '@server/helpers/user/remove-user-wallet'
import { updateUserNfts } from '@server/helpers/user/update-user-nfts'
import { removeWalletRequestHandler } from '@server/request-handlers/user/remove-wallet-request-handler'
import { mockRequest } from '@server-mocks/request-response'

jest.mock('@server/helpers/request/get-user-from-request')
jest.mock('@server/helpers/user/remove-user-wallet')
jest.mock('@server/helpers/user/update-user-nfts')

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
    jest.mocked(removeUserWallet).mockResolvedValueOnce()
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    const req = mockRequest<RemoveWalletRequest>(validRequest)
    const res = await removeWalletRequestHandler(req)
    expect(removeUserWallet).toHaveBeenCalledTimes(1)
    expect(updateUserNfts).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
