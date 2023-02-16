import { firestore } from '../../services'
import { mapDocumentSnapshot } from '../../utils/map-document-snapshot'
import { mappedDiscordGuild } from '../../utils/test/mocks/discord-guild'
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
