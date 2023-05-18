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
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: mockOfferItems,
        senderItems: [],
        withRequestForOffer: true
      })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: mockOfferItems,
        senderItems: undefined,
        withRequestForOffer: true
      })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: mockOfferItems,
        senderItems: mockOfferItem,
        withRequestForOffer: true
      })
    ).toThrow()
  })

  it('wrong receiverItems fails validation', () => {
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: [],
        senderItems: mockOfferItems,
        withRequestForOffer: true
      })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: undefined,
        senderItems: mockOfferItems,
        withRequestForOffer: true
      })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: mockOfferItem,
        senderItems: mockOfferItems,
        withRequestForOffer: true
      })
    ).toThrow()
  })
  it('wrong requestForOfferId fails validation', () => {
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '',
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: true
      })
    ).toThrow()
  })
  it('wrong receivedId or discordGuildId when withRequestForOffer is true fails validation', () => {
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '',
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: true,
        receiverId: 'test'
      })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '',
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: true,
        discordGuildId: 'test'
      })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '',
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: true,
        receiverId: 'test',
        discordGuildId: 'test'
      })
    ).toThrow()
  })
  it('wrong receiverId when withRequestForOffer is false fails validation', () => {
    expect(() =>
      createOfferSchema.parse({
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: false,
        receiverId: '',
        discordGuildId: 'test'
      })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: false,
        receiverId: undefined,
        discordGuildId: 'test'
      })
    ).toThrow()
  })
  it('wrong discordGuildId when withRequestForOffer is false fails validation', () => {
    expect(() =>
      createOfferSchema.parse({
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: false,
        receiverId: 'test',
        discordGuildId: ''
      })
    ).toThrow()
    expect(() =>
      createOfferSchema.parse({
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: false,
        receiverId: 'test',
        discordGuildId: undefined
      })
    ).toThrow()
  })
  it('wrong requestForOfferId when withRequestForOffer is false fails validation', () => {
    expect(() =>
      createOfferSchema.parse({
        requestForOfferId: '',
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: false,
        receiverId: 'test',
        discordGuildId: 'test'
      })
    ).toThrow()
  })
  it('valid request pass withRequestForOffer true', () => {
    expect(
      createOfferSchema.parse({
        requestForOfferId: '1203',
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: true
      })
    ).toStrictEqual({
      requestForOfferId: '1203',
      receiverItems: mockOfferItems,
      senderItems: mockOfferItems,
      withRequestForOffer: true
    })
  })
  it('valid request withRequestForOffer false', () => {
    expect(
      createOfferSchema.parse({
        receiverItems: mockOfferItems,
        senderItems: mockOfferItems,
        withRequestForOffer: false,
        receiverId: 'test',
        discordGuildId: 'test'
      })
    ).toStrictEqual({
      receiverItems: mockOfferItems,
      senderItems: mockOfferItems,
      withRequestForOffer: false,
      receiverId: 'test',
      discordGuildId: 'test'
    })
  })
})
