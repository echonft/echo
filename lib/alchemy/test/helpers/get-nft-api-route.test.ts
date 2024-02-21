import { NftApiRoutes } from '@echo/alchemy/constants/nft-api-routes'
import { getNftApiRoute } from '@echo/alchemy/helpers/get-nft-api-route'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('helpers - getNftApiRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('returns proper value for all routes', () => {
    const baseUrl = 'https://eth-mainnet.g.alchemy.com/nft/v3/test/'
    const routes = Object.values(NftApiRoutes)
    routes.forEach((route) => expect(getNftApiRoute(route, 1)).toEqual(`${baseUrl}${route}`))
  })
})
