import { createRequestForOfferSchema } from '../../src/types/validators/create-request-for-offer'
import { offerFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('validators - createListing', () => {
  const mockOfferItems = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems.map((nft) => nft.id)
  const mockTarget = { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 }
  const mockTargets = [mockTarget, { ...mockTarget, chainId: 2 }]

  it('wrong discord guild fails validation', () => {
    expect(() =>
      createRequestForOfferSchema.parse({ discordGuildId: '', target: mockTargets, items: mockOfferItems })
    ).toThrow()
    expect(() =>
      createRequestForOfferSchema.parse({ discordGuildId: undefined, target: mockTargets, items: mockOfferItems })
    ).toThrow()
  })
  it('wrong target fails validation', () => {
    expect(() =>
      createRequestForOfferSchema.parse({ discordGuildId: '1203', target: [], items: mockOfferItems })
    ).toThrow()
    expect(() =>
      createRequestForOfferSchema.parse({ discordGuildId: '1203', target: undefined, items: mockOfferItems })
    ).toThrow()
    expect(() =>
      createRequestForOfferSchema.parse({ discordGuildId: '1203', target: mockTarget, items: mockOfferItems })
    ).toThrow()
  })
  it('wrong offerItems fails validation', () => {
    expect(() =>
      createRequestForOfferSchema.parse({ discordGuildId: '1203', target: mockTargets, items: [] })
    ).toThrow()
    expect(() =>
      createRequestForOfferSchema.parse({ discordGuildId: '1203', target: mockTargets, items: undefined })
    ).toThrow()
    expect(() =>
      createRequestForOfferSchema.parse({ discordGuildId: '1203', target: mockTargets, items: [''] })
    ).toThrow()
  })

  it('valid request pass', () => {
    expect(
      createRequestForOfferSchema.parse({ discordGuildId: '1233', target: mockTargets, items: mockOfferItems })
    ).toStrictEqual({ discordGuildId: '1233', target: mockTargets, items: mockOfferItems })
  })
})
