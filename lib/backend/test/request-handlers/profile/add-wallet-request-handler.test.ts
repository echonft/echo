import { addWalletRequestMock, addWalletRequestNonceMock } from '@echo/api/mocks/add-wallet-request-mock'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { addWalletRequestHandler } from '@echo/backend/request-handlers/profile/add-wallet-request-handler'
import { getNonce } from '@echo/firestore/crud/nonce/get-nonce'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { walletMockJohnny } from '@echo/model/mocks/wallet-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc } from 'ramda'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/nonce/get-nonce')
jest.mock('@echo/firestore/crud/wallet/add-wallet')
jest.mock('@echo/firestore/crud/wallet/get-wallets-for-user')

describe('addWalletRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<AddWalletRequest>({} as AddWalletRequest)
    await expect(addWalletRequestHandler({ user: userMockJohnny, req })).rejects.toBeInstanceOf(BadRequestError)
  })

  it('returns a 200 if the nonce is valid', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(userDocumentMockJohnny)
    jest.mocked(getNonce).mockResolvedValueOnce(addWalletRequestNonceMock)
    jest.mocked(addWallet).mockResolvedValueOnce({
      id: 'wallet-id',
      data: assoc('userId', 'userId', walletMockJohnny)
    })
    jest.mocked(getWalletsForUser).mockResolvedValueOnce([assoc('userId', 'userId', walletMockJohnny)])
    const req = mockRequest<AddWalletRequest>(addWalletRequestMock)
    const res = await addWalletRequestHandler({ user: userMockJohnny, req })
    expect(addWallet).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseBody = await res.json<WalletsResponse>()
    expect(responseBody).toEqual({ wallets: [walletMockJohnny] })
  })
})
