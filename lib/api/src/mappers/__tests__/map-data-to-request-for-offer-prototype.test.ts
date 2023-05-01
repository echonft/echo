import { mapDataToRequestForOfferPrototype } from '../map-data-to-request-for-offer-prototype'
import { mockUser } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('mapDataToRequestForOfferPrototype', () => {
  const user = mockUser
  it('should return the expected request prototype when given valid user and request data', () => {
    const validRequestData = {
      discordGuildId: 'guild1',
      target: [{ address: 'test', chainId: 0 }],
      items: [
        {
          tokenId: 1,
          target: { address: 'test', chainId: 0 }
        },
        {
          tokenId: 2,
          target: { address: 'test', chainId: 0 }
        }
      ]
    }
    const expectedPrototype = {
      discordGuildId: 'guild1',
      senderId: mockUser.id,
      target: [{ address: 'test', chainId: 0 }],
      items: [
        {
          tokenId: 1,
          contract: { address: 'test', chainId: 0 }
        },
        {
          tokenId: 2,
          contract: { address: 'test', chainId: 0 }
        }
      ]
    }

    const result = mapDataToRequestForOfferPrototype(user, validRequestData)
    expect(result.discordGuildId).toEqual(expectedPrototype.discordGuildId)
    expect(result.senderId).toEqual(mockUser.id)
    expect(result.target).toEqual(validRequestData.target)
    expectedPrototype.items.forEach((value, index) => {
      expect(value.tokenId.toString()).toEqual(validRequestData.items[index]!.tokenId.toString())
      expect(value.contract).toEqual(validRequestData.items[index]!.target)
    })
  })

  it('should return the expected request prototype when given valid user and request data (no target)', () => {
    const validRequestData = {
      discordGuildId: 'guild1',
      target: [],
      items: [
        {
          tokenId: 1,
          target: { address: 'test', chainId: 0 }
        },
        {
          tokenId: 2,
          target: { address: 'test', chainId: 0 }
        }
      ]
    }
    const expectedPrototype = {
      discordGuildId: 'guild1',
      senderId: mockUser.id,
      target: [],
      items: [
        {
          tokenId: 1,
          contract: { address: 'test', chainId: 0 }
        },
        {
          tokenId: 2,
          contract: { address: 'test', chainId: 0 }
        }
      ]
    }

    const result = mapDataToRequestForOfferPrototype(user, validRequestData)
    expect(result.discordGuildId).toEqual(expectedPrototype.discordGuildId)
    expect(result.senderId).toEqual(mockUser.id)
    expect(result.target).toEqual(validRequestData.target)
    expect(result.target).toHaveLength(0)
    result.items.forEach((value, index) => {
      expect(value.tokenId.toString()).toEqual(validRequestData.items[index]!.tokenId.toString())
      expect(value.contract).toEqual(validRequestData.items[index]!.target)
    })
  })
  it('should return the expected request prototype when given valid user and request data (no guilds)', () => {
    const validRequestData = {
      discordGuildId: 'guild1',
      target: [{ address: 'test', chainId: 0 }],
      items: []
    }
    const expectedPrototype = {
      discordGuildId: 'guild1',
      senderId: mockUser.id,
      target: [{ address: 'test', chainId: 0 }],
      items: []
    }

    const result = mapDataToRequestForOfferPrototype(user, validRequestData)
    expect(result.discordGuildId).toEqual(expectedPrototype.discordGuildId)
    expect(result.senderId).toEqual(mockUser.id)
    expect(result.target).toEqual(validRequestData.target)
    expect(result.items).toHaveLength(0)
  })
})
