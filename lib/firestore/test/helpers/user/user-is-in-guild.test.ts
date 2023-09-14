import { userIsInGuild } from '@echo/firestore/helpers/user/user-is-in-guild'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'
import { userMock } from '@echo/firestore-mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('helpers - user - userIsInGuild', () => {
  it('return false if discord id is not found in user guilds', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const discordGuild: FirestoreNftCollectionDiscordGuild = {
      channelId: '1',
      discordId: 'wrong'
    }
    expect(userIsInGuild(user, discordGuild)).toBeFalsy()
  })

  it('return true if the user is in the guild', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const discordGuild: FirestoreNftCollectionDiscordGuild = {
      channelId: '1',
      discordId: '1'
    }
    expect(userIsInGuild(user, discordGuild)).toBeTruthy()
  })
})
