import { putData } from '../../../src/services/fetcher/put-data'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

interface FetchResponse {
  url: string
  requestInit: RequestInit
}
describe('services - fetcher - postData', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.fetch = jest.fn((url: URL, requestInit: RequestInit) =>
    Promise.resolve({
      json: () => Promise.resolve({ url: url.href, requestInit })
    })
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('without data', async () => {
    const url = new URL('https://echo.xyz/')
    const fetched = await putData<FetchResponse>(url)
    expect(fetched.url).toEqual('https://echo.xyz/')
    expect(fetched.requestInit).toEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
  })

  it('with data', async () => {
    const url = new URL('https://echo.xyz/')
    const fetched = await putData<FetchResponse, { query: string }>(url, { query: 'test' })
    expect(fetched.url).toEqual('https://echo.xyz/')
    expect(fetched.requestInit).toEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: {
        query: 'test'
      }
    })
  })
})
