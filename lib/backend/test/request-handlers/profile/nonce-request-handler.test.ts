import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { nonceRequestHandler } from '@echo/backend/request-handlers/profile/nonce-request-handler'
import { setNonceForUser } from '@echo/firestore/crud/nonce/set-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import type { Nonce } from '@echo/model/types/nonce'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/nonce/set-nonce-for-user')

describe('nonceRequestHandler', () => {
  const user = userMockJohnny

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if authenticated, returns success and updates DB', async () => {
    jest.mocked(getUserByUsername).mockResolvedValueOnce(userDocumentMockJohnny)
    jest.mocked(setNonceForUser).mockResolvedValueOnce({ nonce: 'testNonce' } as Nonce)
    const req = mockRequest()
    const res = await nonceRequestHandler({ user, req })
    expect(setNonceForUser).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NonceResponse
    expect(responseData).toEqual({ nonce: 'testNonce' })
  })
})
