import { isUserOfferReceiver } from '../../src/helpers/is-user-offer-receiver'
import { Offer, User } from '@echo/ui-model'
import { describe, expect, it } from '@jest/globals'

describe('helpers - isUserReceiver', () => {
  it('if user is not the receiver, returns false', () => {
    const user = { id: 'test' } as User
    const offer = { receiver: { id: 'not test' } } as Offer
    expect(isUserOfferReceiver(user, offer)).toBeFalsy()
    expect(isUserOfferReceiver({ id: '' } as User, offer)).toBeFalsy()
    expect(isUserOfferReceiver(user, { ...offer, sender: { id: 'test' } } as Offer)).toBeFalsy()
  })

  it('if user is the receiver, returns true', () => {
    const user = { id: 'test' } as User
    const offer = { receiver: { id: 'test' } } as Offer
    expect(isUserOfferReceiver(user, offer)).toBeTruthy()
    expect(isUserOfferReceiver({ id: '' } as User, { receiver: { id: '' } } as Offer)).toBeTruthy()
  })
})
