import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { assoc, pipe } from 'ramda'

describe('services - fetch - nextFetch.get', () => {
  const url = 'http://echonft.xyz'
  const baseHeaders: HeadersInit = {
    'Content-Type': 'application/json'
  }
  const baseInit: RequestInit = {
    headers: baseHeaders,
    method: 'GET'
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('empty config', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((input: string, init: RequestInit) => {
      expect(init).toStrictEqual(baseInit)
      return Promise.resolve({
        url: input,
        ok: true,
        json: () => Promise.resolve({})
      } as Response)
    })
    await nextFetch.get(url)
  })

  test('bearerToken config parameter', async () => {
    const bearerToken = 'token'
    const headers = assoc('Authorization', `Bearer ${bearerToken}`, baseHeaders)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((input: string, init: RequestInit) => {
      expect(init).toStrictEqual(assoc('headers', headers, baseInit))
      return Promise.resolve({
        url: input,
        ok: true,
        json: () => Promise.resolve({})
      } as Response)
    })
    await nextFetch.get(url, { bearerToken })
  })

  test('disableCache config parameter', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((input: string, init: RequestInit) => {
      expect(init).toStrictEqual(assoc('cache', 'no-store', baseInit))
      return Promise.resolve({
        url: input,
        ok: true,
        json: () => Promise.resolve({})
      } as Response)
    })
    await nextFetch.get(url, { disableCache: true })
  })

  test('params config parameter', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((input: string, init: RequestInit) => {
      expect(init).toStrictEqual(baseInit)
      expect(input).toEqual(`${url}?a=a&b=b&c=1&c=2`)
      return Promise.resolve({
        url: input,
        ok: true,
        json: () => Promise.resolve({})
      } as Response)
    })
    await nextFetch.get(url, { params: { a: 'a', b: 'b', c: [1, 2], d: undefined } })
  })

  test('revalidate config parameter', async () => {
    const revalidate = 30
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((input: string, init: RequestInit) => {
      expect(init).toStrictEqual(assoc('next', { revalidate }, baseInit))
      return Promise.resolve({
        url: input,
        ok: true,
        json: () => Promise.resolve({})
      } as Response)
    })
    await nextFetch.get(url, { revalidate })
  })

  test('tags config parameter', async () => {
    const tags = ['tag1', 'tag2', 'tag3']
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((input: string, init: RequestInit) => {
      expect(init).toStrictEqual(assoc('next', { tags }, baseInit))
      return Promise.resolve({
        url: input,
        ok: true,
        json: () => Promise.resolve({})
      } as Response)
    })
    await nextFetch.get(url, { tags })
  })

  test('multiple parameters', async () => {
    const bearerToken = 'token'
    const headers = assoc('Authorization', `Bearer ${bearerToken}`, baseHeaders)
    const tags = ['tag1', 'tag2', 'tag3']
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((input: string, init: RequestInit) => {
      expect(init).toStrictEqual(
        pipe(assoc('headers', headers), assoc('next', { tags }), assoc('cache', 'no-store'))(baseInit)
      )
      expect(input).toEqual(`${url}?a=a&b=b`)
      return Promise.resolve({
        url: input,
        ok: true,
        json: () => Promise.resolve({})
      } as Response)
    })
    await nextFetch.get(url, { bearerToken, disableCache: true, params: { a: 'a', b: 'b' }, tags })
  })

  test('returns an error if the response is not ok', async () => {
    const errorMessage = 'error message'
    const errorStatus = ErrorStatus.BAD_REQUEST
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((input: string, _init: RequestInit) => {
      return Promise.resolve({
        url: input,
        ok: false,
        status: errorStatus,
        json: () => Promise.resolve({ error: errorMessage })
      } as Response)
    })
    const { data, error } = await nextFetch.get(url)
    expect(data).toBeUndefined()
    expect(error).toStrictEqual({
      message: errorMessage,
      status: errorStatus
    })
  })

  test('returns an error if the response.json() throws', async () => {
    const errorMessage = 'error message'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((input: string, _init: RequestInit) => {
      return Promise.resolve({
        url: input,
        ok: true,
        status: 200,
        json: () => Promise.reject(Error(errorMessage))
      } as Response)
    })
    const { data, error } = await nextFetch.get(url)
    expect(data).toBeUndefined()
    expect(error).toStrictEqual({
      message: errorMessage,
      status: ErrorStatus.SERVER_ERROR
    })
  })

  test('returns an error if fetch throws', async () => {
    const errorMessage = 'error message'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((_input: string, _init: RequestInit) => {
      return Promise.reject(Error(errorMessage))
    })
    const { data, error } = await nextFetch.get(url)
    expect(data).toBeUndefined()
    expect(error).toStrictEqual({
      message: errorMessage,
      status: ErrorStatus.SERVER_ERROR
    })
  })

  test('returns the correct data if fetch was successful', async () => {
    const response = { result: 'success' }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((input: string, _init: RequestInit) => {
      return Promise.resolve({
        url: input,
        ok: true,
        status: 200,
        json: () => Promise.resolve(response)
      } as Response)
    })
    const { data, error } = await nextFetch.get(url)
    expect(error).toBeUndefined()
    expect(data).toStrictEqual(response)
  })
})
