import { getAllOffersByUserId } from '../../../src'
import { offerMock } from '../../mocks/offer-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getAllOffersByUserId', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns undefined if the user has no offers', async () => {
    const offers = await getAllOffersByUserId('not-found')
    expect(offers).toBeUndefined()
  })

  it('returns the offers with the proper user id', async () => {
    const offers = await getAllOffersByUserId('oE6yUEQBPn7PZ89yMjKn')
    expect(offers?.length).toBe(1)
    expect(offers?.[0]).toStrictEqual(offerMock['LyCfl6Eg7JKuD7XJ6IPi'])
  })
})
