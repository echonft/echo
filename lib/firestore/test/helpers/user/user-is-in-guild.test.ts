import { userIsInGuild } from '../../../src/helpers/user/user-is-in-guild'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { DiscordGuild } from '../../../src/types/model/discord-guild'
import { userMock } from '../../mocks/user-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('helpers - user - userIsInGuild', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('return false if channel id is wrong', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const discordGuild: DiscordGuild = {
      channelId: 'wrong',
      discordId: '1'
    }
    expect(userIsInGuild(user, discordGuild)).toBeFalsy()
  })

  it('return false if discord id is wrong', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const discordGuild: DiscordGuild = {
      channelId: '1',
      discordId: 'wrong'
    }
    expect(userIsInGuild(user, discordGuild)).toBeFalsy()
  })

  it('return false if both channel id and discord id are wrong', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const discordGuild: DiscordGuild = {
      channelId: 'wrong',
      discordId: 'wrong'
    }
    expect(userIsInGuild(user, discordGuild)).toBeFalsy()
  })

  it('return true if the user is in the guild', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const discordGuild: DiscordGuild = {
      channelId: '1',
      discordId: '1'
    }
    expect(userIsInGuild(user, discordGuild)).toBeTruthy()
  })
})
