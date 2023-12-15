import { guarded_assertOfferIsOpen } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-is-open'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import dayjs from 'dayjs'

describe('helpers - offer - assert - guarded_assertOfferIsOpen', () => {
  it('returns false if offer is completed', () => {
    expect(
      guarded_assertOfferIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: OFFER_STATE_COMPLETED
      } as Offer)
    ).toBeFalsy()
  })

  it('returns false if offer is cancelled', () => {
    expect(
      guarded_assertOfferIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: OFFER_STATE_CANCELLED
      } as Offer)
    ).toBeFalsy()
  })

  it('returns false if offer is rejected', () => {
    expect(
      guarded_assertOfferIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: OFFER_STATE_REJECTED
      } as Offer)
    ).toBeFalsy()
  })

  it('returns false if offer is expired', () => {
    expect(
      guarded_assertOfferIsOpen({
        id: 'test',
        expired: true,
        expiresAt: dayjs().subtract(1, 'd').unix(),
        state: OFFER_STATE_OPEN
      } as Offer)
    ).toBeFalsy()
  })

  it('returns true if offer is open and not expired', () => {
    expect(
      guarded_assertOfferIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: OFFER_STATE_OPEN
      } as Offer)
    ).toBeTruthy()
  })

  it('returns true if offer is accepted and not expired', () => {
    expect(
      guarded_assertOfferIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: OFFER_STATE_ACCEPTED
      } as Offer)
    ).toBeTruthy()
  })
})
