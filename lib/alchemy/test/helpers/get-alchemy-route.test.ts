import { AlchemyRoutes } from '@echo/alchemy/constants/alchemy-routes'
import { getAlchemyRoute } from '@echo/alchemy/helpers/get-alchemy-route'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('helpers - getAlchemyRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('returns proper value for all routes', () => {
    const baseUrl = 'https://eth-mainnet.g.alchemy.com/nft/v3/test/'
    const routes = Object.values(AlchemyRoutes)
    routes.forEach((route) => expect(getAlchemyRoute(route)).toEqual(new URL(`${baseUrl}${route}`)))
  })
})
