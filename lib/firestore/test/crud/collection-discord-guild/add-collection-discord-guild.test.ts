import { addCollectionDiscordGuild } from '@echo/firestore/crud/collection-discord-guild/add-collection-discord-guild'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertCollectionDiscordGuilds } from '@test-utils/collection-discord-guild/assert-collection-discord-guilds'
import { deleteCollectionDiscordGuild } from '@test-utils/collection-discord-guild/delete-collection-discord-guild'
import { findCollectionDiscordGuildById } from '@test-utils/collection-discord-guild/find-collection-discord-guild-by-id'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - collection-discord-guild - addCollectionDiscordGuild', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertCollectionDiscordGuilds()
    await tearDownRemoteFirestoreTests()
  })
  it('throws if trying to add a guild for a collection that does not exist', async () => {
    await expect(addCollectionDiscordGuild('not-found', 'new', 'new')).rejects.toBeDefined()
  })
  it('throws if trying to add a guild that already exists to a collection', async () => {
    await expect(addCollectionDiscordGuild('Rc8pLQXxgyQGIRL0fr13', '100', '100')).rejects.toBeDefined()
  })
  it('add a discord guild to an nft collection', async () => {
    const { id } = await addCollectionDiscordGuild('Rc8pLQXxgyQGIRL0fr13', 'new', 'new')
    const newGuild = await findCollectionDiscordGuildById(id)
    await deleteCollectionDiscordGuild(id)
    expect(newGuild!.id).toStrictEqual(id)
    expect(newGuild!.collectionId).toStrictEqual('Rc8pLQXxgyQGIRL0fr13')
    expect(newGuild!.guild).toStrictEqual({
      channelId: 'new',
      discordId: 'new'
    })
  })
})
