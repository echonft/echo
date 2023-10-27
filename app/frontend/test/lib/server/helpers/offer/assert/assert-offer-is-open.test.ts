import { assertOfferIsOpen } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-is-open'
import { type Offer } from '@echo/model/types/offer'
import dayjs from 'dayjs'

describe('helpers - offer - assert - assertOfferIsOpen', () => {
  it('returns false if offer is completed', () => {
    expect(
      assertOfferIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: 'COMPLETED'
      } as Offer)
    ).toBeFalsy()
  })

  it('returns false if offer is cancelled', () => {
    expect(
      assertOfferIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: 'CANCELLED'
      } as Offer)
    ).toBeFalsy()
  })

  it('returns false if offer is rejected', () => {
    expect(
      assertOfferIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: 'REJECTED'
      } as Offer)
    ).toBeFalsy()
  })

  it('returns false if offer is expired', () => {
    expect(
      assertOfferIsOpen({
        id: 'test',
        expired: true,
        expiresAt: dayjs().subtract(1, 'd').unix(),
        state: 'OPEN'
      } as Offer)
    ).toBeFalsy()
  })

  it('returns true if offer is open and not expired', () => {
    expect(
      assertOfferIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: 'OPEN'
      } as Offer)
    ).toBeTruthy()
  })

  it('returns true if offer is accepted and not expired', () => {
    expect(
      assertOfferIsOpen({
        id: 'test',
        expired: false,
        expiresAt: dayjs().add(1, 'd').unix(),
        state: 'ACCEPTED'
      } as Offer)
    ).toBeTruthy()
  })
})
