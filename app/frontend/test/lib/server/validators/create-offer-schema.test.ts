import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { createOfferSchema } from '@echo/frontend/lib/validators/create-offer-schema'
import { assoc, dissoc } from 'ramda'

describe('validators - createOfferSchema', () => {
  const validRequest: CreateOfferRequest = {
    receiverItems: [
      {
        amount: 1,
        nft: {
          id: 'receiver-item-nft-id'
        }
      }
    ],
    senderItems: [
      {
        amount: 1,
        nft: {
          id: 'sender-item-nft-id'
        }
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
            amount: 1,
            nft: {
              id: 'nft-id'
            }
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
            amount: 1,
            nft: {
              id: 'nft-id'
            }
          },
          validRequest
        )
      )
    ).toThrow()
  })

  it('throws if expiresAt is not valid', () => {
    expect(() => createOfferSchema.parse(dissoc('expiresAt', validRequest))).toThrow()
    expect(() => createOfferSchema.parse(assoc('expiresAt', 0, validRequest))).toThrow()
  })
  it('valid', () => {
    expect(createOfferSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
