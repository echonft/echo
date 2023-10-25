import { type OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { getNftById } from '@echo/frontend/lib/server/helpers/nft/get-nft-by-id'
import { getOfferItems } from '@echo/frontend/lib/server/helpers/offer/get-offer-items'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { forEach } from 'ramda'

jest.mock('@echo/frontend/lib/server/helpers/nft/get-nft-by-id')

describe('helpers - offer - getOfferItems', () => {
  const item: OfferItemRequest = {
    amount: 1,
    nft: {
      id: 'nft-id'
    }
  }
  const items: NonEmptyArray<OfferItemRequest> = [item, item]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if any NFTs are not found', async () => {
    jest.mocked(getNftById).mockResolvedValueOnce(undefined)
    await expect(getOfferItems(items)).rejects.toBeDefined()
  })
  it('returns the items when all NFTs are found', async () => {
    const nft = getNftMockById('8hHFadIrrooORfTOLkBg')
    jest.mocked(getNftById).mockResolvedValue(nft)
    const offerItems = await getOfferItems(items)
    expect(offerItems.length).toEqual(2)
    forEach((offerItem) => {
      expect(offerItem).toStrictEqual({
        amount: 1,
        nft
      })
    }, offerItems)
  })
})
