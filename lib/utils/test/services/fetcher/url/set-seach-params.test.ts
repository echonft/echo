import { setSearchParams } from '../../../../src/services/fetcher/url/set-search-params'
import { describe, expect, it } from '@jest/globals'

describe('services - fetcher - url - setSearchParams', () => {
  it('1 query param', () => {
    const url = new URL('https://echo.xyz/')
    const urlWithParams = setSearchParams({ query: 'test' })(url)
    expect(urlWithParams.href).toEqual('https://echo.xyz/?query=test')
  })

  it('2 query params', () => {
    const url = new URL('https://echo.xyz/')
    const urlWithParams = setSearchParams({ query: 'test', another: 'query' })(url)
    expect(urlWithParams.href).toEqual('https://echo.xyz/?query=test&another=query')
  })

  it('array params', () => {
    const url = new URL('https://echo.xyz/')
    const urlWithParams = setSearchParams({ query: 'test', array: ['this', 'is', 'an', 'array'] })(url)
    expect(urlWithParams.href).toEqual(
      'https://echo.xyz/?query=test&array%5B%5D=this&array%5B%5D=is&array%5B%5D=an&array%5B%5D=array'
    )
  })
})
