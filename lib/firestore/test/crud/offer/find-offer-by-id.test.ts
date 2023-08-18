import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { offerMock } from '../../mocks/offer-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - findOfferById', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('throws an error if the offer is not found', async () => {
    try {
      await findOfferById('not-found')
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('returns the offer with the given id', async () => {
    const offer = await findOfferById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(offer).toStrictEqual(offerMock['LyCfl6Eg7JKuD7XJ6IPi'])
  })
})
