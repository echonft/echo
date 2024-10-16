import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { nonceRequestHandler } from '@echo/backend/request-handlers/profile/nonce-request-handler'
import { setNonceForUser } from '@echo/firestore/crud/nonce/set-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserDocumentDataMockById } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-id'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { userMockJohnnyId } from '@echo/firestore/mocks/user/user-document-data-mock'
import type { Nonce } from '@echo/firestore/types/model/nonce'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/nonce/set-nonce-for-user')

describe('request-handlers - user - nonceRequestHandler', () => {
  const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if authenticated, returns success and updates DB', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(getUserDocumentDataMockById(userMockJohnnyId()))
    jest.mocked(setNonceForUser).mockResolvedValueOnce({ nonce: 'testNonce' } as Nonce)
    const req = mockRequest()
    const res = await nonceRequestHandler({ user, req })
    expect(setNonceForUser).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NonceResponse
    expect(responseData).toEqual({ nonce: 'testNonce' })
  })
})
