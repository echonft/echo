import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import type { UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import { getOfferStateUpdateSnapshot } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { unchecked_updateOffer } from '@echo/firestore-test/offer/unchecked_update-offer'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { getOfferMockBySlug } from '@echo/model-mocks/offer/get-offer-mock-by-slug'
import { OFFER_MOCK_TO_JOHNNYCAGE_SLUG } from '@echo/model-mocks/offer/offer-mock'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { futureDate } from '@echo/utils/helpers/future-date'
import { pastDate } from '@echo/utils/helpers/past-date'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer - acceptOffer', () => {
  let createdStateUpdateId: Nullable<string>
  const slug = OFFER_MOCK_TO_JOHNNYCAGE_SLUG
  const args: Omit<UpdateOfferStateArgs, 'state'> = {
    slug,
    updateArgs: {
      trigger: {
        by: 'johnnycagewins'
      }
    }
  }

  beforeAll(async () => {
    await assertOffers()
  })
  afterAll(async () => {
    await assertOffers()
  })
  beforeEach(() => {
    createdStateUpdateId = undefined
  })
  afterEach(async () => {
    // reset the offer to its original state
    try {
      await unchecked_updateOffer(slug, getOfferMockBySlug(slug))
    } catch (e) {
      throw Error(`error updating offer with slug ${slug} to its original state: ${errorMessage(e)}`)
    }
    if (!isNil(createdStateUpdateId)) {
      try {
        await deleteOfferUpdate(createdStateUpdateId)
      } catch (e) {
        pinoLogger.error(`Error deleting offer update with id ${createdStateUpdateId}: ${errorMessage(e)}`)
      }
    }
  })

  it('throws if the offer is not found', async () => {
    await expect(pipe(assoc('slug', 'not-found'), acceptOffer)(args)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_EXPIRED, expiresAt: pastDate() })
    await expect(acceptOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_CANCELLED, expiresAt: futureDate() })
    await expect(acceptOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is accepted', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_ACCEPTED, expiresAt: futureDate() })
    await expect(acceptOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_REJECTED, expiresAt: futureDate() })
    await expect(acceptOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_COMPLETED, expiresAt: futureDate() })
    await expect(acceptOffer(args)).rejects.toBeDefined()
  })
  it('throws if the state update by trigger is not the receiver', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_OPEN, expiresAt: futureDate() })
    await expect(
      pipe(
        assoc('updateArgs', {
          trigger: {
            by: 'not-receiver'
          }
        }),
        acceptOffer
      )(args)
    ).rejects.toBeDefined()
  })
  it('accept offer', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_OPEN, expiresAt: futureDate() })
    await acceptOffer(args)
    const offerSnapshot = (await getOfferSnapshot(slug))!
    const updatedOffer = offerSnapshot.data()
    const stateUpdateSnapshot = (await getOfferStateUpdateSnapshot({
      offerId: offerSnapshot.id,
      state: OFFER_STATE_ACCEPTED
    }))!
    createdStateUpdateId = stateUpdateSnapshot.id
    expect(updatedOffer.state).toEqual(OFFER_STATE_ACCEPTED)
    expectDateNumberIsNow(updatedOffer.updatedAt)
    expect(stateUpdateSnapshot).toBeDefined()
  })
})
