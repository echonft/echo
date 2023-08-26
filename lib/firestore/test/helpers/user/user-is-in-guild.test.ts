import { userIsInGuild } from '../../../src/helpers/user/user-is-in-guild'
import { NftCollectionDiscordGuild } from '../../../src/types/model/nft-collection-discord-guild'
import { userMock } from '../../mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('helpers - user - userIsInGuild', () => {
  it('return false if discord id is not found in user guilds', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const discordGuild: NftCollectionDiscordGuild = {
      channelId: '1',
      discordId: 'wrong'
    }
    expect(userIsInGuild(user, discordGuild)).toBeFalsy()
  })

  it('return true if the user is in the guild', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const discordGuild: NftCollectionDiscordGuild = {
      channelId: '1',
      discordId: '1'
    }
    expect(userIsInGuild(user, discordGuild)).toBeTruthy()
  })
})
