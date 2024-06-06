import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import { userMockJohnnyId } from '@echo/firestore-mocks/user/user-document-data-mock'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { removeWalletRequestHandler } from '@echo/frontend/lib/request-handlers/profile/remove-wallet-request-handler'
import { userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import type { Wallet } from '@echo/model/types/wallet'
import { toLower } from 'ramda'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/wallet/remove-wallet')
jest.mock('@echo/firestore/crud/wallet/get-wallets-for-user')

describe('request-handlers - user - removeWalletRequestHandler', () => {
  const validWallet: Wallet = {
    chain: 'blast',
    address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc')
  }
  const validRequest: RemoveWalletRequest = {
    wallet: validWallet
  }
  const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<RemoveWalletRequest>({} as RemoveWalletRequest)
    await expect(() => removeWalletRequestHandler(user, req)).rejects.toHaveProperty('status', 400)
  })

  it('returns a 200 if the request is valid', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById(userMockJohnnyId()))
    jest.mocked(removeWallet).mockResolvedValueOnce()
    jest.mocked(getWalletsForUser).mockResolvedValueOnce([])
    const req = mockRequest<RemoveWalletRequest>(validRequest)
    const res = await removeWalletRequestHandler(user, req)
    expect(removeWallet).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
