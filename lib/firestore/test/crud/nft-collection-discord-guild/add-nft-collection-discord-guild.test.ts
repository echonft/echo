import { addNftCollectionDiscordGuild } from '@echo/firestore/crud/nft-collection-discord-guild/add-nft-collection-discord-guild'
import { deleteNftCollectionDiscordGuild } from '@echo/firestore/crud/nft-collection-discord-guild/delete-nft-collection-discord-guild'
import { findNftCollectionDiscordGuildById } from '@echo/firestore/crud/nft-collection-discord-guild/find-nft-collection-discord-guild-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertNftCollectionDiscordGuilds } from '@test-utils/nft-collection-discord-guild/assert-nft-collection-discord-guilds'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft-collection-discord-guild - addNftCollectionDiscordGuild', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertNftCollectionDiscordGuilds()
    await tearDownRemoteFirestoreTests()
  })
  it('throws if trying to add a guild for a collection that does not exist', async () => {
    await expect(addNftCollectionDiscordGuild('not-found', 'new', 'new')).rejects.toBeDefined()
  })
  it('throws if trying to add a guild that already exists to a collection', async () => {
    await expect(addNftCollectionDiscordGuild('Rc8pLQXxgyQGIRL0fr13', '100', '100')).rejects.toBeDefined()
  })
  it('add a discord guild to an nft collection', async () => {
    const { id } = await addNftCollectionDiscordGuild('Rc8pLQXxgyQGIRL0fr13', 'new', 'new')
    const newGuild = await findNftCollectionDiscordGuildById(id)
    await deleteNftCollectionDiscordGuild(id)
    expect(newGuild!.id).toStrictEqual(id)
    expect(newGuild!.collectionId).toStrictEqual('Rc8pLQXxgyQGIRL0fr13')
    expect(newGuild!.guild).toStrictEqual({
      channelId: 'new',
      discordId: 'new'
    })
  })
})
