import { addCollectionDiscordGuild } from '@echo/firestore/crud/collection-discord-guild/add-collection-discord-guild'
import { assertCollectionDiscordGuilds } from '@echo/firestore-test/collection-discord-guild/assert-collection-discord-guilds'
import { deleteCollectionDiscordGuild } from '@echo/firestore-test/collection-discord-guild/delete-collection-discord-guild'
import { getCollectionDiscordGuildById } from '@echo/firestore-test/collection-discord-guild/get-collection-discord-guild-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - collection-discord-guild - addCollectionDiscordGuild', () => {
  beforeAll(async () => {
    await assertCollectionDiscordGuilds()
  })
  afterAll(async () => {
    await assertCollectionDiscordGuilds()
  })
  it('throws if trying to add a guild for a collection that does not exist', async () => {
    await expect(addCollectionDiscordGuild('not-found', 'new', 'new')).rejects.toBeDefined()
  })
  it('throws if trying to add a guild that already exists to a collection', async () => {
    await expect(addCollectionDiscordGuild('Rc8pLQXxgyQGIRL0fr13', '100', '100')).rejects.toBeDefined()
  })
  it('add a discord guild to an nft collection', async () => {
    const { id } = await addCollectionDiscordGuild('Rc8pLQXxgyQGIRL0fr13', 'new', 'new')
    const newGuild = (await getCollectionDiscordGuildById(id))!
    await deleteCollectionDiscordGuild(id)
    expect(newGuild.id).toStrictEqual(id)
    expect(newGuild.collectionSlug).toStrictEqual('Rc8pLQXxgyQGIRL0fr13')
    expect(newGuild.guild).toStrictEqual({
      channelId: 'new',
      discordId: 'new'
    })
  })
})
