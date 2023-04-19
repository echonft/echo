/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApiRequest } from '../../../types/model/api-requests/api-request'
import { ErrorResponse } from '../../../types/model/responses/error-response'
import { NextApiResponse } from 'next'
import { createMocks, MockRequest, MockResponse, RequestMethod } from 'node-mocks-http'

export function mockRequestResponse<T, Q extends Partial<{ [key: string]: string | string[] }>, R>(
  method: RequestMethod,
  query?: Q,
  body?: T
): // @ts-ignore
{ req: MockRequest<ApiRequest<T, Q>>; res: MockResponse<NextApiResponse<R | ErrorResponse>> } {
  // @ts-ignore
  const { req, res }: { req: ApiRequest<T, Q>; res: NextApiResponse<R> } = createMocks({ method, query, body })
  req.headers = {
    'Content-Type': 'application/json'
  }
  // @ts-ignore
  return { req, res }
}
