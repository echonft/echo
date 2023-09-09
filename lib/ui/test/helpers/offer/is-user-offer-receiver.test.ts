import { isUserOfferReceiver } from '../../../src/helpers/offer/is-user-offer-receiver'
import { Offer, User } from '@echo/ui-model'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - isUserReceiver', () => {
  it('if user is not the receiver, returns false', () => {
    const user = { id: 'test' } as User
    const offer = { receiver: { id: 'not test' } } as Offer
    expect(isUserOfferReceiver(user.id, offer.receiver.id)).toBeFalsy()
    expect(isUserOfferReceiver('', offer.receiver.id)).toBeFalsy()
  })

  it('if user is the receiver, returns true', () => {
    const user = { id: 'test' } as User
    const offer = { receiver: { id: 'test' } } as Offer
    expect(isUserOfferReceiver(user.id, offer.receiver.id)).toBeTruthy()
  })
})
