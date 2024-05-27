import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { createOfferSchema } from '@echo/frontend/lib/validators/create-offer-schema'
import { now } from '@echo/utils/helpers/now'
import { assoc, dissoc } from 'ramda'

describe('validators - createOfferSchema', () => {
  const validRequest: CreateOfferRequest = {
    receiverItems: [
      {
        tokenId: 1,
        collection: { slug: 'receiver-slug' }
      }
    ],
    senderItems: [
      {
        tokenId: 1,
        collection: { slug: 'sender-slug' }
      }
    ],
    expiresAt: Date.now()
  }
  it('throws if receiverItems are not valid', () => {
    expect(() => createOfferSchema.parse(dissoc('receiverItems', validRequest))).toThrow()
    expect(() => createOfferSchema.parse(assoc('receiverItems', [], validRequest))).toThrow()
    expect(() =>
      createOfferSchema.parse(
        assoc(
          'receiverItems',
          {
            tokenId: 1,
            collection: { slug: 'receiver-slug' }
          },
          validRequest
        )
      )
    ).toThrow()
  })
  it('throws if senderItems are not valid', () => {
    expect(() => createOfferSchema.parse(dissoc('senderItems', validRequest))).toThrow()
    expect(() => createOfferSchema.parse(assoc('senderItems', [], validRequest))).toThrow()
    expect(() =>
      createOfferSchema.parse(
        assoc(
          'senderItems',
          {
            tokenId: 1,
            collection: { slug: 'sender-slug' }
          },
          validRequest
        )
      )
    ).toThrow()
  })

  it('throws if expiresAt is not valid', () => {
    expect(() => createOfferSchema.parse(dissoc('expiresAt', validRequest))).toThrow()
    expect(() => createOfferSchema.parse(assoc('expiresAt', 0, validRequest))).toThrow()
    expect(() => createOfferSchema.parse(assoc('expiresAt', now() - 120, validRequest))).toThrow()
  })
  it('valid', () => {
    expect(createOfferSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
