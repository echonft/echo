import { firestore } from '../../services'
import { mappedDiscordGuild } from '../../utils/test/mocks/discord-guild'
import { mapDocumentSnapshot } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mapDiscordGuild', () => {
  it('correct mapping', async () => {
    const discordGuild = await firestore()
      .collection('guilds')
      .doc('xA40abnyBq6qQHSYmtHj')
      .get()
      .then(mapDocumentSnapshot)

    // .then(pipe(mapDocumentSnapshot, mapDiscordGuild))
    expect(discordGuild).toEqual(mappedDiscordGuild)
  })
})
