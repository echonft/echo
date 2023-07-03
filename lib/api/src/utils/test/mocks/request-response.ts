/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApiRequest } from '../../../types/model/api-requests/api-request'
import { ErrorResponse } from '../../../types/model/responses/error-response'
import { NextApiResponse } from 'next'
import { Body, createMocks, Headers, MockRequest, MockResponse, RequestMethod } from 'node-mocks-http'

export function mockRequestResponse<T, Q extends Partial<{ [key: string]: string | string[] }>, R>(
  method: RequestMethod,
  query?: Q,
  body?: T,
  headers?: Headers
) {
  const { req, res } = createMocks({ method, query, body: body as Body | undefined })
  req.headers = {
    'Content-Type': 'application/json',
    ...headers
  }
  return { req, res } as unknown as {
    // @ts-ignore
    req: MockRequest<ApiRequest<T, Q>>
    // @ts-ignore
    res: MockResponse<NextApiResponse<R | ErrorResponse>>
  }
}
