import type { ItemRequest } from '@echo/api/types/requests/item-request'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { getItemsFromRequests } from '@echo/frontend/lib/helpers/item/get-items-from-requests'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { forEach } from 'ramda'

jest.mock('@echo/firestore/crud/nft/get-nft-by-id')

describe('helpers - item - getItemsFromRequests', () => {
  const item: ItemRequest = {
    amount: 1,
    nft: {
      id: 'nft-id'
    }
  }
  const items: ItemRequest[] = [item, item]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if any NFTs are not found', async () => {
    jest.mocked(getNftById).mockResolvedValueOnce(undefined)
    await expect(getItemsFromRequests(items)).rejects.toBeDefined()
  })
  it('returns the items when all NFTs are found', async () => {
    const nft = getNftMockById('8hHFadIrrooORfTOLkBg')
    jest.mocked(getNftById).mockResolvedValue(nft)
    const offerItems = await getItemsFromRequests(items)
    expect(offerItems.length).toEqual(2)
    forEach((offerItem) => {
      expect(offerItem).toStrictEqual({
        amount: 1,
        nft
      })
    }, offerItems)
  })
})
