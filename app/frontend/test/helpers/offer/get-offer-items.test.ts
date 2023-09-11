import { OfferItemRequest } from '@echo/api'
import { getNftMockById } from '@echo/firestore'
import { NonEmptyArray } from '@echo/utils'
import { getNftById } from '@server/helpers/nft/get-nft-by-id'
import { getOfferItems } from '@server/helpers/offer/get-offer-items'
import { forEach } from 'ramda'

jest.mock('@server/helpers/nft/get-nft-by-id')

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
