import { acceptOffer } from '../../../src/crud/offer/accept-offer'
import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { OfferState } from '../../../src/types/model/offer-state'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'

describe('CRUD - offer - acceptOffer', () => {
  let initialState: OfferState
  let initialExpiresAt: Dayjs
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const offer = await findOfferById(id)
    initialState = offer.state
    initialExpiresAt = offer.expiresAt
  })
  afterEach(async () => {
    await updateOffer(id, { state: initialState, expiresAt: initialExpiresAt })
  })

  it('throws if the offer is expired', async () => {
    try {
      await acceptOffer(id)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as Error).message).toEqual('offer expired')
    }
  })

  it('accept offer if its not expired', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await updateOffer(id, { expiresAt: dayjs().add(1, 'day') })
    await acceptOffer(id)
    const updatedOffer = await findOfferById(id)
    expect(updatedOffer.state).toEqual('ACCEPTED')
  })
})
