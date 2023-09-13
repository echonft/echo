import { mockRequest } from '@mocks/request-response'
import { getSession } from '@server/helpers/auth/get-session'
import { handleRestrictedRequest } from '@server/request-handlers/handle-restricted-request'
import { nonceRequestHandler } from '@server/request-handlers/user/nonce-request-handler'
import type { AuthOptions } from 'next-auth'

jest.mock('@server/helpers/auth/get-session')

describe('request-handlers - handleRestrictedRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('response should have the right error status when an error is received', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(null)
    const req = mockRequest<never>()
    const res = await handleRestrictedRequest(req, {} as AuthOptions, nonceRequestHandler)
    expect(res.status).toEqual(403)
  })
})
