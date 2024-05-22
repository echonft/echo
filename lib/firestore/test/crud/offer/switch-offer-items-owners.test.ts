import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { switchOfferItemsOwners } from '@echo/firestore/crud/offer/switch-offer-items-owners'
import { assertNfts } from '@echo/firestore-test/nft/assert-nfts'
import { unchecked_updateNft } from '@echo/firestore-test/nft/unchecked_update-nft'
import { mapNftToNftIndex } from '@echo/model/helpers/nft/map-nft-to-nft-index'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Nft } from '@echo/model/types/nft'
import { getNftMockByIndex } from '@echo/model-mocks/nft/get-nft-mock-by-index'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isEmpty } from 'ramda'

describe('CRUD - offer - switchOfferItemsOwners', () => {
  const offerId = OFFER_MOCK_TO_JOHNNYCAGE_ID
  let items: Nft[]
  beforeAll(async () => {
    await assertNfts()
  })
  afterAll(async () => {
    await assertNfts()
  })
  beforeEach(() => {
    items = []
  })
  afterEach(async () => {
    if (!isEmpty(items)) {
      // reset the NFTs with their original data
      for (const item of items) {
        const index = mapNftToNftIndex(item)
        try {
          await unchecked_updateNft(index, getNftMockByIndex(index))
        } catch (e) {
          pinoLogger.error(
            `Error resetting NFT with index ${JSON.stringify(index)} to its original state: ${errorMessage(e)}`
          )
        }
      }
    }
  })
  it('ownership of the items are inverted', async () => {
    const offer = getOfferMockById(offerId)
    const { receiverItems, receiver, senderItems, sender } = offer
    items = getOfferItems(offer)
    await switchOfferItemsOwners(offer)
    for (const item of receiverItems) {
      const nft = (await getNft(mapNftToNftIndex(item)))!
      expect(nft.owner).toStrictEqual(sender)
    }
    for (const item of senderItems) {
      const nft = (await getNft(mapNftToNftIndex(item)))!
      expect(nft.owner).toStrictEqual(receiver)
    }
  })
})
