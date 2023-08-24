import { setSearchParams } from '../../../../src/services/fetcher/url/set-search-params'
import { describe, expect, it } from '@jest/globals'

describe('services - fetcher - url - setSearchParams', () => {
  it('1 query param', () => {
    const url = setSearchParams(new URL('https://echo.xyz/'), { query: 'test' })
    expect(url.href).toEqual('https://echo.xyz/?query=test')
  })

  it('2 query params', () => {
    const url = setSearchParams(new URL('https://echo.xyz/'), { query: 'test', another: 'query' })
    expect(url.href).toEqual('https://echo.xyz/?query=test&another=query')
  })

  it('array params', () => {
    const url = setSearchParams(new URL('https://echo.xyz/'), { query: 'test', array: ['this', 'is', 'an', 'array'] })
    expect(url.href).toEqual(
      'https://echo.xyz/?query=test&array%5B%5D=this&array%5B%5D=is&array%5B%5D=an&array%5B%5D=array'
    )
  })
})
