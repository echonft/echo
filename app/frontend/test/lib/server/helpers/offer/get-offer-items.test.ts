import { type OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { getOfferItemsFromRequests } from '@echo/frontend/lib/helpers/offer/get-offer-items-from-requests'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { forEach } from 'ramda'

jest.mock('@echo/firestore/crud/nft/find-nft-by-id')

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
    jest.mocked(findNftById).mockResolvedValueOnce(undefined)
    await expect(getOfferItemsFromRequests(items)).rejects.toBeDefined()
  })
  it('returns the items when all NFTs are found', async () => {
    const nft = getNftMockById('8hHFadIrrooORfTOLkBg')
    jest.mocked(findNftById).mockResolvedValue(nft)
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
