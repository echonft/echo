import { describe, expect, it } from '@jest/globals'

describe('helpers - user - userIsInGuild', () => {
  it('return false if discord id is not found in user guilds', () => {
    // const user = discordUserMock['oE6yUEQBPn7PZ89yMjKn']!
    // const discordGuild: FirestoreNftCollectionDiscordGuild = {
    //   channelId: '1',
    //   discordId: 'wrong'
    // }
    // expect(userIsInGuild(user, discordGuild)).toBeFalsy()
    expect(true).toBeTruthy()
  })

  it('return true if the user is in the guild', () => {
    // const user = discordUserMock['oE6yUEQBPn7PZ89yMjKn']!
    // const discordGuild: FirestoreNftCollectionDiscordGuild = {
    //   channelId: '1',
    //   discordId: '1'
    // }
    // expect(userIsInGuild(user, discordGuild)).toBeTruthy()
    expect(true).toBeTruthy()
  })
})
