import { removeWalletRequestMock } from '@echo/api/mocks/remove-wallet-request-mock'
import type { RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { removeWalletRequestHandler } from '@echo/backend/request-handlers/profile/remove-wallet-request-handler'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { walletMockJohnny } from '@echo/model/mocks/wallet-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc } from 'ramda'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/wallet/remove-wallet')
jest.mock('@echo/firestore/crud/wallet/get-wallets-for-user')

describe('removeWalletRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<RemoveWalletRequest>({} as RemoveWalletRequest)
    await expect(removeWalletRequestHandler({ user: userMockJohnny, req })).rejects.toBeInstanceOf(BadRequestError)
  })

  it('returns a 200 if the request is valid', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(userDocumentMockJohnny)
    jest.mocked(removeWallet).mockResolvedValueOnce()
    jest.mocked(getWalletsForUser).mockResolvedValueOnce([assoc('userId', 'userId', walletMockJohnny)])
    const req = mockRequest<RemoveWalletRequest>(removeWalletRequestMock)
    const res = await removeWalletRequestHandler({ user: userMockJohnny, req })
    expect(removeWallet).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseBody = await res.json<WalletsResponse>()
    expect(responseBody).toEqual({ wallets: [walletMockJohnny] })
  })
})
