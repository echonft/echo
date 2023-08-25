import { handleRestrictedRequest } from '../../src/request-handlers/handle-restricted-request'
import { nonceRequestHandler } from '../../src/request-handlers/user/nonce-request-handler'
import { mockRequestResponse } from '../mocks/request-response'
import { NonceResponse } from '@echo/api-public'
import { describe, expect, it } from '@jest/globals'
import { AuthOptions } from 'next-auth'

describe('request-handlers - handleRestrictedRequest', () => {
  it('response should be ended and with the right status when an error is received', async () => {
    const { req, res } = mockRequestResponse<never, never, NonceResponse>('POST')
    await handleRestrictedRequest(req, res, {} as AuthOptions, nonceRequestHandler)
    expect(res.getHeader('Allow')).toEqual(['GET'])
    expect(res.writableEnded).toEqual(true)
    expect(res.statusCode).toEqual(405)
  })
})
