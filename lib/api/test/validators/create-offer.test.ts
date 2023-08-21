import { describe, expect, it } from '@jest/globals'

describe('validators - createOffer', () => {
  // FIXME
  // const mockOfferItems = offers['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems.map(prop('id')).concat(
  //   offers['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems.map((nft) => nft.id)
  // )
  //
  // it('wrong senderItems fails validation', () => {
  //   expect(() =>
  //     createOfferSchema.parse({
  //       requestForOfferId: '1203',
  //       receiverItems: mockOfferItems,
  //       senderItems: [],
  //       withRequestForOffer: true
  //     })
  //   ).toThrow()
  //   expect(() =>
  //     createOfferSchema.parse({
  //       requestForOfferId: '1203',
  //       receiverItems: mockOfferItems,
  //       senderItems: undefined,
  //       withRequestForOffer: true
  //     })
  //   ).toThrow()
  //   expect(() =>
  //     createOfferSchema.parse({
  //       requestForOfferId: '1203',
  //       receiverItems: mockOfferItems,
  //       senderItems: mockOfferItems[0],
  //       withRequestForOffer: true
  //     })
  //   ).toThrow()
  // })
  //
  // it('wrong receiverItems fails validation', () => {
  //   expect(() =>
  //     createOfferSchema.parse({
  //       requestForOfferId: '1203',
  //       receiverItems: [],
  //       senderItems: mockOfferItems,
  //       withRequestForOffer: true
  //     })
  //   ).toThrow()
  //   expect(() =>
  //     createOfferSchema.parse({
  //       requestForOfferId: '1203',
  //       receiverItems: undefined,
  //       senderItems: mockOfferItems,
  //       withRequestForOffer: true
  //     })
  //   ).toThrow()
  //   expect(() =>
  //     createOfferSchema.parse({
  //       requestForOfferId: '1203',
  //       receiverItems: mockOfferItems[0],
  //       senderItems: mockOfferItems,
  //       withRequestForOffer: true
  //     })
  //   ).toThrow()
  // })
  // it('wrong receiverId when withRequestForOffer is false fails validation', () => {
  //   expect(() =>
  //     createOfferSchema.parse({
  //       receiverItems: mockOfferItems,
  //       senderItems: mockOfferItems,
  //       withRequestForOffer: false,
  //       receiverId: '',
  //       discordGuildId: 'test'
  //     })
  //   ).toThrow()
  //   expect(() =>
  //     createOfferSchema.parse({
  //       receiverItems: mockOfferItems,
  //       senderItems: mockOfferItems,
  //       withRequestForOffer: false,
  //       receiverId: undefined,
  //       discordGuildId: 'test'
  //     })
  //   ).toThrow()
  // })
  // it('valid request pass withRequestForOffer true', () => {
  //   expect(
  //     createOfferSchema.parse({
  //       requestForOfferId: '1203',
  //       receiverItems: mockOfferItems,
  //       senderItems: mockOfferItems,
  //       withRequestForOffer: true
  //     })
  //   ).toStrictEqual({
  //     requestForOfferId: '1203',
  //     receiverItems: mockOfferItems,
  //     senderItems: mockOfferItems,
  //     withRequestForOffer: true
  //   })
  // })
  it('TODO', () => {
    expect(true).toBeTruthy()
  })
})
