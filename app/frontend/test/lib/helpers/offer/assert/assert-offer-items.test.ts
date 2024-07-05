import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { assertOfferItems } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-items'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'

describe('helpers - offer - assert - assertOfferItems', () => {
  it('should not throw an error if offerItems is non-empty', () => {
    expect(() => {
      assertOfferItems(getOfferMockById(offerMockToJohnnycageId()).senderItems)
    }).not.toThrow(BadRequestError)
  })

  it('should throw a BadRequestError if offerItems is undefined', () => {
    expect(() => {
      assertOfferItems(undefined)
    }).toThrow(BadRequestError)
  })

  it('should throw a BadRequestError if offerItems is empty', () => {
    expect(() => {
      assertOfferItems([])
    }).toThrow(BadRequestError)
  })
})
