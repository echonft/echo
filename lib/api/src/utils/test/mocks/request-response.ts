import { ErrorResponse } from '../../../types'
import { ApiRequest } from '../../../types/models/api-requests/api-request'
import { NextApiResponse } from 'next'
import { createMocks, MockRequest, MockResponse, RequestMethod } from 'node-mocks-http'

export function mockRequestResponse<T, Q extends Partial<{ [key: string]: string | string[] }>, R>(
  method: RequestMethod,
  query?: Q,
  body?: T
): // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
{ req: MockRequest<ApiRequest<T, Q>>; res: MockResponse<NextApiResponse<R | ErrorResponse>> } {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { req, res }: { req: ApiRequest<T, Q>; res: NextApiResponse<R> } = createMocks({ method, query, body })
  req.headers = {
    'Content-Type': 'application/json'
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return { req, res }
}
