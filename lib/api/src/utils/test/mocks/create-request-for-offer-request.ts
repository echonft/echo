import { CreateRequestForOfferRequest } from '../../../types'
import { requestsForOffer } from '@echo/model'

export const mockCreateRequestForOfferRequest: CreateRequestForOfferRequest = {
  discordGuildId: '1002691062374088794',
  target: [{ chainId: 1, address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d' }],
  items: requestsForOffer['jUzMtPGKM62mMhEcmbN4']!.items.map((item) => item.id)
}
