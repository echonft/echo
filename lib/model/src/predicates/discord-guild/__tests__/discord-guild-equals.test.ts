import { contracts as mockContracts } from '../../../mocks/contract'
import { DiscordGuild } from '../../../types/discord-guild'
import { discordGuildEquals } from '../discord-guild-equals'
import { describe, expect, it } from '@jest/globals'

describe('predicates - discord-guild - discordGuildEquals', () => {
  const discordGuild1: DiscordGuild = { discordId: '1234', contracts: [], id: '1234', name: 'test', channelId: '1234' }
  const discordGuild2: DiscordGuild = {
    discordId: '462798252543049728',
    contracts: [mockContracts['37dBlwJYahEAKeL0rNP8']!],
    id: '123456',
    name: 'test2',
    channelId: '123456'
  }
  it('different guilds returns false', () => {
    expect(discordGuildEquals(discordGuild1)(discordGuild2)).toBeFalsy()
    expect(discordGuildEquals(discordGuild2)(discordGuild1)).toBeFalsy()
  })
  it('guilds with different data but same id returns true', () => {
    let discordGuild1DifferentData = { ...discordGuild1, id: '123' }
    expect(discordGuildEquals(discordGuild1)(discordGuild1DifferentData)).toBeTruthy()
    discordGuild1DifferentData = { ...discordGuild1, name: '1234' }
    expect(discordGuildEquals(discordGuild1)(discordGuild1DifferentData)).toBeTruthy()
    discordGuild1DifferentData = { ...discordGuild1, channelId: '123' }
    expect(discordGuildEquals(discordGuild1)(discordGuild1DifferentData)).toBeTruthy()
    discordGuild1DifferentData = { ...discordGuild1, contracts: [mockContracts['37dBlwJYahEAKeL0rNP8']!] }
    expect(discordGuildEquals(discordGuild1)(discordGuild1DifferentData)).toBeTruthy()
  })
  it('guilds with same data but different discord id returns false', () => {
    const discordGuild1DifferentGuildId = { ...discordGuild1, discordId: '123' }
    expect(discordGuildEquals(discordGuild1)(discordGuild1DifferentGuildId)).toBeFalsy()
    const discordGuild2WithDifferentGuildId = { ...discordGuild2, discordId: '123' }
    expect(discordGuildEquals(discordGuild2)(discordGuild2WithDifferentGuildId)).toBeFalsy()
  })
  it('same guilds returns true', () => {
    expect(
      discordGuildEquals(discordGuild1)({
        discordId: '1234',
        contracts: [],
        id: '1234',
        name: 'test',
        channelId: '1234'
      })
    ).toBeTruthy()
    expect(
      discordGuildEquals(discordGuild2)({
        discordId: '462798252543049728',
        contracts: [mockContracts['37dBlwJYahEAKeL0rNP8']!],
        id: '123456',
        name: 'test2',
        channelId: '123456'
      })
    ).toBeTruthy()
  })
})
