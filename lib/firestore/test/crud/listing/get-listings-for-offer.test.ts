import { getListingsForOffer } from '../../../src/crud/listing/get-listings-for-offer'
import { getListingMockById } from '../../mocks/get-listing-mock-by-id'
import { getOfferMockById } from '../../mocks/get-offer-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { always, map, modifyPath } from 'ramda'

describe('CRUD - listing - getListingsForOffer', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns an empty array if no listings matches the target collection', async () => {
    const { senderItems, receiverItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const listings = await getListingsForOffer(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map(modifyPath(['nft', 'collection', 'id'], always('not-found')), senderItems),
      receiverItems
    )
    expect(listings).toEqual([])
  })

  it('returns an empty array if no listings matches the receiver nfts', async () => {
    const { senderItems, receiverItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const listings = await getListingsForOffer(
      senderItems,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map(modifyPath(['nft', 'id'], always('not-found')), receiverItems)
    )
    expect(listings).toEqual([])
  })

  it('returns the listings when an id is found', async () => {
    const { senderItems, receiverItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const listings = await getListingsForOffer(senderItems, receiverItems)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById('jUzMtPGKM62mMhEcmbN4'))
  })
})
