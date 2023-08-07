import { createDiscordSchema } from '../../src/types/validators/create-discord'
import { describe, expect, it } from '@jest/globals'

describe('validators - createDiscord', () => {
  it('wrong contracts fails validation', () => {
    expect(() => createDiscordSchema.parse({ channelId: 1, discordId: 1, name: 'test' })).toThrow()
    expect(() => createDiscordSchema.parse({ channelId: 1, discordId: 1, name: 'test', contracts: [] })).toThrow()
    expect(() =>
      createDiscordSchema.parse({
        channelId: 1,
        discordId: 1,
        name: 'test',
        contracts: [{ address: 'test', chainId: 0 }]
      })
    ).toThrow()
  })

  it('wrong channelId fails validation', () => {
    expect(() =>
      createDiscordSchema.parse({
        channelId: 0,
        discordId: 1,
        name: 'test',
        contracts: [{ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 }]
      })
    ).toThrow()
  })

  it('wrong discordId fails validation', () => {
    expect(() =>
      createDiscordSchema.parse({
        channelId: 1,
        discordId: 0,
        name: 'test',
        contracts: [{ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 }]
      })
    ).toThrow()
  })

  it('wrong name fails validation', () => {
    expect(() =>
      createDiscordSchema.parse({
        channelId: 1,
        discordId: 1,
        name: '',
        contracts: [{ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 }]
      })
    ).toThrow()
  })

  it('valid request passes', () => {
    expect(
      createDiscordSchema.parse({
        channelId: 1,
        discordId: 1,
        name: 'test',
        contracts: [{ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 }]
      })
    ).toEqual({
      channelId: '1',
      discordId: '1',
      name: 'test',
      contracts: [{ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 }]
    })
  })
})
