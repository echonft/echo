import type { RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { removeWalletRequestHandler } from '@echo/backend/request-handlers/profile/remove-wallet-request-handler'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { Chain } from '@echo/model/constants/chain'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import type { Wallet } from '@echo/model/types/wallet'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { toLower } from 'ramda'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/wallet/remove-wallet')
jest.mock('@echo/firestore/crud/wallet/get-wallets-for-user')

describe('removeWalletRequestHandler', () => {
  const validWallet: Wallet = {
    chain: Chain.Blast,
    address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc')
  }
  const validRequest: RemoveWalletRequest = {
    wallet: validWallet
  }
  const user = userMockJohnny

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<RemoveWalletRequest>({} as RemoveWalletRequest)
    await expect(removeWalletRequestHandler({ user, req })).rejects.toBeInstanceOf(BadRequestError)
  })

  it('returns a 200 if the request is valid', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(userDocumentMockJohnny)
    jest.mocked(removeWallet).mockResolvedValueOnce()
    jest.mocked(getWalletsForUser).mockResolvedValueOnce([])
    const req = mockRequest<RemoveWalletRequest>(validRequest)
    const res = await removeWalletRequestHandler({ user, req })
    expect(removeWallet).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
