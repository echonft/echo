import { userIsInGuild } from '@echo/firestore/crud/user-discord-guild/user-is-in-guild'
import { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('helpers - user - userIsInGuild', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('return false if discord id is not found in user guilds', async () => {
    const discordGuild: FirestoreNftCollectionDiscordGuild = {
      channelId: '1',
      discordId: 'wrong'
    }
    const isInGuild = await userIsInGuild('oE6yUEQBPn7PZ89yMjKn', discordGuild)
    expect(isInGuild).toBeFalsy()
  })

  it('return true if the user is in the guild', async () => {
    const discordGuild: FirestoreNftCollectionDiscordGuild = {
      channelId: '1',
      discordId: '1'
    }
    const isInGuild = await userIsInGuild('oE6yUEQBPn7PZ89yMjKn', discordGuild)
    expect(isInGuild).toBeTruthy()
  })
})
