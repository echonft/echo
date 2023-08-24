import { getRoute } from '../../src/constants/get-route'
import { AlchemyV3Routes } from '../../src/constants/routes'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('constants - getRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('returns proper value for all routes', () => {
    const baseUrl = 'https://eth-mainnet.g.alchemy.com/nft/v3/test/'
    const routes = Object.values(AlchemyV3Routes)
    routes.forEach((route) => expect(getRoute(route)).toEqual(new URL(`${baseUrl}${route}`)))
  })
})
