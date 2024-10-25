import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { addWalletRequestHandler } from '@echo/backend/request-handlers/profile/add-wallet-request-handler'
import { getNonceForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { getUserDocumentDataMockById } from '@echo/firestore/mocks/db-model/user/get-user-document-data-mock-by-id'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/db-model/user/get-user-document-data-mock-by-username'
import { userMockJohnnyId } from '@echo/firestore/mocks/db-model/user/user-document-data-mock'
import { userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { type Nonce } from '@echo/model/types/nonce'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/nonce/get-nonce-for-user')
jest.mock('@echo/firestore/crud/wallet/add-wallet')
jest.mock('@echo/firestore/crud/wallet/get-wallets-for-user')

describe('addWalletRequestHandler', () => {
  const nonce = 'noncenoncenonce'
  const wallet = walletMockCrew
  const validRequest: AddWalletRequest = {
    message: Buffer.from(
      'aHR0cHM6Ly90ZXN0LmVjaG9uZnQueHl6IHdhbnRzIHlvdSB0byBzaWduIGluIHdpdGggeW91ciBFdGhlcmV1bSBhY2NvdW50OgoweDFFMzkxOGRENDRGNDI3RjA1NmJlNkM4RTEzMmNGMWI1RjQyZGU1OUUKClNpZ24gdGhpcyBtZXNzYWdlIHRvIGFkZCB5b3VyIHdhbGxldCB0byBFY2hvCgpVUkk6IGh0dHBzOi8vdGVzdC5lY2hvbmZ0Lnh5egpWZXJzaW9uOiAxCkNoYWluIElEOiAxNjg1ODc3NzMKTm9uY2U6IG5vbmNlbm9uY2Vub25jZQpJc3N1ZWQgQXQ6IDIwMjQtMDctMDhUMjA6MTI6MzguNzA0Wg==',
      'base64'
    ).toString('ascii'),
    signature:
      '0x89eb5dc2993d982fe4d261b06d8433dcdacb9fe22aac1623fe9d444668bb7d3509ee29b54a01278b325c71438849f9d052f2ead93e3614d8e19449a9376e74351c',
    wallet
  }
  const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<AddWalletRequest>({} as AddWalletRequest)
    await expect(addWalletRequestHandler({ user, req })).rejects.toBeInstanceOf(BadRequestError)
  })

  it('throws if the nonce is not the same as the user nonce', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById(userMockJohnnyId()))
    jest.mocked(getNonceForUser).mockResolvedValueOnce({ nonce: 'another-nonce', expired: false } as Nonce)
    const req = mockRequest<AddWalletRequest>(validRequest)
    await expect(addWalletRequestHandler({ user, req })).rejects.toBeInstanceOf(ForbiddenError)
  })

  it('throws if the nonce is expired', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById(userMockJohnnyId()))
    jest.mocked(getNonceForUser).mockResolvedValueOnce({ nonce, expired: true } as Nonce)
    const req = mockRequest<AddWalletRequest>(validRequest)
    await expect(addWalletRequestHandler({ user, req })).rejects.toBeInstanceOf(ForbiddenError)
  })

  it('returns a 200 if the nonce is valid', async () => {
    const id = walletMockJohnnyId()
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById(userMockJohnnyId()))
    jest.mocked(getNonceForUser).mockResolvedValueOnce({ nonce, expired: false } as Nonce)
    jest.mocked(addWallet).mockResolvedValueOnce({
      id,
      data: getWalletDocumentDataMockById(id)
    })
    jest.mocked(getWalletsForUser).mockResolvedValueOnce([])
    const req = mockRequest<AddWalletRequest>(validRequest)
    const res = await addWalletRequestHandler({ user, req })
    expect(addWallet).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
