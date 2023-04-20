import { createListingSchema } from '../create-listing'
import { describe, expect, it } from '@jest/globals'

describe('validators - createListing', () => {
  const mockOfferItem = {
    target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 },
    tokenId: BigInt(0)
  }
  const mockOfferItems = [mockOfferItem, { ...mockOfferItem, tokenId: BigInt(1) }]
  const mockTarget = { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 }
  const mockTargets = [mockTarget, { ...mockTarget, chainId: 2 }]

  it('wrong discord guild fails validation', () => {
    expect(() => createListingSchema.parse({ discordGuild: '', target: mockTargets, items: mockOfferItems })).toThrow()
    expect(() =>
      createListingSchema.parse({ discordGuild: undefined, target: mockTargets, items: mockOfferItems })
    ).toThrow()
  })
  it('wrong target fails validation', () => {
    expect(() => createListingSchema.parse({ discordGuild: '1203', target: [], items: mockOfferItems })).toThrow()
    expect(() =>
      createListingSchema.parse({ discordGuild: '1203', target: undefined, items: mockOfferItems })
    ).toThrow()
    expect(() =>
      createListingSchema.parse({ discordGuild: '1203', target: mockTarget, items: mockOfferItems })
    ).toThrow()
  })
  it('wrong offerItems fails validation', () => {
    expect(() => createListingSchema.parse({ discordGuild: '1203', target: mockTargets, items: [] })).toThrow()
    expect(() => createListingSchema.parse({ discordGuild: '1203', target: mockTargets, items: undefined })).toThrow()
    expect(() =>
      createListingSchema.parse({ discordGuild: '1203', target: mockTargets, items: mockOfferItem })
    ).toThrow()
  })

  it('valid request pass', () => {
    expect(
      createListingSchema.parse({ discordGuild: '1233', target: mockTargets, items: mockOfferItems })
    ).toStrictEqual({ discordGuild: '1233', target: mockTargets, items: mockOfferItems })
  })
})
