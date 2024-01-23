import type { ApiRequest } from '@echo/api/types/api-request'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { parseConstraintsQuery } from '@echo/frontend/lib/helpers/request/parse-constraints-query'
import type { Offer } from '@echo/model/types/offer'
import { NextRequest } from 'next/server'

describe('helpers - request - guarded_parseConstraintsQuery - empty', () => {
  test('returns undefined if the URL does not have any constraints', () => {
    const url = new URL('https://echo.xyz/')
    const request = new NextRequest(url) as ApiRequest<never>
    expect(parseConstraintsQuery(request)).toBeUndefined()
  })
})

describe('helpers - request - parseConstraintsQuery - select constraint', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if select is not a non-empty array of non-empty string', () => {
    expect(() => parseConstraintsQuery(getRequest('select=prop&select='))).toThrow()
  })
  test('returns a query constraint with the correct select prop', () => {
    expect(parseConstraintsQuery(getRequest('select=id'))).toStrictEqual<QueryConstraints<Offer>>({
      select: ['id']
    })
    expect(parseConstraintsQuery(getRequest('select=id&select=state'))).toStrictEqual<QueryConstraints<Offer>>({
      select: ['id', 'state']
    })
  })
})

describe('helpers - request - parseConstraintsQuery - orderBy constraint', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if orderBy is not a non-empty array of tuples', () => {
    expect(() => parseConstraintsQuery(getRequest('orderBy=prop'))).toThrow()
    expect(() => parseConstraintsQuery(getRequest('orderBy=prop&orderBy='))).toThrow()
    expect(() => parseConstraintsQuery(getRequest('orderBy=prop&orderBy=asc&orderBy=prop2'))).toThrow()
  })
  test('throws if one orderBy direction is not valid', () => {
    expect(() => parseConstraintsQuery(getRequest('orderBy=prop&orderBy=notvalid'))).toThrow()
    expect(() => parseConstraintsQuery(getRequest('orderBy=prop&orderBy=asc&orderBy=prop&orderBy=notvalid'))).toThrow()
  })
  test('throws if orderBy parameters overlap', () => {
    expect(() =>
      parseConstraintsQuery(getRequest('orderBy=prop&orderBy=asc&orderBy=prop2&orderBy=asc&orderBy=prop&orderBy=asc'))
    ).toThrow()
  })
  test('returns a query constraint with the correct orderBy prop', () => {
    expect(parseConstraintsQuery(getRequest('orderBy=id&orderBy=asc'))).toStrictEqual<QueryConstraints<Offer>>({
      orderBy: [
        {
          field: 'id',
          direction: 'asc'
        }
      ]
    })
    expect(parseConstraintsQuery(getRequest('orderBy=id&orderBy=asc&orderBy=state&orderBy=DESC'))).toStrictEqual<
      QueryConstraints<Offer>
    >({
      orderBy: [
        {
          field: 'id',
          direction: 'asc'
        },
        {
          field: 'state',
          direction: 'desc'
        }
      ]
    })
  })
})

describe('helpers - request - parseConstraintsQuery - limit constraint', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if limit is a number greater than 0', () => {
    expect(() => parseConstraintsQuery(getRequest('limit=whatever'))).toThrow()
    expect(() => parseConstraintsQuery(getRequest('limit=-1'))).toThrow()
    expect(() => parseConstraintsQuery(getRequest('limit=0'))).toThrow()
  })
  test('returns a constraint with the correct limit prop', () => {
    expect(parseConstraintsQuery(getRequest('limit=2'))).toStrictEqual<QueryConstraints<Offer>>({
      limit: 2
    })
  })
})

describe('helpers - request - parseConstraintsQuery - offset constraint', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if offset is a number greater than 0', () => {
    expect(() => parseConstraintsQuery(getRequest('offset=whatever'))).toThrow()
    expect(() => parseConstraintsQuery(getRequest('offset=-1'))).toThrow()
    expect(() => parseConstraintsQuery(getRequest('offset=0'))).toThrow()
  })
  test('returns a constraint with the correct offset prop', () => {
    expect(parseConstraintsQuery(getRequest('offset=2'))).toStrictEqual<QueryConstraints<Offer>>({
      offset: 2
    })
  })
})

describe('helpers - request - parseConstraintsQuery - multiple filters', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('returns the correct constraints', () => {
    expect(parseConstraintsQuery(getRequest('select=id&orderBy=id&orderBy=asc&limit=2&offset=3'))).toStrictEqual<
      QueryConstraints<Offer>
    >({
      select: ['id'],
      orderBy: [
        {
          field: 'id',
          direction: 'asc'
        }
      ],
      limit: 2,
      offset: 3
    })
  })
})
