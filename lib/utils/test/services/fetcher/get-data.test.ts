import { getData } from '../../../src/services/fetcher/get-data'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

interface FetchResponse {
  url: string
  requestInit: RequestInit
}

describe('services - fetcher - getData', () => {
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
    const fetched = await getData<FetchResponse>(url)
    expect(fetched.url).toEqual('https://echo.xyz/')
    expect(fetched.requestInit).toEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
  })

  it('with data', async () => {
    const url = new URL('https://echo.xyz/')
    const fetched = await getData<FetchResponse, { query: string }>(url, { query: 'test' })
    expect(fetched.url).toEqual('https://echo.xyz/?query=test')
    expect(fetched.requestInit).toEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
  })

  it('with authorization', async () => {
    const url = new URL('https://echo.xyz/')
    const fetched = await getData<FetchResponse>(url, undefined, 'authorization')
    expect(fetched.url).toEqual('https://echo.xyz/')
    expect(fetched.requestInit).toEqual({
      headers: {
        Authorization: 'authorization',
        'Content-Type': 'application/json'
      },
      method: 'GET'
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
    await expect(getData(url)).rejects.toBeDefined()
  })
})
