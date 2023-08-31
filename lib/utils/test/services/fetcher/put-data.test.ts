import { putData } from '../../../src/services/fetcher/put-data'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

interface FetchResponse {
  url: string
  requestInit: RequestInit
}
describe('services - fetcher - postData', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let initialFetch

  beforeEach(() => {
    initialFetch = global.fetch
    jest.clearAllMocks()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.fetch = jest.fn((url: URL, requestInit: RequestInit) =>
      Promise.resolve({
        json: () => Promise.resolve({ url: url.href, requestInit }),
        ok: true
      })
    )
  })

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    global.fetch = initialFetch
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

  it('throws if response is not ok', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.fetch = jest.fn((url: URL, requestInit: RequestInit) =>
      Promise.resolve({
        json: () => Promise.resolve({ url: url.href, requestInit }),
        ok: false
      })
    )
    const url = new URL('https://echo.xyz/')
    await expect(putData<FetchResponse>(url)).rejects.toBeDefined()
  })
})
