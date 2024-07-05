import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { assertOfferUser } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-user'
import type { Offer } from '@echo/model/types/offer'

describe('helpers - offer - assert - assertOfferUser', () => {
  it('should not throw an error if the username is the same as the Offer`s sender username', () => {
    expect(() => {
      assertOfferUser({ sender: { username: 'sender' }, receiver: { username: 'receiver' } } as Offer, 'sender')
    }).not.toThrow()
  })

  it('should not throw an error if the username is the same as the Offer`s receiver username', () => {
    expect(() => {
      assertOfferUser({ sender: { username: 'sender' }, receiver: { username: 'receiver' } } as Offer, 'receiver')
    }).not.toThrow()
  })

  it('should throw an error if the username is not the same as the sender or receiver username', () => {
    expect(() => {
      assertOfferUser(
        { receiver: { username: 'receiver' }, sender: { username: 'sender' }, slug: 'mockOffer' } as Offer,
        'otherUser'
      )
    }).toThrow(new ForbiddenError())
  })
})
