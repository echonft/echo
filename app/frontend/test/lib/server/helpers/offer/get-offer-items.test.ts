import { type OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { getNftById } from '@echo/frontend/lib/server/helpers/nft/get-nft-by-id'
import { getOfferItemsFromRequests } from '@echo/frontend/lib/server/helpers/offer/get-offer-items-from-requests'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { forEach } from 'ramda'

jest.mock('@echo/frontend/lib/server/helpers/nft/get-nft-by-id')

describe('helpers - offer - getOfferItems', () => {
  const item: OfferItemRequest = {
    amount: 1,
    nft: {
      id: 'nft-id'
    }
  }
  const items: OfferItemRequest[] = [item, item]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if any NFTs are not found', async () => {
    jest.mocked(getNftById).mockResolvedValueOnce(undefined)
    await expect(getOfferItemsFromRequests(items)).rejects.toBeDefined()
  })
  it('returns the items when all NFTs are found', async () => {
    const nft = getNftMockById('8hHFadIrrooORfTOLkBg')
    jest.mocked(getNftById).mockResolvedValue(nft)
    const offerItems = await getOfferItemsFromRequests(items)
    expect(offerItems.length).toEqual(2)
    forEach((offerItem) => {
      expect(offerItem).toStrictEqual({
        amount: 1,
        nft
      })
    }, offerItems)
  })
})
