import { createOfferSchema } from '../create-offer'
import { describe, expect, it } from '@jest/globals'

describe('validators - createOffer', () => {
  const mockOfferItem = {
    target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 },
    tokenId: '0'
  }
  const mockOfferItems = [mockOfferItem, { ...mockOfferItem, tokenId: '1' }]

  it('wrong senderItems fails validation', () => {
    expect(() =>
      createOfferSchema.parse({ requestForOfferId: '1203', receiverItems: mockOfferItems, senderItems: [] })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: mockOfferItems,
        senderItems: undefined
      })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: mockOfferItems,
        senderItems: mockOfferItem
      })
    ).toThrow()
  })

  it('wrong receiverItems fails validation', () => {
    expect(() =>
      createOfferSchema.parse({ requestForOfferId: '1203', receiverItems: [], senderItems: mockOfferItems })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: undefined,
        senderItems: mockOfferItems
      })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: mockOfferItem,
        senderItems: mockOfferItems
      })
    ).toThrow()
  })
  it('wrong requestForOfferId fails validation', () => {
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '',
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems
      })
    ).toThrow()
  })
  it('valid request pass', () => {
    expect(
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems
      })
    ).toStrictEqual({ requestForOfferId: '1203', receiverItems: mockOfferItems, senderItems: mockOfferItems })
    expect(
      createOfferSchema.parse({
        requestForOfferId: undefined,
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems
      })
    ).toStrictEqual({ requestForOfferId: undefined, receiverItems: mockOfferItems, senderItems: mockOfferItems })
    expect(
      createOfferSchema.parse({
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems
      })
    ).toStrictEqual({ receiverItems: mockOfferItems, senderItems: mockOfferItems })
  })
})
