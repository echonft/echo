import { CreateRequestForOfferRequest } from '../../../types'

export const mockCreateRequestForOfferRequest: CreateRequestForOfferRequest = {
  discordGuildId: '1002691062374088794',
  target: [{ chainId: 1, address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d' }],
  items: [
    { target: { chainId: 1, address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d' }, tokenId: '1' },
    { target: { chainId: 1, address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d' }, tokenId: '10' }
  ]
}
