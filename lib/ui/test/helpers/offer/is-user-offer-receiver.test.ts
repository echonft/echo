import { isUserOfferReceiver } from '@echo/ui/helpers/offer/is-user-offer-receiver'
import type { Offer } from '@echo/ui/types/model/offer'
import type { User } from '@echo/ui/types/model/user'
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
